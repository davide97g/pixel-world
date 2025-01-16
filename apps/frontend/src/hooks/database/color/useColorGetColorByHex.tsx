import { useQuery } from '@tanstack/react-query';
import { API } from '../../../services/api';

export const useColorGetColorByHer = (hex?: string) => {
  return useQuery({
    queryKey: ['color', hex],
    queryFn: () => API.getColorByHex(hex!),
    enabled: !!hex,
  });
};
