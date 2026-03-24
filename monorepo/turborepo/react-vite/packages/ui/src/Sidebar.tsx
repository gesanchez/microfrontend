import { Icon, IconName } from './Icon';
import { useTranslation } from 'react-i18next';

interface SidebarItemProps {
  label: string;
  icon: IconName;
  isActive?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({ label, icon, isActive, onClick }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
        isActive 
          ? 'bg-blue-50 text-blue-600 shadow-sm' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      }`}
    >
      <Icon 
        name={icon} 
        size={20} 
        className={isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'} 
      />
      <span className="font-medium">{label}</span>
      {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />}
    </button>
  );
};

export interface SidebarItemConfig {
  label: string;
  icon: IconName;
  path: string;
}

interface SidebarProps {
  items: SidebarItemConfig[];
  onNavigate: (path: string) => void;
  currentPath: string;
}

export const Sidebar = ({ items, onNavigate, currentPath }: SidebarProps) => {
  const { t } = useTranslation();

  return (
    <aside className="w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200 flex flex-col p-4 sticky top-16">
      <div className="flex-1 flex flex-col gap-1">
        <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t('shell.mainMenu')}</p>
        {items.map((item) => (
          <SidebarItem
            key={item.path}
            label={item.label}
            icon={item.icon}
            isActive={currentPath === item.path}
            onClick={() => onNavigate(item.path)}
          />
        ))}
      </div>
      
      <div className="mt-auto border-t border-gray-50 pt-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-500 hover:bg-gray-50 transition-all">
          <Icon name="HelpCircle" size={20} />
          <span className="font-medium text-sm">{t('shell.helpSupport')}</span>
        </button>
      </div>
    </aside>
  );
};
