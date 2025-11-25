import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useEffect, useState } from "react";
import { Input, InputNumber, Select } from "antd";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";

export default function Edit() {
  const axios = useAxios();
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [gallery, setGallery] = useState(null);
  const navigate = useNavigate()

  const getSingleCar = async (id) => {
    const tempData = await axios({ url: `cars/${id}` });
    if (tempData && tempData.data) {
      setCar(tempData.data);
      setGallery(tempData.data.gallery);
    }
  };

  useEffect(() => {
    getSingleCar(id);
  }, [id]);

  function handleGallery(url) {
    const result = gallery.filter((photo) => photo !== url);

    setGallery(result);
    car.gallery = result;
    console.log(car.gallery);
  }

  function addImage() {
    const img = prompt("URL kiriting");

    try {
      new URL(img);
      setGallery((prev) => [...prev, img]);
      console.log(car.gallery);
    } catch (error) {
      alert("URL kiritgin ikam");
    }
  }

  return (
    car && (
      <div className="py-10">
        <div className="mx-auto px-5 mycon">
          <h2 className="text-3xl mb-5 font-bold">{car.id}</h2>
          <form className="px-10">
            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-2">
                <label className="font-medium" htmlFor="name">
                  Mashina nomi
                </label>
                <Input
                  placeholder="Mashina nomi"
                  name="name"
                  id="name"
                  defaultValue={car.name}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium" htmlFor="pricePerDay">
                  Kunlik ijara narxi $
                </label>
                <InputNumber
                  name="pricePerDay"
                  id="pricePerDay"
                  min={1}
                  max={1000}
                  defaultValue={car.pricePerDay}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-2">
                <label className="font-medium" htmlFor="fuel">
                  Yonilg'i turi
                </label>
                <Input
                  placeholder="Tur nomini yozing"
                  name="fuel"
                  id="fuel"
                  defaultValue={car.fuel}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-medium" htmlFor="drive">
                  Mashina tortish turi(4x4)
                </label>
                <Select
                  defaultValue={car.drive}
                  name="drive"
                  options={[
                    { value: "AWD", label: <span>4x4</span> },
                    { value: "FWD", label: <span>2x oldi</span> },
                    { value: "RWD", label: <span>2x orqa</span> },
                  ]}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="flex flex-col gap-2">
                <label className="font-medium" htmlFor="gearbox">
                  Uzatmalar qutisi
                </label>
                <Select
                  defaultValue={car.gearbox}
                  name="gearbox"
                  options={[
                    { value: "Manual", label: <span>Mexanik</span> },
                    { value: "Automatic", label: <span>Avtomat</span> },
                  ]}
                />
              </div>
            </div>

            <div className="flex gap-4 mt-5">
              {gallery.map((photo, idx) => {
                return (
                  <div className="relative overflow-hidden rounded-md shadow-md w-20 h-20 group cursor-pointer">
                    <img
                      className="w-full h-full object-center 
                    object-cover flex items-center justify-center"
                      src={photo}
                      alt={`${idx + 1} rasm.`}
                    />

                    {gallery.length > 2 && (
                      <div
                        onClick={() => handleGallery(photo)}
                        className="absolute inset-0 bg-black/60 opacity-0 group group-hover:opacity-100 transition flex items-center justify-center"
                      >
                        <button type="button">
                          <TrashIcon className="text-white w-6 h-6 cursor-pointer" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
              <button
                type="button"
                onClick={addImage}
                className="border-dashed border-slate-200 border-2 w-20 h-20 hover:border-blue-500 hover:text-blue-500 rounded-md inline-flex items-center justify-center cursor-pointer group"
              >
                <PlusCircledIcon className="w-6 h-6 text-slate-200 group-hover:text-blue-500" />
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
