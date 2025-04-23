import Swal from "sweetalert2";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


// eslint-disable-next-line react/prop-types
const TableRow = ({ item, index, refetch }) => {
    const { _id, name, email, guide, date, image, price, packageName, status } = item || {};
    // const axiosPublic = useAxiosPublic();

    const axiosSecure = useAxiosSecure()


    const handleReject = () => {
        axiosSecure.patch(`/bookings/guide/reject/${_id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'This tour is rejected',
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            })

    }

    const handleAccept = () => {
        axiosSecure.patch(`/bookings/guide/accept/${_id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: 'This tour is accepted',
                        showConfirmButton: false,
                        timer: 1000
                    });
                }
            })
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{packageName}</td>
            <td>{name}</td>
            <td>{date}</td>
            <td>{price}</td>
            <td>{status}</td>
            <td><div className='flex gap-1'>

                <button onClick={() => handleReject(_id)} className="font-sm btn btn-outline hover:bg-red-300 hover:text-red-900 text-red-600 dark:text-red-500 ">Reject</button>
                <button onClick={() => handleAccept(_id)} className="font-sm btn btn-outline hover:bg-blue-300 hover:text-blue-900 text-blue-600 dark:text-blue-500 ">Accept</button>
            </div></td>
        </tr>
    );
};

export default TableRow;