// Đóng vai trò là 1 file đầu tiên được khởi chạy, nó sẽ quyết định cấu trúc của giao diện.
// File này sẽ đươc coi là một chuẩn chung cho các file con sẽ ăn theo. Hiểu đơn giản thì mọi component đặt ở đây thì mọi trang khác đều kế thừa nó.
// Folder app có thể coi là phía server của react, do đó các file đặt trong này sẽ được sử dụng để render trước chứ không xử lý phía máy khách để cải thiện tốc độ xử lý.
"use client";//Xác định file này sẽ được xử lý máy khách. Điều này là do các xử lý liên quan đến các thao tác như State, onClick, etc cần được xử lý phía máy khách để tránh lỗi.

import ScrollToTop from "@/components/ScrollToTop"; 
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import './globals.css'
const inter = Inter({ subsets: ["latin"] });

import ToasterContext from "./context/ToastContext";

export default function RootLayout({children,}: {children: React.ReactNode;}) { 
  return (
    <html lang="en" suppressHydrationWarning> {/* suppressHydrationWarning được sử dụng để tắt cảnh báo hydrate*/}
      <body className={`dark:bg-black ${inter.className}`}>
        <ThemeProvider
          enableSystem={false}
          attribute="class"
          defaultTheme="light"
        >
          <ToasterContext />
          {children}
          <ScrollToTop />
        </ThemeProvider> {/* được sử dụng để chủ động cấu hình việc thay đổi theme của ứng dụng - chính là chức năng đổi sáng tối của web*/}
      </body>
    </html>
  );
}
