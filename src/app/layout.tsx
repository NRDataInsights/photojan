import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "photoJan — Ian Davis",
  description: "Dublin photography by Ian Davis: architecture, street life, weather, urban memory and abstraction.",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
