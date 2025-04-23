import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const Row = ({ booking, index, refetch, applyBtnShow }) => {
    const { _id, name, email, guide, date, image, price, packageName, status } = booking || {};
    const axiosPublic = useAxiosPublic()

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
                axiosPublic.delete(`/bookings/${id}`)
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
    return (
        <>
            <td >

                {index + 1}

            </td>
            <th >
                {packageName}
            </th>
            <td >
                {guide}
            </td>
            <td >
                {date}
            </td>
            <td >
                {price}
            </td>
            <td >
                {status}
            </td>

            <td className="flex items-center gap-3 px-6 py-4">
                {
                    status === 'Accepted' ? <Link to={`/dashboard/payment/${price}`}>
                        <button className="font-sm btn btn-outline hover:bg-blue-300 hover:text-blue-900 text-blue-600 dark:text-blue-500 ">Pay</button>
                    </Link>
                        : <button disabled className="font-sm btn btn-outline hover:bg-blue-300 hover:text-blue-900 text-blue-600 dark:text-blue-500 ">Pay</button>
                }
                {
                    status === "In Review" && <button onClick={() => handleDelete(_id)} className="font-sm btn btn-outline hover:bg-red-300 hover:text-red-900 text-red-600 dark:text-red-500 ">Cancel</button>
                }
                {
                    // eslint-disable-next-line react/prop-types
                    applyBtnShow?.length > 3 ? <button className="font-sm btn  btn-outline hover:bg-yellow-300 hover:text-yellow-900 text-yellow-400 dark:text-yellow-500 ">Apply</button> :
                        <button disabled className="font-sm btn  btn-outline hover:bg-yellow-300 hover:text-yellow-900 text-yellow-400 dark:text-yellow-500 ">Apply</button>
                }



            </td>
        </>

    );
};

export default Row;