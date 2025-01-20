import { ReactQueryClientProvider } from "@/libs/ReactQueryClientProvider";
import { Toaster } from 'react-hot-toast';
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
          <Toaster />
          {children}
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
