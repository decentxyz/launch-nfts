import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useChainData } from '../lib/nftData/useChainData';

const Home: NextPage = (props: any) => {
  const { chainData } = useChainData();

  return <>
    <Head>
      <title>{""}</title>
      <meta
        name="description"
        content={""}
      />
      <link rel="icon" href={""} />
      <meta property='og:type' content="website" />
      <meta property='og:url' content={"https://featured.decent.xyz/"} />
      <meta property='og:image' content={""} />
      <meta property='og:title' content={""} />
      <meta property='og:description' content={""} />
      <meta name='twitter:card' content={"summary_large_image"} />
      <meta name='twitter:url' content={"https://featured.decent.xyz/"} />
      <meta name='twitter:title' content={""} />
      <meta name='twitter:description' content={""} />
      <meta name='twitter:image' content={""} />
    </Head>

    <main className={`${styles.main}`}>
      yo
      <div>
        {JSON.stringify(chainData)}
      </div>
    </main>
  </>
};

export default Home;