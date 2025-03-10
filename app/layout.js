import "./globals.css";
import Header from "./components/Header";


export const metadata = {
  title: "Lambobo App",
  description: "Dream Project 1",
  viewport: { // Correct way to add viewport in app directory
    width: 'device-width',
    initialScale: 1
  }
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="flex flex-col max-w-md mx-auto">
          <Header />
          <main className="container mx-auto flex-grow">
            {children}
          </main>
          <footer className="text-gray-400 text-center text-xs py-5 mt-auto">
            <p>Copyright &copy; {new Date().getFullYear()} hracc25 - All rights reserved.</p>
          </footer>
      </body>
    </html>
  );
}
