import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useChainData } from '../lib/nftData/useChainData';
import { useNftData } from '../lib/nftData/useNftData';
import Navbar from '../components/Navbar/Navbar';

const Home: NextPage = (props: any) => {
  const today = new Date().toLocaleDateString();
  const { chainData } = useChainData(today);
  const { nftData } = useNftData(['0xC85f505B43FcbFFBF7808A55bC4E8ceCAC18D85B', '0xECDE63c35a69F378b4fa83b5D5506F64e3DaBbbC']);

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
    <Navbar oneDay={chainData?.targetDateStats["1day"]} sevenDay={chainData?.targetDateStats["7day"]} />

    <main className={`${styles.main}`}>
      yo
      <div>
        {JSON.stringify(chainData?.targetDateStats["1day"])}
      </div>
      {JSON.stringify(nftData)}
    </main>
  </>
};

export default Home;