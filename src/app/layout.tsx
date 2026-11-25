import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], weight: ["600", "800", "900"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://sebastiangonzalezportfolio.netlify.app"),
  title: "Sebastian Gonzalez · Desarrollador Full Stack",
  description: "Portafolio de Sebastian Gonzalez, desarrollador Full Stack: React, Next.js, TypeScript, Node.js, Laravel y .NET. Proyectos, trayectoria y contacto.",
  openGraph: { title: "Sebastian Gonzalez · Full Stack Developer", images: "/og.jpeg", type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${archivo.variable} ${inter.variable}`} data-scroll-behavior="smooth">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
