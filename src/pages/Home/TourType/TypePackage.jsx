import { useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import usePackages from "../../../Hooks/usePackages";
import { useEffect, useState } from "react";
import PackageCard from "../OurPackages/PackageCard";


const TypePackage = () => {
    const { type } = useParams();
    const [packages] = usePackages();
    const [typePackage, setTypePackage] = useState([]);
    console.log(typeof (type));

    console.log(packages);

    useEffect(() => {
        const findPackages = packages?.filter(item => item?.tour_type?.toUpperCase() === type?.toUpperCase());
        console.log(findPackages);
        if (findPackages) {
            setTypePackage(findPackages)
        }
    }, [packages, type])

    return (

        <div className="pt-[140px] md:pt-[180px] lg:pt:[127] pb-20 px-5" >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
                {
                    typePackage?.map(item => <PackageCard key={item._id} item={item}></PackageCard>)
                }
            </div>

        </div>
    );
};

export default TypePackage;