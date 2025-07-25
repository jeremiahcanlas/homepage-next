import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

type QuoteProps = {
  error?: string;
  author: string;
  text: string;
};

const Quote = () => {
  const [quote, setQuote] = useState<QuoteProps | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/get-quotes`);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      if (!data || !data.text) throw new Error("Invalid data format");
      setQuote(data);
    } catch (error) {
      console.log("Quote API Error:", error);
      setError("Failed to fetch quote");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (localStorage.getItem("disableQuotes") === "true" || !quote) return null;
  if (error)
    return (
      <div className=" md:mt-auto border rounded-sm p-5 w-full md:w-[40%] shadow-md relative">
        <p className="text-sm text-red-500">
          Oops, something went wrong. Please click the refresh icon to try
          again.
        </p>
        <FontAwesomeIcon
          icon={faRefresh}
          className="absolute right-2 bottom-2 cursor-pointer hover:animate-spin"
          onClick={() => {
            if (!loading) fetchQuote();
          }}
          title="refresh quote"
        />
      </div>
    );

  const showAuthor = quote.author !== "";

  return (
    <div className=" md:mt-auto border rounded-sm p-5 w-full md:w-[40%] shadow-md relative">
      <p className="font-light mr-3">{quote?.text}</p>
      <p className="mt-2">{showAuthor ? "- " + quote.author : "- Unknown"}</p>
      <FontAwesomeIcon
        icon={faRefresh}
        className="absolute right-2 bottom-2 cursor-pointer hover:animate-spin select-none"
        onClick={() => {
          if (!loading) fetchQuote();
        }}
        title="refresh quote"
      />
    </div>
  );
};

export default Quote;
