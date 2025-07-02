
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Lines from "@/components/Lines";
import ScrollToTop from "@/components/ScrollToTop";
import { ThemeProviders } from "../components/ThemeProviders";
import { Inter } from "next/font/google";
import "../globals.css";
const inter = Inter({ subsets: ["latin"] });

import { createContext } from 'react';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ClerkProviderWrapper } from "../components/ClerkProviderWrapper";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProviderWrapper>
      <html lang="en" suppressHydrationWarning>
        <body className={`dark:bg-black ${inter.className}`}>
          <ThemeProviders
            enableSystem={false}
            attribute="class"
            defaultTheme="dark"
          >
            <div className="flex flex-col min-h-screen">
              <Lines />
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
              <ScrollToTop />
            </div>
          </ThemeProviders>
        </body>
      </html>
    </ClerkProviderWrapper>
  );
}