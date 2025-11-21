import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import SelectCategory from "../components/home-components/SelectCategory";
import useAxios from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/cars-data-slice";
import { CarCard, CarCardSkeleton } from "../components/CarComponents"; // Yangi komponentlar

const Home = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.carsdata);
    const [loading, setLoading] = useState(true); // Loading state
    const axios = useAxios();

    const getCars = async () => {
        setLoading(true);
        try {
            let response = await axios({ url: "cars" });
            dispatch(setData(response.data.data));
        } catch (error) {
            console.error("brodar nimadur xato...", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCars();
    }, []);

    return (
        <>
            <Header />
            <SelectCategory />

            <section className="all-cars">
                <div className="max-w-7xl mx-auto px-4 pb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loading ? (
                            Array.from({ length: 10 }).map((_, i) => (
                                <CarCardSkeleton key={i} />
                            ))
                        ) : (
                            data?.map((car) => (
                                <CarCard key={car.id} car={car} />
                            ))
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;