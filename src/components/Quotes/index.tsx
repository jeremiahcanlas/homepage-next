import { useEffect, useState } from "react";

type QuoteProps = {
  error?: string;
  author: string;
  text: string;
};

const Quote = () => {
  const [quote, setQuote] = useState<QuoteProps | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const res = await fetch(`/api/get-quotes`);
        const data = await res.json();
        setQuote(data);
      } catch (error) {
        console.log("Quote API Error:", error);
        setQuote(null);
      }
    };

    fetchQuote();
  }, []);

  if (
    !quote ||
    quote.error ||
    localStorage.getItem("disableQuotes") === "true"
  ) {
    return null;
  }

  const showAuthor = quote.author !== "";

  return (
    <div className=" md:mt-auto border rounded-sm p-4 w-full md:w-[40%] shadow-md">
      <p className="font-light">{quote?.text}</p>
      <p className="mt-2">{showAuthor ? "- " + quote.author : "- Unknown"}</p>
    </div>
  );
};

export default Quote;
