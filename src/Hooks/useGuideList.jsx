import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useGuideList = () => {
    const axiosPublic = useAxiosPublic();

    // console.log(id);

    const { data: guideList } = useQuery({
        queryKey: ['guides'],
        queryFn: async () => {
            const res = await axiosPublic.get('/guides');
            // console.log('res data:',res.data);
            return res.data;
        }
    });

    return [guideList];
};

export default useGuideList;