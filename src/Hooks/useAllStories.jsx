
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useAllStories = () => {
    const axiosPublic = useAxiosPublic();

    const { data: stories  } = useQuery({
        queryKey: ['stories'],
        queryFn: async() => {
            const res = await axiosPublic.get('/stories');
            return res.data;
        }
    });
    return stories
};

export default useAllStories;