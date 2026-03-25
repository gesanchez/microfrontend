import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { SidebarItemConfig } from "@repo/ui/Sidebar";
import { IconName } from "@repo/ui/Icon";
import { navigateTo } from "@repo/utilities/navigation";
import { useConfig } from "../../context/ConfigContext";
import { profileRepository, UserProfile } from "../../repositories/profileRepository";

export const useMainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mfes = [] } = useConfig();
  const [profile, setProfile] = useState<UserProfile | undefined>();

  const sidebarItems: SidebarItemConfig[] = mfes
    .filter(m => m.template === 'main')
    .map(m => ({
      label: m.label || m.name,
      icon: (m.icon as IconName) || 'LayoutDashboard',
      path: m.route
    }));

  const handleNavigate = (path: string) => {
    navigateTo(path);
  };

  useEffect(() => {
    const handleNavigation = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      if (customEvent.detail) {
        navigate(customEvent.detail);
      }
    };

    window.addEventListener("shell:navigate", handleNavigation);
    return () => window.removeEventListener("shell:navigate", handleNavigation);
  }, [navigate]);

  useEffect(() => {
    const controller = new AbortController();
    
    profileRepository.getProfile(controller.signal)
      .then(setProfile)
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error("Failed to load profile", err);
        }
      });

    return () => controller.abort();
  }, []);

  return {
    profile,
    sidebarItems,
    currentPath: location.pathname,
    handleNavigate,
  };
};
