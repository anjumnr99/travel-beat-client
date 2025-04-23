import axios from "axios";

const axiosPublic = axios.create({
    baseURL: "https://travel-tour-server-project-h3nj78i1a-anjus-projects-6a90d7b7.vercel.app",

})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;