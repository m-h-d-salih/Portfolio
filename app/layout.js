import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sideBar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio",
  description: "Mohammed Salih Portfolio",
  icons: {
    icon: "/assets/mefavicon.jpeg",
    shortcut: "/assets/mefavicon.jpeg",
    apple: "/assets/mefavicon.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body className="min-h-screen bg-gray-100">
       <Sidebar />
       <Toaster
         position="bottom-right"
         toastOptions={{
           style: {
             background: '#222324',
             color: '#fff',
             border: '1px solid #eab308',
           },
           success: { iconTheme: { primary: '#eab308', secondary: '#222324' } },
         }}
       />
      <div className='lg:ml-16 p-4 bg-black'>
        {children}
      </div>
      </body>
    </html>
  );
}
