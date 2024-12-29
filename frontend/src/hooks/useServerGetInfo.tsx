import { useQuery } from '@tanstack/react-query';
import { API } from '../services/api';

export function useServerGetInfo() {
  return useQuery({
    queryKey: ['server'],
    queryFn: () => API.getServerInfo(),
    staleTime: 1000 * 60 * 5,
  });
}
