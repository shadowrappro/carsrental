import { Link } from "react-router-dom";
import gearbox from "../../../images//gearbox.svg";

const CarsCard = ({ car }) => {
  const { image, id } = car;
  const { comfort } = car.equipment;
  const airCond = comfort.find((el) => el.includes("Air"));

  return (
    <div className="w-[410px] bg-black/3 rounded-t-3xl mt-8 mb-[20px]">
      <img src={image} className="h-[270px] w-[410px] rounded-t-3xl" alt="" />
      <div className="flex justify-between px-6 mt-5">
        <span>
          <p className="text-[22px] font-semibold">{car.name}</p>
          <p className="font-regular text-[16px] text-black/70">{car.type}</p>
        </span>

        <span className="flex flex-col items-center">
          <p className="text-[22px] text-[#5937E0] font-semibold">
            ${car.pricePerDay}
          </p>
          <span className="text-black/70">per day</span>
        </span>
      </div>
      <div className="px-6 flex justify-between mt-10">
        <span className="flex gap-1">
          <img src={gearbox} alt="" />
          {car.gearbox}
        </span>
        <span className="flex gap-1">
          <img src={gearbox} alt="" />
          {car.fuel}
        </span>
        <span className="flex gap-1">
          <img src={gearbox} alt="" />
          {airCond}
        </span>
      </div>
      <Link to={`/cars/${id}`} className="px-6">
        <button className="bg-purple-600 border-purple-600 w-[360px] mt-10 mb-6 rounded-[12px] text-white py-[10px] font-medium border border-transparent hover:border-purple-600 p-4 hover:bg-white hover:text-purple-500 cursor-pointer transition">Viev details</button>
      </Link>
    </div>
  );
};

export default CarsCard;
