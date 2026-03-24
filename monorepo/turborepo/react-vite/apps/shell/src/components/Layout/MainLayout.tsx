import { Outlet } from "react-router";
import { Navbar } from "@repo/ui/Navbar";
import { Sidebar } from "@repo/ui/Sidebar";
import { useMainLayout } from "./useMainLayout";
import { useTranslation } from "react-i18next";

export const MainLayout = () => {
  const { profile, sidebarItems, currentPath, handleNavigate } = useMainLayout();
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    localStorage.setItem('lang', lang);
    window.location.reload();
  };
  console.log(currentPath)
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar 
        user={profile} 
        currentLang={i18n.language}
        onLanguageChange={handleLanguageChange}
      />
      <div className="flex flex-1">
        <Sidebar 
          items={sidebarItems} 
          onNavigate={handleNavigate} 
          currentPath={currentPath} 
        />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
