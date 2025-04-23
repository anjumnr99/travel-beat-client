
import StoryCard from "./StoryCard";
import { Link } from "react-router-dom";
import useAllStories from "../../../Hooks/useAllStories";



const Stories = () => {

    // const axiosPublic = useAxiosPublic();

    // const { data: stories  } = useQuery({
    //     queryKey: ['stories'],
    //     queryFn: async() => {
    //         const res = await axiosPublic.get('/stories');
    //         return res.data;
    //     }
    // });
    const stories = useAllStories()

    console.log(stories);

    return (
        <div>
            <h1 className='text-3xl lg:text-5xl font-semibold text-slate-800 text-center my-10'>Tourist Story</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
                {
                    stories?.slice(0, 4).map(item => <StoryCard key={item._id} item={item}></StoryCard>)
                }

            </div>
            <Link to='/all-stories' className="flex pb-10 items-center justify-center">
                <button className="btn btn-outline btn-info ">All Stories</button>
            </Link>

        </div>


    );
};

export default Stories;