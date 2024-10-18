import PropTypes from "prop-types";

const Switch = ({ switchData, label }) => {
  return (
    <div className="text-center">
      <div
        className={`rounded-full border-4 border-black w-20 h-20 mx-auto flex items-center justify-center ${
          switchData.value === "OFF" ? "bg-red-600" : "bg-green-500"
        }`}
      >
        <div className="rounded-full border-2 border-black w-12 h-12 flex items-center justify-center bg-white">
          <span>{switchData.value}</span>
        </div>
      </div>
      <span className="text-black">{label}</span>
    </div>
  );
};

Switch.propTypes = {
  switchData: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

export default Switch;
