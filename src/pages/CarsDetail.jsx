import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import { Button, Image } from "antd";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";

const CarsDetail = () => {
  const axios = useAxios();
  const { id } = useParams();
  const [car, setCar] = useState({});
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState("");
  const [allImages, setAllImages] = useState([]);

  const getSingleCar = async (id) => {
    const tempData = await axios({ url: `cars/${id}` });
    if (tempData && tempData.data) {
      setCar(tempData.data);
      setActiveImg(tempData.data.image);
      setAllImages(tempData.data.gallery);
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

          <div className="thumbnail flex items-center gap-3">
            {allImages?.map((photo, idx) => {
              return (
                <img
                  onClick={() => {
                    allImages.splice(idx, 1, activeImg);

                    setActiveImg(photo);
                  }}
                  className="w-30 h-20 cursor-pointer"
                  key={idx}
                  src={photo}
                />
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => {
              navigate(`/edit/${id}`);
            }}
            className="w-[25px] h-[25px]"
            icon={<Pencil2Icon />}
          ></Button>
          <Button
            onClick={async () => {
              const temDelete = await axios({
                url: `cars/${id}`,
                method: "DELETE",
              });
              temDelete && navigate(`/`);
            }}
            className="w-[25px] h-[25px]"
            icon={<TrashIcon />}
          ></Button>
        </div>

        <div className="car-about w-[45%]"></div>
      </div>
    </div>
  );
};

export default CarsDetail;
