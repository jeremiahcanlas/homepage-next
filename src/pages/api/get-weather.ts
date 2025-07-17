import type { NextApiRequest, NextApiResponse } from "next";

type ErrorResponse = {
  error: string;
};

type ResponseProps = {
  temperature: number;
  unit: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps | ErrorResponse>
) {
  const { lat, lon, unit } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat/lon" });
  }

  const latStr = Array.isArray(lat) ? lat[0] : lat;
  const lonStr = Array.isArray(lon) ? lon[0] : lon;

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latStr}&longitude=${lonStr}&temperature_unit=${
        unit !== "c" ? "fahrenheit" : "celsius"
      }&current_weather=true`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    const { current_weather, current_weather_units } = data;

    const filteredData = {
      temperature: Math.round(current_weather.temperature), //manually round temperature unit
      unit: current_weather_units.temperature,
    };

    return res.status(200).json(filteredData);
  } catch (err) {
    return res.status(500).json({ error: `Failed to fetch weather (${err})` });
  }
}
