
import { Helmet, HelmetProvider } from "react-helmet-async";
import Banner from "./Banner/Banner";
import TabItems from "./TabsItems/TabItems";
import TourType from "./TourType/TourType";
import Stories from "./Story/Stories";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Travel Beat | Home</title>
            </Helmet>
            <div>
                <Banner></Banner>
                <div className="">
                    <TabItems></TabItems>
                    <TourType></TourType>
                    <Stories></Stories>

                </div>

            </div>
        </div>
    );
};

export default Home;