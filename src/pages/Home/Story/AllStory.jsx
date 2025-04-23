import useAllStories from "../../../Hooks/useAllStories";
import StoryCard from "./StoryCard";


const AllStory = () => {
    const stories = useAllStories()
    return (
        <div className="pt-[140px] md:pt-[180px] lg:pt:[127] pb-20 px-5">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  px-6">
                {
                    stories?.map(item => <StoryCard key={item._id} item={item}></StoryCard>)
                }

            </div>
        </div>

    );
};

export default AllStory;