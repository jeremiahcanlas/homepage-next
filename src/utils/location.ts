export interface Coords {
  lat: number;
  lon: number;
}

export const getCoords = async (): Promise<Coords | null> => {
  if (!navigator.geolocation) {
    console.error("Geolocation not supported");
    return null;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newCoords: Coords = {
          lat: parseFloat(position.coords.latitude.toFixed(5)),
          lon: parseFloat(position.coords.longitude.toFixed(5)),
        };

        const cachedCoordsRaw = localStorage.getItem("user_coords");
        const cachedCoords: Coords | null = cachedCoordsRaw
          ? JSON.parse(cachedCoordsRaw)
          : null;

        const coordsChanged =
          !cachedCoords ||
          cachedCoords.lat !== newCoords.lat ||
          cachedCoords.lon !== newCoords.lon;

        if (coordsChanged) {
          console.log("Coords changed, updating...");
          localStorage.setItem("user_coords", JSON.stringify(newCoords));
        }

        resolve(newCoords);
      },
      (err) => {
        console.log("Error getting coords:", err);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      }
    );
  });
};
