import Head from "next/head";

import { MetaProps } from "../../types";

const Meta = (props: MetaProps) => {
  const { title, description } = props;
  return (
    <Head>
      <title>{title || "Homie"}</title>
      <meta name="description" content={description || "homie"} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
    </Head>
  );
};

export default Meta;
