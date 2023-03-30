import Head from "next/head";

type MetaProps = {
  title?: string;
  description?: string;
};

const Meta = (props: MetaProps) => {
  const { title, description } = props;
  return (
    <Head>
      <title>{title || "Homepage"}</title>
      <meta
        name="description"
        content={description || "homepage description"}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
