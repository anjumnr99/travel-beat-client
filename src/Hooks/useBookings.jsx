import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useBookings = () => {
    const axiosPublic = useAxiosPublic()
    const {  data: bookings, refetch  } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosPublic.get('/bookings');
            return res.data;
        }
    })
    return {bookings,refetch};
};


export default useBookings;