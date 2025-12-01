import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "CraftCart",
  description: "Learn DIY crafts and shop all the supplies in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-body">
        <Providers>
          <Toaster position="top-right" />
          <main className="app-main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
