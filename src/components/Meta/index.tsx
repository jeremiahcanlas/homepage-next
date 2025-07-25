import Head from "next/head";

import { MetaProps } from "../../types";

const Meta = (props: MetaProps) => {
  const { title, description } = props;
  return (
    <Head>
      <title>{title || "Homie"}</title>
      <meta name="description" content={description || "homie"} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <link
        rel="icon"
        type="image/png"
        href="/favicon-96x96.png"
        sizes="96x96"
      /> */}
      {/* <link rel="icon" type="image/svg+xml" href="/favicon.svg" /> */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      {/* <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      /> */}
      {/* <link rel="manifest" href="/site.webmanifest" /> */}
    </Head>
  );
};

export default Meta;
