import type { Metadata } from "next";
import { Fira_Sans, Fira_Code } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ГородОК — Городской портал жалоб",
  description: "Городской портал жалоб с AI-классификацией на базе Gemini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${firaSans.variable} ${firaCode.variable} h-full antialiased dark`}
    >
      <body className="h-full flex flex-col font-sans">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0F172A",
              color: "#F8FAFC",
              border: "1px solid rgba(30, 41, 59, 0.8)",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              iconTheme: { primary: "#22C55E", secondary: "#020617" },
            },
            error: {
              iconTheme: { primary: "#EF4444", secondary: "#020617" },
            },
          }}
        />
      </body>
    </html>
  );
}
