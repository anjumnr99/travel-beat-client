import { useQuery } from "@tanstack/react-query";

import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const MyWishList = () => {
    const { user } = useContext(AuthContext);

    const axiosSecure = useAxiosSecure()
   
    const { data: wishLists, refetch } = useQuery({
        queryKey: ['wishList'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishLists?email=${user?.email}`)
            console.log(res.data);
            return res.data;
        }

    });

    const handleDelete = (id) => {
        console.log(id);
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "You want remove this package!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, remove it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/wishLists/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data?.deletedCount > 0) {
                            refetch();
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
                                title: "Removed successfully"
                              });
                        }

                    })

            }

        });
    }
    
    console.log(wishLists);
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Package Name</th>
                            <th>Package Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            wishLists?.map((item, index) => <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.packageName}</td>
                                <td>{item.packagePrice}</td>
                                <td><div className="flex gap-2">
                                    <button onClick={() => handleDelete(item?._id)} className="btn btn-outline uppercase btn-error">remove</button>
                                    <Link to={`/package-details/${item.packageId}`}>
                                        <button className="btn btn-outline uppercase btn-info">details</button>
                                    </Link>

                                </div></td>
                            </tr>)
                        }



                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyWishList;