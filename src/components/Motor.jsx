import PropTypes from "prop-types";

const Motor = ({ motor, label }) => {
  return (
    <div className="text-center">
      <img
        src="/images/panel_dial.png"
        alt="Panel Dial"
        className="w-24 mx-auto"
        style={{ transform: `rotate(calc(${motor.value} * 2.7deg))` }}
      />
      <div className="bg-gray-300 mt-2">
        <div className="bg-orange-500 text-white text-center" style={{ width: `${motor.value}%` }}>
          {motor.value}%
        </div>
      </div>
      <span className="text-black">{label}</span>
    </div>
  );
};

Motor.propTypes = {
  motor: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
};

export default Motor;
