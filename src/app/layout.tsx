import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar  from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Gossip",
  description: "Your local social square. Share updates, follow neighbors, and join real-time conversations about what's happening around you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="font-georgia antialiased">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen">
              <Navbar/>
              <main className="py-8">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="hidden lg:block lg:col-span-3">
                      sidebar
                    </div>
                    <div className="lg:col-span-9">
                      {children}
                    </div>
                  </div>
                </div>
              </main>
            </div>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}