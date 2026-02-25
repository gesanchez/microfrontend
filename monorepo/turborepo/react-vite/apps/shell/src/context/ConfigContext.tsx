import { createContext, useContext, ReactNode } from 'react';

export interface MfeConfig {
  name: string;
  url: string;
  template: string;
}

interface ConfigContextType {
  mfes: MfeConfig[];
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider = ({ children, config }: { children: ReactNode; config: ConfigContextType }) => {
  return (
    <ConfigContext.Provider value={config}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
