"use client";

import { ReactNode, useCallback, useMemo, useState } from "react";
import { Toast, ToastContainer, ToastContext, ToastType } from "@/components/ui/Toast";

const AUTO_DISMISS_MS = 3000;
const EXIT_ANIMATION_MS = 300;

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    let shouldAnimateOut = false;

    setToasts((prev) =>
      prev.map((toast) => {
        if (toast.id !== id) return toast;
        if (toast.isExiting) return toast;
        shouldAnimateOut = true;
        return { ...toast, isExiting: true };
      })
    );

    if (!shouldAnimateOut) return;

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, EXIT_ANIMATION_MS);
  }, []);

  const addToast = useCallback(
    (type: ToastType, message: string, title?: string) => {
      const id =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      setToasts((prev) => [...prev, { id, type, message, title }]);

      setTimeout(() => {
        removeToast(id);
      }, AUTO_DISMISS_MS);
    },
    [removeToast]
  );

  const value = useMemo(
    () => ({
      toast: {
        success: (message: string, title?: string) => addToast("success", message, title),
        error: (message: string, title?: string) => addToast("error", message, title),
        warning: (message: string, title?: string) => addToast("warning", message, title),
        info: (message: string, title?: string) => addToast("info", message, title),
      },
    }),
    [addToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}
