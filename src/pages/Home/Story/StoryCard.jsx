import { Link } from "react-router-dom";


const StoryCard = ({item}) => {
    console.log(Object.keys(item));
    const {_id, userName, userEmail, userImage, spotPicture, reviewDescription} = item || {};
    return (
        <Link to={`/all-stories/${_id}`} className="w-full relative max-w-xs  border  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="block w-full rounded-lg h-full" src={spotPicture} />

            
                <div className="flex absolute top-2 left-2 items-start">
                    <div className="flex-shrink-0">
                        <img className="w-16 h-16 object-cover rounded-full" src={userImage}/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-lg font-medium text-gray-100 truncate dark:text-white">
                           {userName}
                        </p>
                        <p className="text-lg text-gray-100 truncate dark:text-gray-400">
                            {userEmail}
                        </p>
                    </div>

                </div>

           
        </Link>

    );
};

export default StoryCard;