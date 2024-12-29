import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import { IUser } from '../../../types/user.types';

export const useUserGetUserById = (id?: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const docRef = doc(db, 'users', id!);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) return docSnap.data() as IUser;
      return undefined;
    },
    enabled: !!id,
  });
};
