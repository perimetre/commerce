import { useEffect } from 'react';
import { State, useUI } from '@components/ui/context';
import { getRandomPairOfColors } from '@lib/colors';

interface UIState extends State {
  setUserAvatar: (arg: string | null) => void;
}

export const useUserAvatar = (name = 'userAvatar') => {
  const { userAvatar, setUserAvatar } = useUI() as UIState;

  useEffect(() => {
    if (!userAvatar && localStorage.getItem(name)) {
      // Get bg from localStorage and push it to the context.
      setUserAvatar(localStorage.getItem(name));
    }
    if (!localStorage.getItem(name)) {
      // bg not set locally, generating one, setting localStorage and context to persist.
      const bg = getRandomPairOfColors();
      const value = `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`;
      localStorage.setItem(name, value);
      setUserAvatar(value);
    }
  }, [userAvatar, setUserAvatar, name]);

  return {
    userAvatar,
    setUserAvatar
  };
};
