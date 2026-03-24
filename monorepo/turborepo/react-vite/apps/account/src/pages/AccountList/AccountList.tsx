import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Icon } from "@repo/ui/Icon";

interface AccountListProps {
  accounts: any[];
  onDelete: (id: number) => void;
}

export const AccountList = ({ accounts, onDelete }: AccountListProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('account.listTitle')}</h1>
          <p className="text-gray-500 font-medium">{t('account.listSubtitle')}</p>
        </div>
        <button 
          onClick={() => navigate('new')}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all transform hover:-translate-y-0.5 shadow-md shadow-blue-200 flex items-center gap-2"
        >
          <Icon name="Plus" size={20} />
          {t('account.newAccount')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <div key={account.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-4 hover:shadow-md transition-shadow relative group">
            <button 
              onClick={() => onDelete(account.id)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
            >
              <Icon name="Trash2" size={18} />
            </button>
            
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Icon name="User" size={24} />
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 truncate pr-8">{account.name}</h3>
              <p className="text-sm text-gray-500 font-medium truncate">{account.email}</p>
            </div>
            
            <div className="pt-2 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                account.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {account.status}
              </span>
              <span className="text-xs text-gray-400 font-medium">{t('account.added')} Dec 2023</span>
            </div>
          </div>
        ))}

        {accounts.length === 0 && (
          <div className="col-span-full py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-white rounded-2xl shadow-sm mb-4">
              <Icon name="Users" size={32} className="text-gray-300" />
            </div>
            <h3 className="font-bold text-gray-900">{t('account.noAccounts')}</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-[200px]">{t('account.getStarted')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
