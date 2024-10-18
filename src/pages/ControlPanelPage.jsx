import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Motor from "../components/Motor";
import Switch from "../components/Switch";

const PanelPage = () => {
  const { cityId } = useParams();
  const [panelData, setPanelData] = useState(null);
  const [powerLever, setPowerLever] = useState(null);
  const [motorB, setMotorB] = useState(null);
  const [motorC, setMotorC] = useState(null);
  const [motorD, setMotorD] = useState(null);
  const [switchS2, setSwitchS2] = useState(null);
  const [switchS3, setSwitchS3] = useState(null);
  const [switchS4, setSwitchS4] = useState(null);
  const [cartridgeOptions, setCartridgeOptions] = useState([]);
  const [currentCartridge, setCurrentCartridge] = useState(null);
  const [loading, setLoading] = useState(true);

  const colorCodes = {
    BLACK: "#000",
    BLUE: "#2196F3",
    GREEN: "#4CAF50",
    YELLOW: "#ffeb3b",
    RED: "#f44336",
    WHITE: "#fff",
    BROWN: "#795548",
  };

  useEffect(() => {
    const fetchPanelData = async () => {
      try {
        setLoading(true);
        const response = await fetch(import.meta.env.VITE_FETCH_PANEL_API + cityId);
        const data = await response.json();
        if (!data.error) {
          setPanelData(data.panel);
          setPowerLever(data.panel.find((obj) => obj.port_id === "A"));
          setCurrentCartridge(data.panel.find((obj) => obj.port_id === "S1"));

          // Extract cartridge options (unique and non-null values)
          const uniqueCartridges = Array.from(
            new Set(data.panel.map((item) => item.cartridge).filter(Boolean))
          );
          setCartridgeOptions(uniqueCartridges);
        }
      } catch (error) {
        console.error("Error fetching panel data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPanelData();
  }, [cityId]);

  useEffect(() => {
    if (currentCartridge && panelData) {
      // Get motor and switch data based on the current cartridge
      setMotorB(
        panelData.find((item) => item.port_id === "B" && item.cartridge === currentCartridge.value)
      );
      setMotorC(
        panelData.find((item) => item.port_id === "C" && item.cartridge === currentCartridge.value)
      );
      setMotorD(
        panelData.find((item) => item.port_id === "D" && item.cartridge === currentCartridge.value)
      );

      setSwitchS2(
        panelData.find((item) => item.port_id === "S2" && item.cartridge === currentCartridge.value)
      );
      setSwitchS3(
        panelData.find((item) => item.port_id === "S3" && item.cartridge === currentCartridge.value)
      );
      setSwitchS4(
        panelData.find((item) => item.port_id === "S4" && item.cartridge === currentCartridge.value)
      );
    }
  }, [currentCartridge, panelData]);

  const handleCartridgeChange = (selectedCartridge) => {
    const newCartridge = { ...currentCartridge, value: selectedCartridge };
    setCurrentCartridge(newCartridge);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center gap-6 mt-5 pb-10">
        <p className="text-2xl text-center">Loading panel data...</p>
        <div role="status">
          <svg
            aria-hidden="true"
            className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {panelData?.length ? (
        <div>
          <h1 className="text-2xl text-center">Control Panel Status</h1>
          <div className="border-8 border-black bg-gray-200 mt-5 p-8 pb-10 max-w-[1000px] m-auto">
            <div className="flex justify-evenly items-end space-x-8">
              {/* Power Lever */}
              {powerLever && (
                <div className="text-center">
                  <img
                    src={`/images/panel_${powerLever.value.toLowerCase()}.png`}
                    alt="Panel Dial"
                    className="w-24 mx-auto"
                  />
                  <span className="text-black">Power Lever</span>
                </div>
              )}
              {/* Motor B */}
              {motorB && <Motor motor={motorB} label="Motor B" />}

              {/* Motor C */}
              {motorC && <Motor motor={motorC} label="Motor C" />}

              {/* Motor D */}
              {motorD && <Motor motor={motorD} label="Motor D" />}
            </div>
            <div className="flex justify-evenly items-end mt-8 space-x-8">
              {/* Cartridge Dropdown */}
              <div className="text-center">
                <select
                  value={currentCartridge?.value || ""}
                  onChange={(e) => handleCartridgeChange(e.target.value)}
                  className={`border-8 border-black w-full h-16 text-lg bg-[${
                    colorCodes[currentCartridge?.value]
                  }]`}
                >
                  {cartridgeOptions.map((cartridge) => (
                    <option
                      key={cartridge}
                      value={cartridge}
                      className={`bg-[${colorCodes[cartridge]}]`}
                    >
                      {cartridge}
                    </option>
                  ))}
                </select>
                <span className="text-black mt-2">Cartridge</span>
              </div>

              {/* Switch S2 */}
              {switchS2 && <Switch switchData={switchS2} label="Switch S2" />}

              {/* Switch S3 */}
              {switchS3 && <Switch switchData={switchS3} label="Switch S3" />}

              {/* Switch S4 */}
              {switchS4 && <Switch switchData={switchS4} label="Switch S4" />}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-2xl text-center">No Panel data available</p>
      )}
    </div>
  );
};

export default PanelPage;
