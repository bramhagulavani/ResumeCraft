"use client";

import { createContext, useContext } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type: ToastType;
  isExiting?: boolean;
}

type ToastApi = {
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
};

export interface ToastContextValue {
  toast: ToastApi;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_STYLE: Record<ToastType, { icon: string; accent: string }> = {
  success: {
    icon: "✅",
    accent: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
  },
  error: {
    icon: "❌",
    accent: "bg-rose-500/10 border-rose-500/30 text-rose-400",
  },
  warning: {
    icon: "⚠️",
    accent: "bg-amber-500/10 border-amber-500/30 text-amber-400",
  },
  info: {
    icon: "ℹ️",
    accent: "bg-indigo-500/10 border-indigo-500/30 text-indigo-400",
  },
};

export function ToastItem({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: (id: string) => void;
}) {
  const style = TOAST_STYLE[toast.type];

  return (
    <div
      className={`toast-enter pointer-events-auto min-w-[300px] max-w-[400px] w-[calc(100vw-2rem)] rounded-2xl p-4 bg-white dark:bg-[#13131a] border border-gray-200 dark:border-white/[0.08] backdrop-blur-xl shadow-2xl ${toast.isExiting ? "toast-exit" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-xl border ${style.accent}`}>
          <span className="text-sm leading-none">{style.icon}</span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            {toast.title || "Notification"}
          </p>
          <p className="mt-0.5 text-sm text-gray-600 dark:text-slate-300 break-words">
            {toast.message}
          </p>
        </div>

        <button
          onClick={() => onClose(toast.id)}
          className="h-6 w-6 rounded-md text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-200 transition-colors"
          aria-label="Close notification"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: Toast[];
  onClose: (id: string) => void;
}) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}
