import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "CraftCart",
  description: "Learn DIY crafts and shop all the supplies in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-body">
        <Navbar />

        <main className="app-main">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
