import { Car, Fuel, Settings, Snowflake } from "lucide-react";

export const CarCardSkeleton = () => {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
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
    );
};

export const CarCard = ({ car }) => {
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="relative  from-gray-50 to-gray-100 h-48 flex items-center justify-center overflow-hidden">
                {car.image ? (
                    <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Car className="w-32 h-32 text-gray-300" />
                )}
            </div>

            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {car.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {car.type}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-3xl font-bold text-indigo-600">
                            ${car.pricePerDay}
                        </span>
                        <p className="text-sm text-gray-500">per day</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <Settings className="w-4 h-4" />
                        <span>{car.gearbox}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Fuel className="w-4 h-4" />
                        <span>{car.fuel}</span>
                    </div>
                    {car.airConditioner && (
                        <div className="flex items-center gap-1">
                            <Snowflake className="w-4 h-4" />
                            <span>AC</span>
                        </div>
                    )}
                </div>

                <button className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg">
                    View Details
                </button>
            </div>
        </div>
    );
};
