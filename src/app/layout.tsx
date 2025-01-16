import { ReactQueryClientProvider } from "@/libs/ReactQueryClientProvider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryClientProvider>
          {children}
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
