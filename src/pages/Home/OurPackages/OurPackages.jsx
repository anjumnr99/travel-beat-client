import { Link } from "react-router-dom";
import usePackages from "../../../Hooks/usePackages";
import PackageCard from "./PackageCard";


const OurPackages = () => {
    const [packages] = usePackages();
    console.log(packages.length);

    return (
        <div className=" px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
                {
                    packages?.slice(0, 4).map(item => <PackageCard key={item._id} item={item}></PackageCard>)
                }

            </div>
            <Link to='/all-packages' className="flex pb-10 items-center justify-center">
                <button className="btn btn-outline btn-info ">All Packages</button>
            </Link>
        </div>


    );
};

export default OurPackages;