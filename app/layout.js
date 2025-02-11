import "./globals.css";
import Header from "./components/Header";


export const metadata = {
  title: "Lambobo App",
  description: "Dream Project 1",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
          <Header />
          <main className="container mx-auto p-10 flex-grow">
            {children}
          </main>
          {/* <footer className="text-gray-400 text-center text-xs py-5 mt-auto">
            <p>Copyright &copy; {new Date().getFullYear()} - All rights reserved.</p>
          </footer> */}
      </body>
    </html>
  );
}
