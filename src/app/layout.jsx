import "./globals.css";
import Providers from "./providers"; 

export const metadata = {
  title: "CraftCart",
  description: "Learn DIY crafts and shop all the supplies in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-body">
        <Providers>   
          <main className="app-main">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
