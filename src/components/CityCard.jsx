import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { IoOptionsSharp } from "react-icons/io5";
import { FaCity } from "react-icons/fa";

const CityCard = ({ city }) => {
  const navigate = useNavigate();

  const handleVisitPanel = (cityId) => {
    navigate(`/panel/${cityId}`);
  };

  return (
    <div className="bg-white shadow-md border rounded-lg p-4 w-full max-w-sm">
      <img
        src={city.avatar}
        alt={`${city.name} avatar`}
        className="w-full object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{city.name}</h2>
      <div className="flex items-center flex-nowrap gap-2">
        Managed by:
        <img
          src={city.user.avatar}
          alt={`${city.user.first} ${city.user.last} avatar`}
          className="w-10 object-cover rounded-full"
        />
        <a href={city.user.url}>
          {city.user.first} {city.user.last}
        </a>
      </div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">Width: {city.width}</p>
        <p className="text-sm text-gray-500">Height: {city.height}</p>
      </div>
      <button
        className="rounded-none bg-[#ff5b00] hover:shadow-lg shadow-gray-800 text-white w-full py-1 mb-2 flex justify-center items-center gap-5"
        onClick={() => handleVisitPanel(city.id)}
      >
        <IoOptionsSharp />
        View Panel
      </button>
      <a
        target="_blank"
        href={city.url}
        className="rounded-none bg-[#ff5b00] hover:shadow-lg shadow-gray-800 text-white w-full py-1 flex justify-center items-center gap-5"
      >
        <FaCity />
        View City
      </a>
    </div>
  );
};

// Adding PropTypes validation
CityCard.propTypes = {
  city: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      first: PropTypes.string.isRequired,
      last: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CityCard;
