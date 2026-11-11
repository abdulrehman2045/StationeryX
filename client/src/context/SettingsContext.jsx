import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({});

  const refresh = () => api.get('/settings').then((res) => setSettings(res.data));

  useEffect(() => {
    refresh().catch(() => {});
  }, []);

  return <SettingsContext.Provider value={{ settings, refresh }}>{children}</SettingsContext.Provider>;
}
