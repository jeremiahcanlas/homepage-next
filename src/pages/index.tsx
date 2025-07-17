import Mainpage from "@component/components/Mainpage";
import Meta from "@component/components/Meta";
import { GetServerSideProps } from "next";

import { MainProps } from "../types";

export default function Home(props: MainProps) {
  return (
    <div>
      <Meta title={`Homepage`} />
      <Mainpage pageProps={props} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const protocol = ctx.req.headers.host?.includes("localhost")
    ? "http"
    : "https";
  const baseUrl = `${protocol}://${ctx.req.headers.host}`;

  const hours = new Date().getHours();

  let message;

  if (hours >= 18) {
    message = "Good evening";
  } else if (hours >= 12) {
    message = "Good afternoon";
  } else if (hours >= 5) {
    message = "Good morning";
  } else {
    message = "Early morning";
  }

  const fetchQuote = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/get-quotes`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Quote API Error:", error);
      return null;
    }
  };

  const quoteData = await fetchQuote();

  return {
    props: {
      message,
      quote: quoteData,
    },
  };
};
