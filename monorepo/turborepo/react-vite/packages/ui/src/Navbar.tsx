import { Icon } from './Icon';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  currentLang?: string;
  onLanguageChange?: (lang: string) => void;
}

export const Navbar = ({ user, currentLang = 'en', onLanguageChange }: NavbarProps) => {
  const { t } = useTranslation();

  return (
    <nav className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <Icon name="Menu" className="h-6 w-6 text-gray-600 cursor-pointer" />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          {t('shell.title')}
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg p-1">
          <button 
            onClick={() => onLanguageChange?.('en')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${currentLang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            EN
          </button>
          <button 
            onClick={() => onLanguageChange?.('es')}
            className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${currentLang === 'es' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
          >
            ES
          </button>
        </div>

        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-medium text-gray-900">{user?.name || t('shell.guestName')}</span>
          <span className="text-xs text-gray-500">{user?.email || t('shell.guestEmail')}</span>
        </div>
        
        <div className="relative group">
          <button className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold hover:shadow-lg transition-all duration-200 overflow-hidden border-2 border-white">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <span>{user?.name?.[0]?.toUpperCase() || 'G'}</span>
            )}
          </button>
          
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 z-50 py-1">
            <div className="px-4 py-2 border-b border-gray-50">
              <p className="text-sm font-semibold text-gray-900 line-clamp-1">{user?.name || t('shell.guestName')}</p>
              <p className="text-xs text-gray-500 line-clamp-1">{user?.email || t('shell.guestEmail')}</p>
            </div>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <Icon name="User" size={16} /> {t('shell.profile')}
            </button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <Icon name="Settings" size={16} /> {t('shell.settings')}
            </button>
            <div className="border-t border-gray-50 my-1"></div>
            <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
              <Icon name="LogOut" size={16} /> {t('shell.signOut')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
