import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import SelectCategory from "../components/home-components/SelectCategory";
import useAxios from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/cars-data-slice";
import { CarCard } from "../components/car-components/CarComponents";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.carsdata);
  const [loading, setLoading] = useState(true);
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
            {loading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                    <div className="bg-gray-200 h-48 w-full"></div>
                    <div className="p-5">
                      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="h-8 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                      </div>
                      <div className="flex gap-4 mb-4">
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                      </div>
                      <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
                    </div>
                  </div>
                ))
              : data?.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
