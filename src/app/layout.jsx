import "./globals.css";

export const metadata = {
  title: "CraftCart",
  description: "Learn DIY crafts and shop all the supplies in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
