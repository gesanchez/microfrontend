import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Icon } from "@repo/ui/Icon";

interface CreateAccountProps {
  onCreate: (data: any) => void;
}

export const CreateAccount = ({ onCreate }: CreateAccountProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', bio: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ ...formData, id: Date.now(), status: 'active' });
    navigate('..'); // Navigate back to list
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8">
        <header className="flex items-center gap-4">
          <button 
            onClick={() => navigate('..')}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
          >
            <Icon name="ArrowLeft" size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t('account.createTitle')}</h1>
            <p className="text-gray-500 font-medium text-sm">{t('account.createSubtitle')}</p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 ml-1">{t('account.fullName')}</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none transition-all font-medium" 
                placeholder={t('account.placeholderName')}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 ml-1">{t('account.email')}</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none transition-all font-medium" 
                placeholder={t('account.placeholderEmail')}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-gray-600 ml-1">{t('account.shortBio')}</label>
              <textarea 
                rows={4} 
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-600 outline-none transition-all font-medium resize-none" 
                placeholder={t('account.placeholderBio')}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button 
              type="button"
              onClick={() => navigate('..')}
              className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-600 font-bold rounded-xl transition-all border border-gray-200"
            >
              {t('account.cancel')}
            </button>
            <button 
              type="submit"
              className="px-8 py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl transition-all shadow-lg shadow-gray-200"
            >
              {t('account.createAction')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
