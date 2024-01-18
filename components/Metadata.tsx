import Head from "next/head";

const Metadata = () => {

  return <>
    <Head>
      <title>{"Launch Decent"}</title>
      <meta
        name="description"
        content={"Mint NFTs from featured Decent partners. ⬛"}
      />
      <link rel="icon" href={"/images/decent-icon.png"} />
      <meta property='og:type' content="website" />
      <meta property='og:url' content={"https://launch.decent.xyz/"} />
      {/* <meta property='og:image' content={''} /> */}
      <meta property='og:title' content={"Decent Launch"} />
      <meta property='og:description' content={"Mint NFTs from featured Decent partners."} />
      <meta name='twitter:card' content={"summary_large_image"} />
      <meta name='twitter:url' content={"https://launch.decent.xyz"} />
      <meta name='twitter:title' content={"Launch Decent"} />
      <meta name='twitter:description' content={"Mint NFTs from featured Decent partners. ⬛"} />
      {/* <meta name='twitter:image' content={''} /> */}
    </Head>
  </>
};

export default Metadata;