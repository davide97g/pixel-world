import { useMutation } from '@tanstack/react-query';
import { doc, setDoc } from 'firebase/firestore';

import { IUser } from '../../../../../types/user.types';
import { db } from '../../../config/firebase';

export const useUserCreateUser = () => {
  return useMutation({
    mutationFn: async (user: IUser) => {
      try {
        const docRef = doc(db, 'users', user.id);
        await setDoc(docRef, user, { merge: true });
      } catch (e) {
        console.error(e);
        throw new Error('Error creating user');
      }
    },
  });
};
