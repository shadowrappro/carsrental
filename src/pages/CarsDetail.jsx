import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import { Button, Image, Modal, message } from "antd";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import gearbox from "../images/gearbox.svg";
import fuel from "../images/fuel.svg";
import trueIcon from "../images/trueIcon.svg";
import conditioner from "../images/conditioner.svg";
import seats from "../images/seats.svg";
import doors from "../images/doors.svg";
import distance from "../images/distance.svg";
import Header from "../components/header/Header";
import "../../loader.css";

const CarsDetail = () => {
  const axios = useAxios();
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const absValue = car?.equipment?.safety?.find((item) => item === "ABS");
  const cruiseControlVal = car?.equipment?.comfort?.find(
    (item) => item === "Cruise Control"
  );
  const airConditionerVal = car?.equipment?.comfort?.find(
    (item) => item === "Air Conditioner"
  );
  const airBagsValue = car?.equipment?.safety?.find(
    (item) => item === "Air Bags"
  );

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

  if (!car) {
    return (
      <div className="mycon">
        <Header />
        <div className="flex justify-center mt-20">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  function showModal() {
    setIsModalOpen(true);
  }
  function handleCancel() {
    setIsModalOpen(false);
  }
  function handleOk() {
    setIsModalOpen(false);
    messageApi.info("Mashina ma'lumotlari o'chirilmoqda");
    const temDel = async () => {
      const temDelete = await axios({
        url: `cars/${id}`,
        method: "DELETE",
      });
      temDelete && navigate(`/`);
    };

    temDel();
  }

  return (
    <div className="mycon">
      {contextHolder}
      <Header />

      <Modal
        title="Rostdan ham o'chirmoqchimisiz?"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <p>Yaxshilab o'ylab ko'rdingmi?</p>
      </Modal>

      <div className="flex gap-3 mt-5 justify-between">
        <Button
          onClick={() => navigate(`/edit/${id}`)}
          className="w-[25px] h-[25px]"
          icon={<Pencil2Icon />}
        ></Button>

        <Button
          onClick={showModal}
          className="w-[25px] h-[25px]"
          icon={<TrashIcon />}
        ></Button>
      </div>

      <div className="flex mt-3 justify-between">
        <div className="car-photos w-[45%] flex flex-col gap-4">
          <div>
            <h3 className="text-[40px] font-bold">{car.name}</h3>
            <span className="flex gap-1 items-center">
              <p className="text-[#5937E0] text-[40px] font-semibold">
                ${car.pricePerDay}
              </p>
              / day
            </span>
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

        <div className="car-about w-[45%]">
          <p className="text-[24px] font-semibold">Technical Specification</p>

          <ul className="grid grid-cols-3 mt-10 gap-8">
            <li className="w-[196px] h-[148px] bg-black/5 px-[24px] py-[24px] rounded-2xl">
              <img className="mb-[20px]" src={gearbox} alt="gearbox" />
              <p className="mb-2 font-bold">Gear Box</p>
              <span>{car.gearbox}</span>
            </li>

            <li className="w-[196px] h-[148px] bg-black/5 px-[24px] py-[24px] rounded-2xl">
              <img className="mb-[20px]" src={fuel} alt="fuel" />
              <p className="mb-2 font-bold">Fuel</p>
              <span>{car.fuel}</span>
            </li>

            <li className="w-[196px] h-[148px] bg-black/5 px-[24px] py-[24px] rounded-2xl">
              <img className="mb-[20px]" src={doors} alt="doors" />
              <p className="mb-2 font-bold">Doors</p>
              <span>{car.details?.doors}</span>
            </li>

            <li className="w-[196px] h-[148px] bg-black/5 px-[24px] py-[24px] rounded-2xl">
              <img
                className="mb-[20px]"
                src={conditioner}
                alt="AirConditioner"
              />
              <p className="mb-2 font-bold">Air Conditioner</p>
              <span>{car.details?.airConditioner}</span>
            </li>

            <li className="w-[196px] h-[148px] bg-black/5 px-[24px] py-[24px] rounded-2xl">
              <img className="mb-[20px]" src={seats} alt="seats" />
              <p className="mb-2 font-bold">Seats</p>
              <span>{car.details?.seats}</span>
            </li>

            <li className="w-[196px] h-[148px] bg-black/5 px-[24px] py-[24px] rounded-2xl">
              <img className="mb-[20px]" src={distance} alt="distance" />
              <p className="mb-2 font-bold">Distance</p>
              <span>{car.details?.distance}</span>
            </li>
          </ul>

          <button className="text-white w-[290px] h-[50px] bg-purple-600 rounded-[12px] font-bold p-28px mt-16 cursor-pointer">
            Rent a car
          </button>

          <p className="mt-16 text-[24px] font-semibold">Car Equipment</p>

          <ul className="grid grid-cols-2 gap-3 mt-10">
            <li className="flex gap-2">
              <img src={trueIcon} width={24} height={24} alt="trueIcon" />
              <span>{absValue}</span>
            </li>

            <li className="flex gap-2">
              <img src={trueIcon} width={24} height={24} alt="trueIcon" />
              <span>{airBagsValue}</span>
            </li>

            <li className="flex gap-2">
              <img src={trueIcon} width={24} height={24} alt="trueIcon" />
              <span>{cruiseControlVal}</span>
            </li>

            <li className="flex gap-2">
              <img src={trueIcon} width={24} height={24} alt="trueIcon" />
              <span>{airConditionerVal}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CarsDetail;
