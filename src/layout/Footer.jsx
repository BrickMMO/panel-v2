const Footer = () => {
  return (
    <footer className="border-t border-gray-300 p-3 text-gray-600 text-center">
      ©{" "}
      <a className="text-[#ff5b00]" href="https://brickmmo.com/">
        BrickMMO
      </a>{" "}
      | {new Date().getFullYear()} | All rights reserved
      <p>LEGO, the LEGO logo and the Minifigure are trademarks of the LEGO Group.</p>
    </footer>
  );
};

export default Footer;
