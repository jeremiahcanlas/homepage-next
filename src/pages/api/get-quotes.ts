import type { NextApiRequest, NextApiResponse } from "next";

type ErrorResponse = {
  error: string;
};

type ResponseProps = {
  text: string;
  author: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseProps | ErrorResponse>
) {
  try {
    const response = await fetch(
      `http://api.forismatic.com/api/1.0/?format=json&method=getQuote&lang=en`
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    const filteredData = {
      author: data.quoteAuthor,
      text: data.quoteText,
    };

    return res.status(200).json(filteredData);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch quotes" });
  }
}
