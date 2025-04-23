import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://travel-tour-server-project-h3nj78i1a-anjus-projects-6a90d7b7.vercel.app'
})
const useAxiosSecure = () => {
    
    const {logOut} = useContext(AuthContext)
    const navigate = useNavigate();
    axiosSecure.interceptors.request.use(function (config){
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config
        
    }, function (error){
        return Promise.reject(error);
    }) ;

    // interceptor 401 and 403 status
    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, async(error)=>{
        const status = error?.response?.status;
        //for 401 , 403 logout the user and move the user to the login page
        if(status === 401 || status === 403){
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    })
    return axiosSecure;
};

export default useAxiosSecure;