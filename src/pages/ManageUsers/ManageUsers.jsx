import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageUsers = () => {
    const [isClick, setIsClick] = useState('')
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { data: users, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosPublic.get('/allUsers');
            return res.data;
        }
    });
    console.log(users);

    const handleMakeAdmin = user => {

        axiosSecure.patch(`/users/admin/${user?._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    setIsClick(user?._id)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is Admin Now!`,
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            })
    }
    const handleMakeGuide = user => {
        console.log('Make guide');

        axiosSecure.patch(`/users/guide/${user?._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {

                    setIsClick(user?._id);

                    const newGuide = {
                        name: user.name,
                        profilePicture: user.image,
                        email: user.email
                    }

                    axiosSecure.post('/guides', newGuide)
                        .then(res => {
                            if (res.data.insertedId) {
                                refetch();

                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: `${user.name} is Tour Guide Now!`,
                                    showConfirmButton: false,
                                    timer: 1000
                                });
                            }
                        })


                }
            })
    }
    return (
        <div>

            <div>
                <div className="overflow-x-auto ">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((item, index) => <tr key={item._id} className="bg-base-200">
                                    <th>{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item?.role ? item?.role : 'User'}</td>

                                    <td className="flex gap-2">
                                        {
                                            isClick === item?._id ? <div className="flex gap-2"><button disabled
                                                onClick={() => handleMakeAdmin(item)}
                                                className={`btn text-white ${isClick ? 'disabled' : ''} bg-orange-600  btn-md`}>
                                                Make Admin
                                            </button>
                                                <button disabled
                                                    onClick={() => handleMakeGuide(item)}
                                                    className={`btn text-white ${isClick ? 'disabled' : ''} bg-red-600  btn-md`}>
                                                    Make Tour Guide
                                                </button>

                                            </div> : <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleMakeAdmin(item)}
                                                    className={`btn text-white ${isClick ? 'disabled' : ''} bg-orange-600  btn-md`}>
                                                    Make Admin
                                                </button>
                                                <button
                                                    onClick={() => handleMakeGuide(item)}
                                                    className={`btn text-white ${isClick ? 'disabled' : ''} bg-red-600  btn-md`}>
                                                    Make Tour Guide
                                                </button>
                                            </div>

                                        }

                                        {/* <div className="">
                                            {user?.role === 'admin' ? <button disabled
                                                onClick={() => handleMakeAdmin(user)}
                                                className={`btn text-white ${isClick ? 'disabled' : ''} bg-orange-600  btn-md`}>
                                                Make Admin
                                            </button> : <button
                                                onClick={() => handleMakeAdmin(user)}
                                                className={`btn text-white ${isClick ? 'disabled' : ''} bg-orange-600  btn-md`}>
                                                Make Admin
                                            </button>

                                            }

                                        </div>
                                        <div>
                                            {
                                                user?.role === 'guide' ? <button disabled
                                                    onClick={() => handleMakeGuide(user)}
                                                    className={`btn text-white ${isClick ? 'disabled' : ''} bg-red-600  btn-md`}>
                                                    Make Tour Guide
                                                </button> : <button
                                                    onClick={() => handleMakeGuide(user)}
                                                    className={`btn text-white ${isClick ? 'disabled' : ''} bg-red-600  btn-md`}>
                                                    Make Tour Guide
                                                </button>
                                            }

                                        </div> */}

                                    </td>


                                </tr>)
                            }



                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default ManageUsers;