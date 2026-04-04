import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Icon } from "@repo/ui/Icon";
import { Button } from "@repo/ui/button";

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
          <Button 
            onClick={() => navigate('..')}
            variant="outline"
            size="icon-sm"
          >
            <Icon name="ArrowLeft" size={24} />
          </Button>
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
            <Button 
              type="button"
              onClick={() => navigate('..')}
              variant="outline"
            >
              {t('account.cancel')}
            </Button>
            <Button 
              type="submit"
              variant="secondary"
            >
              {t('account.createAction')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
