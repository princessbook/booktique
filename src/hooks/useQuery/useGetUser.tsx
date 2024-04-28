import { getUserId } from '@/utils/userAPIs/authAPI';
import { useQuery } from '@tanstack/react-query';

const useGetUser = () => {
  const {
    data: user,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['user_id'],
    queryFn: getUserId,
    staleTime: 1000 * 5
  });

  return { user, isLoading, isError };
};

export default useGetUser;
