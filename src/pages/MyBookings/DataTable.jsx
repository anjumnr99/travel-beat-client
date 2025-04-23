import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

import { useQuery } from "@tanstack/react-query";
import Row from "./Row";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

// import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import Swal from "sweetalert2";

const DataTable = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [applyBtnShow, setApplyBtnShow] = useState([0]);
    // const { width, height } = useWindowSize()
    console.log(user);
    const { data: bookings, refetch } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/users?email=${user?.email}`);
            // console.log('res data:',res.data);
            return res.data;
        }
    });
    console.log(bookings);

    useEffect(() => {
        if (bookings) {
            const acceptedBooking = bookings?.filter(booking => booking?.status?.toUpperCase() === 'Accepted'.toUpperCase());
            console.log(acceptedBooking);
            setApplyBtnShow(acceptedBooking)
            if(applyBtnShow.length > 3){
                Swal.fire({
                    title: "Congratulation!",
                    text: "You have got a discount. Click the Apply button to get a discount!" ,
                    width: 500,
                    padding: "2em",
                    color: "#716add",
                    background: "#fff url(/images/trees.png)",
                    backdrop: `
                      rgba(0,0,123,0.4)
                      url("/images/nyan-cat.gif")
                      left top
                      no-repeat
                    `
                  });
            }
        }

    }, [applyBtnShow.length, bookings]);


    return (
        <div className="overflow-x-auto">
            {
                applyBtnShow.length > 3 && <Confetti
                    // width={600}
                    // height={500}
                    recycle={false}
                    numberOfPieces={1000}
                    tweenDuration={5000}
                    // drawShape={ctx => {
                    //     ctx.beginPath()
                    //     for(let i = 0; i < 22; i++) {
                    //       const angle = 0.35 * i
                    //       const x = (0.2 + (1.5 * angle)) * Math.cos(angle)
                    //       const y = (0.2 + (1.5 * angle)) * Math.sin(angle)
                    //       ctx.lineTo(x, y)
                    //     }
                    //     ctx.stroke()
                    //     ctx.closePath()
                    //   }}
                    onConfettiComplete={Confetti}

                    className="w-full"
                />
            }

            <table className="table table-xs">
                <thead>
                    <tr>
                        <th scope="col" className="p-4">
                            <div className="flex items-center">
                                #
                            </div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Package
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tour guide
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tour date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>

                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        bookings?.map((booking, index) => <tr key={index}>
                            <Row index={index} refetch={refetch} booking={booking} applyBtnShow={applyBtnShow} ></Row>
                        </tr>)
                    }

                </tbody>



            </table>
        </div>

        // <div className="relative shadow-md sm:rounded-lg">

        //     <table className=" text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        //         <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        //             <tr>
        //                 <th scope="col" className="p-4">
        //                     <div className="flex items-center">
        //                         #
        //                     </div>
        //                 </th>
        //                 <th scope="col" className="px-6 py-3">
        //                     Package
        //                 </th>
        //                 <th scope="col" className="px-6 py-3">
        //                     Tour guide
        //                 </th>
        //                 <th scope="col" className="px-6 py-3">
        //                     Tour date
        //                 </th>
        //                 <th scope="col" className="px-6 py-3">
        //                     Price
        //                 </th>
        //                 <th scope="col" className="px-6 py-3">
        //                     Status
        //                 </th>
        //                 {/* <th scope="col" className="px-6 py-3">
        //                     Price
        //                 </th>
        //                 <th scope="col" className="px-6 py-3">
        //                     Weight
        //                 </th> */}
        //                 <th scope="col" className="px-6 py-3">
        //                     Action
        //                 </th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {
        //                 bookings?.map((booking, index) => <Row key={index} index={index} booking={booking}></Row> )
        //             }

        //         </tbody>
        //     </table>
        // </div>

    );
};

export default DataTable;