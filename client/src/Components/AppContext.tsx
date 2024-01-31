import { createContext } from 'react';

export type VideoData = {
  songId: number;
  userId: number;
  title: string;
  url: string;
};

export type AppContextValues = {
  allSongs: VideoData[] | [];
};

export const AppContext = createContext<AppContextValues>({
  allSongs: [],
});

export const UserProvider = AppContext.Provider;
