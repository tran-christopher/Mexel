import { useContext } from 'react';
import { AppContext, AppContextValues } from './AppContext';

export function useUser(): AppContextValues {
  const contextValue = useContext(AppContext);
  if (!contextValue) {
    throw new Error('Wrap it before you tap it');
  }
  return contextValue;
}
