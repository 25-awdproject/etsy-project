
import Navbar from "./component/layout/Navbar/page";
import Sidebar from "./component/layout/Sidebar/page";
import Footer from "./component/layout/Footer/page";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     
    <div className="flex min-h-screen flex-col bg-gray-950 text-white">
      
        <Navbar />
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />

        <main className="min-w-0 flex-1 p-5 sm:p-8">
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
}
