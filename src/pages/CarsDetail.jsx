import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import { Image } from "antd";

const CarsDetail = () => {
  const axios = useAxios();
  const { id } = useParams();
  const [car, setCar] = useState({});
  const [activeImg, setActiveImg] = useState("");

  const getSingleCar = async (id) => {
    const tempData = await axios({ url: `cars/${id}` });
    if (tempData && tempData.data) {
      setCar(tempData.data);
      setActiveImg(tempData.data.image);
    }
  };

  useEffect(() => {
    getSingleCar(id);
  }, [id]);

  return (
    <div className="mt-10">
      <div className="mycon flex justify-between">
        <div className="car-photos w-[45%] flex flex-col gap-4">
          <div>
            <h3>{car.name}</h3>
            <h5>
              ${car.pricePerDay} <span>/ day</span>
            </h5>
          </div>

          <Image className="w-[400px] h-[300px]" src={activeImg} />
          {/* <img src={car.image} alt={car.id} /> */}

          <div className="thumbnail flex items-center gap-3">
            {car.gallery?.map((photo, idx) => {
              return (
                <img
                  onClick={() => setActiveImg(photo)}
                  className="w-30 h-20 cursor-pointer"
                  key={idx}
                  src={photo}
                />
              );
            })}
          </div>
        </div>

        <div className="car-about w-[45%]"></div>
      </div>
    </div>
  );
};

export default CarsDetail;
