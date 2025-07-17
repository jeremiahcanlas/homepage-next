import type { NextApiRequest, NextApiResponse } from "next";

type ResponseProps = {
  city: string;
  stateProvince: string;
  country: string;
};

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps | ErrorResponse>
) {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat/lon" });
  }

  const latStr = Array.isArray(lat) ? lat[0] : lat;
  const lonStr = Array.isArray(lon) ? lon[0] : lon;

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latStr}&lon=${lonStr}&zoom=10&format=json`,

      {
        headers: {
          "User-Agent":
            "personal-homepage/0.1.0 (contact: jjmcanlas@gmail.com)",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    const filteredData = {
      city: data.name,
      // Will only send state if city is a different value
country: data.address.country, 
      stateProvince:
        data.address.state !== data.name ? data.address.state : null,
    };

    return res.status(200).json(filteredData);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch location" });
  }
}
