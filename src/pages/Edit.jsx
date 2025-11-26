import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import { Input, InputNumber, Select, message } from "antd";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import "../../loader.css";

export default function Edit() {
  const axios = useAxios();
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [gallery, setGallery] = useState(null);
  const navigate = useNavigate();
  const [drive, setDrive] = useState(null);
  const [gearbox, setGearbox] = useState(null);
  const [airConditioner, setAirConditioner] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const getSingleCar = async (id) => {
    const tempData = await axios({ url: `cars/${id}` });
    if (tempData && tempData.data) {
      setCar(tempData.data);
      setGallery(tempData.data.gallery);
      setAirConditioner(tempData.data.details.airConditioner);
      setDrive(tempData.data.drive);
      setGearbox(tempData.data.gearbox);
    }
  };

  useEffect(() => {
    getSingleCar(id);
  }, [id]);

  function handleGallery(url) {
    const result = gallery.filter((photo) => photo !== url);
    setGallery(result);
    car.gallery = result;
  }

  function addImage() {
    const img = prompt("URL kiriting");

    try {
      new URL(img);
      setGallery((prev) => [...prev, img]);
    } catch (error) {
      alert("URL noto‘g‘ri!");
    }
  }

  if (!car) {
    return (
      <div className="mycon">
        <div className="flex justify-center mt-20">
          <div className="loader"></div>
        </div>
      </div>
    );
  }

  return (
    car && (
      <div className="py-10">
        <div className="mx-auto px-5 mycon">
          {contextHolder}
          <h2 className="text-3xl mb-5 font-bold">{car.id}</h2>

          <form className="px-10" id="carForm">
            {/* NAME + PRICE */}
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-2">
                <label className="font-medium" htmlFor="name">
                  Mashina nomi
                </label>
                <Input
                  placeholder="Mashina nomi"
                  name="name"
                  defaultValue={car.name}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium" htmlFor="pricePerDay">
                  Kunlik ijara narxi $
                </label>
                <InputNumber
                  name="pricePerDay"
                  min={1}
                  max={1000}
                  defaultValue={car.pricePerDay}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 mt-5">
              <div className="flex flex-col gap-2">
                <label className="font-medium">Yonilg'i turi</label>
                <Input defaultValue={car.fuel} name="fuel" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium">Mashina tortish turi</label>
                <Select
                  defaultValue={drive}
                  value={drive}
                  onChange={(el) => setDrive(el)}
                  options={[
                    { value: "AWD", label: "4x4" },
                    { value: "FWD", label: "2x oldi" },
                    { value: "RWD", label: "2x orqa" },
                  ]}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 mt-5">
              <div className="flex flex-col gap-2">
                <label className="font-medium">Uzatmalar qutisi</label>
                <Select
                  value={gearbox}
                  onChange={(v) => setGearbox(v)}
                  options={[
                    { value: "Manual", label: "Mexanik" },
                    { value: "Automatic", label: "Avtomat" },
                  ]}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-8 flex-wrap">
              {gallery.map((photo, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-md shadow-md w-20 h-20 group"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={photo}
                    alt=""
                  />

                  {gallery.length > 2 && (
                    <div
                      onClick={() => handleGallery(photo)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                    >
                      <TrashIcon className="text-white w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addImage}
                className="border-dashed border-slate-300 border-2 w-20 h-20 rounded-md inline-flex items-center justify-center hover:border-blue-500 hover:text-blue-500"
              >
                <PlusCircledIcon className="w-6 h-6" />
              </button>
            </div>

            <h3 className="text-2xl font-bold mt-10 mb-5">Batafsil</h3>

            <div className="grid grid-cols-3 gap-10">
              <div className="flex flex-col gap-2">
                <label>Eshiklar soni</label>
                <InputNumber
                  name="doors"
                  min={1}
                  defaultValue={car.details.doors}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>O‘rinlar soni</label>
                <InputNumber
                  name="seats"
                  min={1}
                  defaultValue={car.details.seats}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Yurgan masofa (km)</label>
                <InputNumber
                  name="distance"
                  min={0}
                  defaultValue={car.details.distance}
                />
              </div>
            </div>

            <div className="mt-8">
              <label className="font-medium">Konditsioner</label>
              <Select
                value={airConditioner}
                onChange={(v) => setAirConditioner(v)}
                options={[
                  { value: "Yes", label: "Bor" },
                  { value: "No", label: "Yo'q" },
                ]}
              />
            </div>

            <h3 className="text-2xl font-bold mt-10 mb-3">Jihozlar</h3>

            <div className="grid grid-cols-2 gap-10">
              <div>
                <p className="font-semibold mb-2">Xavfsizlik</p>

                {car.equipment.safety.map((item, i) => (
                  <label key={i} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      name="safety"
                      value={item}
                      defaultChecked
                    />
                    {item}
                  </label>
                ))}
              </div>

              <div>
                <p className="font-semibold mb-2">Qulayliklar</p>

                {car.equipment.comfort.map((item, i) => (
                  <label key={i} className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      name="comfort"
                      value={item}
                      defaultChecked
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const form = document.getElementById("carForm");
                const formData = new FormData(form);

                const updatedCar = {
                  name: formData.get("name"),
                  pricePerDay: Number(formData.get("pricePerDay")),
                  fuel: formData.get("fuel"),
                  drive: drive,
                  gearbox: gearbox,
                  airConditioner: airConditioner === "Yes" ? true : false,
                  gallery,
                  details: {
                    doors: Number(formData.get("doors")),
                    seats: Number(formData.get("seats")),
                    distance: Number(formData.get("distance")),
                    airConditioner: airConditioner,
                  },
                  equipment: {
                    safety: formData.getAll("safety"),
                    comfort: formData.getAll("comfort"),
                  },
                };

                messageApi.info("Mashina ma'lumotlari tahrirlanmoqda");
                const editFunc = async () => {
                  try {
                    const tempVedit = await axios({
                      url: `cars/${id}`,
                      method: "PATCH",
                      body: updatedCar,
                    });
                    if (tempVedit) navigate(`/cars/${id}`);
                  } catch (error) {
                    console.log("Edit xatosi:", error);
                  }
                };
                editFunc();
                console.log(JSON.stringify(updatedCar, null, 2));
              }}
              className="bg-blue-600 text-white mt-10 px-5 py-2 rounded-md cursor-pointer"
            >
              Saqlash
            </button>
          </form>
        </div>
      </div>
    )
  );
}
