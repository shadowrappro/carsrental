import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../../loader.css";

function SelectCategory({ type, setType }) {
  const data = useSelector((state) => state.carsData.data);
  const categories = useSelector((state) => state.carsData.categorys);

  if (!data?.data) {
    return (
      <div className="flex justify-center mt-20">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <section className="category ">
      <div className="mycon flex flex-col gap-2 sm:gap-4 md:gap-6 xl:gap-8">
        <h5 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Select a vehicle group
        </h5>

        <div className="w-[80%] m-auto gap-5 flex items-center justify-center">
          {categories.map((localType, idx) => (
            <button
              onClick={() => {
                setType(localType);
              }}
              key={idx}
              className={`${
                localType === type ? "bg-purple-500" : "bg-gray-500"
              } p-3 rounded-3xl text-white w-[120px] flex items-center justify-center cursor-pointer`}
            >
              {localType}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SelectCategory;
