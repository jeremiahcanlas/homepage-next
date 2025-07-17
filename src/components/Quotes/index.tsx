import { QuoteProps } from "../../types";

const Quote = ({ quote }: { quote: QuoteProps }) => {
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
