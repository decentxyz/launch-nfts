import Head from "next/head";

const Metadata = () => {

  return <>
    <Head>
      <title>{"Prohibition"}</title>
      <meta
        name="description"
        content={"Prohibition Daily: fun, affordable mints every day."}
      />
      <link rel="icon" href={"/prohibition-icon.jpg"} />      
      <meta property='og:type' content="website" />
      <meta property='og:url' content={"https://daily.prohibition.art/"} />
      <meta property='og:image' content={'/prohibition-meta.png'} />
      <meta property='og:title' content={"Prohibition Daily"} />
      <meta property='og:description' content={"Prohibition Daily: fun, affordable mints every day."} />
      <meta name='twitter:card' content={"summary_large_image"} />
      <meta name='twitter:url' content={"https://daily.prohibition.art/"} />
      <meta name='twitter:title' content={"Prohibition Daily"} />
      <meta name='twitter:description' content={"Prohibition Daily: fun, affordable mints every day."} />
      <meta name='twitter:image' content={'/prohibition-meta.png'} />
    </Head>
  </>
};

export default Metadata;