const CarouselCard = ({ image, name, city, country, description }) => {
    return (
        <div
            className="relative min-w-[33.33%] h-[300px] flex items-end justify-center bg-cover bg-center rounded-lg shadow-md p-4"
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="bg-black bg-opacity-50 text-white p-4 w-full rounded-md">
                <h2 className="text-xl font-bold">{name}</h2>
                <p className="text-sm">
                    {city}, {country}
                </p>
                <p className="text-xs mt-2 line-clamp-2">{description}</p>
            </div>
        </div>
    );
};

export default CarouselCard;
