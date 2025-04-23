
import { useContext, useEffect, useState } from 'react';
import useBookings from '../../../Hooks/useBookings';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import TableRow from './TableRow';

const MyAssignedTour = () => {
    const { bookings,refetch } = useBookings();
    const {user} = useContext(AuthContext);
    const [myAssignedTour, setMyAssignedTour] = useState([]);
    console.log(bookings);
    useEffect(()=>{
        const findBookings = bookings?.filter(item=>item?.guide?.toUpperCase() === user?.displayName?.toUpperCase());
        console.log(findBookings);
        if(findBookings){
            setMyAssignedTour(findBookings)
        }
    },[bookings, user?.displayName]);

    return (
        <div className="overflow-x-auto">
            <table className="table table-xs">
                <thead>
                    <tr>
                        <th></th>
                        <th>Package Name</th>
                        <th>Tourist Name</th>
                        <th>Tour Date</th>
                        <th>Tour Price</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        myAssignedTour?.map((item,index)=><TableRow 
                        key={index} 
                        item={item} 
                        index={index}
                        refetch={refetch}
                        ></TableRow>)
                    }
               </tbody>

            </table>
        </div>
    );
};

export default MyAssignedTour;