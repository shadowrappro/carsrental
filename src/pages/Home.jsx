import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import SelectCategory from "../components/home-components/SelectCategory";
import useAxios from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/cars-data-slice";
import CarsCard from "../components/home-components/CarsCard/CarsCard";

const Home = () => {
  const dispatch = useDispatch();
  const axios = useAxios();
  const [type, setType] = useState("All");
  const { data } = useSelector((state) => state.carsData);

  const getCars = async (type) => {
    let data = await axios({
      url: "cars",
      params: type == "All" ? {} : { type },
    });
    dispatch(setData(data.data));
  };

  useEffect(() => {
    getCars(type);
  }, [type]);

  return (
    <>
      <Header />
      <SelectCategory type={type} setType={setType} />

      <section className="all-cars">
        <div className="mycon ">
          <div className="grid grid-cols-4 gap-5 mt-4">
            {data &&
              data?.data.map((car) => <CarsCard key={car.id} car={car} />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
