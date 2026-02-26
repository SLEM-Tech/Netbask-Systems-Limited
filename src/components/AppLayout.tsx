import { ReactNode } from "react";
import Header from "./Navbars/Header";
import Footer from "./Footers/Footer";
import AppMenu from "./Navbars/AppMenu";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
}

const AppLayout = ({ children, className }: AppLayoutProps) => {
  return (
    <main className={`relative bg-black-200 min-h-screen flex flex-col`}>
      <Header />
      <div className={`flex-1 pt-[130px] slg:pt-[110px] ${className}`}>
        {children}
      </div>
      <Footer />
      <div className="mt-20 sm:mt-0" />
      <AppMenu />
    </main>
  );
};

export default AppLayout;
