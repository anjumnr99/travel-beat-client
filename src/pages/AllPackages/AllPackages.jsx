import usePackages from "../../Hooks/usePackages";
import PackageCard from "../Home/OurPackages/PackageCard";

const AllPackages = () => {
    const [packages] = usePackages();
    console.log(packages.length);
    return (

        <div className="pt-[140px] md:pt-[180px] lg:pt:[127] pb-20 px-5">
            <h1 className='text-3xl lg:text-5xl font-semibold text-slate-800 text-center my-10'>Our Available Packages</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  px-6">
                {
                    packages?.map(item => <PackageCard key={item._id} item={item}></PackageCard>)
                }

            </div>
        </div>

    );
};

export default AllPackages;