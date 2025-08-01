import DuckDuckGoIcon from "@component/vectors";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "next/form";
import { useEffect, useState } from "react";

const Menu = () => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [loading, setLoading] = useState(false);

  const [temperatureUnit, setTemperatureUnit] = useState(
    localStorage.getItem("temperatureUnit") || "c"
  );
  const [clockFormat, setClockFormat] = useState(
    localStorage.getItem("clockFormat") || "12"
  );

  const [defaultSearch, setDefaultSearch] = useState(
    localStorage.getItem("defaultSearch") || "g"
  );
  const [disableQuotes, setDisableQuotes] = useState<boolean>(() => {
    const stored = localStorage.getItem("disableQuotes");
    return stored !== null ? JSON.parse(stored) : false;
  });

  const [darkToggled, setDarkToggled] = useState<boolean>(() => {
    const stored = localStorage.getItem("dark-toggled");
    return stored !== null ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    const shouldUseDark = darkToggled;

    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, [darkToggled]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (username.trim()) {
      localStorage.setItem("username", username.trim());

      // Always store advanced settings, even if UI wasn't expanded
      localStorage.setItem("temperatureUnit", temperatureUnit);
      localStorage.setItem("clockFormat", clockFormat);
      localStorage.setItem("defaultSearch", defaultSearch);
      localStorage.setItem("disableQuotes", JSON.stringify(disableQuotes));

      localStorage.setItem("dark-toggled", JSON.stringify(darkToggled));

      window.location.reload();
    }
  };

  return (
    <div className="flex justify-center align-middle h-screen ">
      <div className="my-auto border-1 rounded-md shadow-md p-6 w-100">
        <Form action="/" onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <h1 className="capitalize">
              {!username ? "Enter display name:" : `Hello, ${username} 👋`}
            </h1>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full border px-3 py-2 rounded-md shadow-sm"
              required
            />
          </label>

          <div className="space-y-4 border rounded p-4 bg-gray-50 dark:bg-background-dark-secondary">
            {/* Temperature Unit */}
            <div>
              <span className="block mb-1">Temperature Unit:</span>
              <label className="mr-4">
                <input
                  type="radio"
                  value="c"
                  checked={temperatureUnit === "c"}
                  onChange={() => setTemperatureUnit("c")}
                  className="mr-1"
                />
                Celsius (°C)
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  value="f"
                  checked={temperatureUnit === "f"}
                  onChange={() => setTemperatureUnit("f")}
                  className="mr-1"
                />
                Fahrenheit (°F)
              </label>
              {/* <label>
                <input
                  type="radio"
                  value="n"
                  checked={temperatureUnit === "n"}
                  onChange={() => setTemperatureUnit("n")}
                  className="mr-1"
                />
                hide
              </label> */}
            </div>

            {/* Clock Format */}
            <div>
              <span className="block mb-1">Clock Format:</span>
              <label className="mr-4">
                <input
                  type="radio"
                  value="12"
                  checked={clockFormat === "12"}
                  onChange={() => setClockFormat("12")}
                  className="mr-1"
                />
                12-Hour
              </label>
              <label className="mr-4">
                <input
                  type="radio"
                  value="24"
                  checked={clockFormat === "24"}
                  onChange={() => setClockFormat("24")}
                  className="mr-1"
                />
                24-Hour
              </label>
              {/* <label>
                <input
                  type="radio"
                  value="n"
                  checked={clockFormat === "n"}
                  onChange={() => setClockFormat("n")}
                  className="mr-1"
                />
                hide
              </label> */}
            </div>

            <div>
              <span className="block mb-1">Default Search:</span>
              <label className="mr-4">
                <input
                  type="radio"
                  value="g"
                  checked={defaultSearch === "g"}
                  onChange={() => setDefaultSearch("g")}
                  className="mr-1"
                />

                <FontAwesomeIcon icon={faGoogle} />
              </label>
              <label className="align-middle mr-4">
                <input
                  type="radio"
                  value="d"
                  checked={defaultSearch === "d"}
                  onChange={() => setDefaultSearch("d")}
                  className="mr-1"
                />
                <DuckDuckGoIcon className="inline-block" />
              </label>
              <label>
                <input
                  type="radio"
                  value="n"
                  checked={defaultSearch === "n"}
                  onChange={() => setDefaultSearch("n")}
                  className="mr-1"
                />
                hide
              </label>
            </div>

            {/* Disable Quotes */}
            <div>
              <label className="flex items-center align-middle gap-3">
                <input
                  type="checkbox"
                  name="quotesToggle"
                  checked={disableQuotes}
                  onChange={() => setDisableQuotes(!disableQuotes)}
                  className="sr-only peer"
                />

                <div className="w-9 h-4 bg-gray-300 duration-400 peer-checked:bg-black rounded-full relative transition-colors">
                  <div
                    className={`absolute left-1 top-1 w-2 h-2 bg-white rounded-[100%] duration-400 transition-transform  ${
                      disableQuotes ? "translate-x-5" : ""
                    }`}
                  />
                </div>

                <span>hide daily quotes</span>
              </label>
            </div>

            <div>
              <label className="flex items-center align-middle gap-3">
                <input
                  type="checkbox"
                  name="featureToggle"
                  checked={darkToggled}
                  onChange={() => setDarkToggled(!darkToggled)}
                  className="sr-only peer"
                />

                <div className="w-9 h-4 bg-gray-300 duration-400 peer-checked:bg-black rounded-full relative transition-colors">
                  <div
                    className={`absolute left-1 top-1 w-2 h-2 bg-white rounded-[100%] duration-400 transition-transform  ${
                      darkToggled ? "translate-x-5" : ""
                    }`}
                  />
                </div>

                <span>dark mode</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? (
              <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
            ) : (
              "Save User Settings"
            )}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Menu;
