import { useQuery } from "@tanstack/react-query";

import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";


const useTourGuide = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure();
    const {  data: isGuide  } = useQuery({
        queryKey: [user?.email,'isGuide'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/users/guide/${user?.email}`);
            return res.data?.tourGuide;
        }
    })
    console.log(isGuide);

    return isGuide;

};

export default useTourGuide;