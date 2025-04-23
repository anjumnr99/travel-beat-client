import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
// import { GiAutomaticSas } from "react-icons/gi";
import { AuthContext } from "../../AuthProvider/AuthProvider";

import { FcGoogle } from "react-icons/fc";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosPublic from '../../Hooks/useAxiosPublic';



const Register = () => {
    const { signUpWithEmailAndPassword, userUpdate, googleLogin } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();

    const handleSignUpWithEmailAndPassword = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const image = e.target.image.value;
        console.log(email, password, name);

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{6,}$/.test(password)) {
            return toast.error('Invalid password. The password must consists with at least one capital letter , one special character and 6 characters ')

        }


        signUpWithEmailAndPassword(email, password)
            .then(res => {
                userUpdate(name, image)
                    .then(() => {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                        // create user entry in the database
                        const userInfo = {
                            name,
                            email,
                            image
                        }

                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database');

                                }
                            })

                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseenter = Swal.stopTimer;
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        });
                        Toast.fire({
                            icon: "success",
                            title: "Profile successfully created!"
                        });
                        navigate('/');


                        // toast.success('Profile successfully created!')


                    })
            })
            .catch(err => {
                // toast.error(err.message)
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: err.message
                });
            })

    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result);
                // toast.success('Logged Successfully!')
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    image: result.user?.photoURL,
                    
                }

                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/')
                    })
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Signed in successfully"
                });
                navigate(location?.state ? location.state : '/')
            })
            .catch(err => {
                // toast.error(err.message)
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: err.message
                });

            })

    };
    return (
        <div className=" max-w-2xl mx-auto min-h-[60vh] pt-[140px] md:pt-[180px] lg:pt:[127] pb-20 px-3 py-3 my-5 flex flex-col  justify-center items-center ">
            <Helmet>
                <title>Travel Beat | Register</title>
            </Helmet>
            <div className="card flex-shrink-0 w-full  shadow-2xl bg-blue-100">
                <h2 className="my-4 text-3xl text-blue-700 font-semibold text-center">Create a New Account</h2>
                <p className="text-sm text-center text-blue-600 dark:text-gray-400">Already have an account? Please
                    <Link to='/login' className="focus:underline font-semibold text-blue-900 hover:underline"> Login here</Link>
                </p>
                <div className="card-body">
                    <form onSubmit={handleSignUpWithEmailAndPassword} >
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base text-blue-600 font-bold">Name</span>
                            </label>
                            <input type="text" placeholder="Enter your name" name="name" className="input input-bordered dark:border-gray-700  focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 border-blue-800 dark:bg-gray-900 dark:text-gray-100 
                                    focus:dark:border-violet-400" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base text-blue-600 font-bold">Img URL</span>
                            </label>
                            <input type="text" placeholder="Image URL" name="image" className="input input-bordered dark:border-gray-700  focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 border-blue-800 dark:bg-gray-900 dark:text-gray-100 
                                    focus:dark:border-violet-400" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base text-blue-600 font-bold">Email</span>
                            </label>
                            <input type="email" placeholder="Enter your email" name="email" className="input input-bordered dark:border-gray-700  focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 border-blue-800 dark:bg-gray-900 dark:text-gray-100 
                                    focus:dark:border-violet-400" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base text-blue-600 font-bold">Password</span>
                            </label>
                            <input type="password" placeholder="Enter your password" name="password" className="input input-bordered dark:border-gray-700  focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 border-blue-800 dark:bg-gray-900 dark:text-gray-100 
                                    focus:dark:border-violet-400" required />

                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 text-white">Register</button>
                        </div>

                    </form>

                    <div className="flex items-center w-full my-4">
                        <hr className="w-full border-blue-800  dark:text-gray-400" />
                        <p className="px-3 dark:text-gray-400">OR</p>
                        <hr className="w-full border-blue-800 dark:text-gray-400" />
                    </div>

                    <div className="my-6 space-y-4">
                        <button onClick={handleGoogleLogin} aria-label="Login with Google" type="button" className=" w-full p-4  border border-blue-700 rounded-md focus:ri focus:ri dark:border-gray-400 focus:ri">
                            <div className="flex items-center justify-center space-x-4 ">
                                <FcGoogle className="text-3xl "></FcGoogle>
                                <div className="text-blue-800 font-semibold">Login with Google</div>
                            </div>
                        </button>

                    </div>

                </div>


            </div>
        </div>
    );
};

export default Register;