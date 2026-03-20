import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "@/components/ThemeProvider";
import ToastProvider from "@/components/ui/ToastProvider";

export const metadata = {
  title: "ResumeCraft",
  description: "AI-Powered Resume Builder",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="bg-[#fafafa] dark:bg-[#0a0a0f] text-[#0f172a] dark:text-white transition-colors duration-300">
          <ThemeProvider>
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}