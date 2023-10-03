import Head from "next/head";

const Metadata = () => {

  return <>
    <Head>
      <title>{"Based NFTs"}</title>
      <meta
        name="description"
        content={"Purchase NFTs on Base without bridging. 🟦"}
      />
      <link rel="icon" href={"/images/icon.png"} />
      <meta property='og:type' content="website" />
      <meta property='og:url' content={"https://basednfts.co/"} />
      {/* <meta property='og:image' content={''} /> */}
      <meta property='og:title' content={"Based NFTs"} />
      <meta property='og:description' content={"Purchase NFTs on Base without bridging."} />
      <meta name='twitter:card' content={"summary_large_image"} />
      <meta name='twitter:url' content={"https://basednfts.co/"} />
      <meta name='twitter:title' content={"Based NFTs"} />
      <meta name='twitter:description' content={"Purchase NFTs on Base without bridging. 🟦"} />
      {/* <meta name='twitter:image' content={''} /> */}
    </Head>
  </>
};

export default Metadata;