import { Link } from "react-router-dom";

const CarsCard = ({ car }) => {
  const { image, id } = car;
  return (
    <Link to={`/cars/${id}`} className="w-full">
      <img src={image} className="h-[200px] w-[350px]" alt="" />
      <p>{car.name}</p>
    </Link>
  );
};

export default CarsCard;
