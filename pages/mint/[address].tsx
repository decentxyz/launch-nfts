import { NextPage } from 'next';
import { fetchNftData } from '../../lib/nftData/fetchNftData';
import MintNavbar from '../../components/Navbar/MintNavbar';

const Mint: NextPage = (props: any) => {
  const { address, contractData } = props;

  return (
    <>
    <MintNavbar address={address} />
    {address}
    {JSON.stringify(contractData)}
    </>
  )
}

export default Mint;

export async function getServerSideProps(context: any) {
  const { address } = context.query

  let nftData: any;

  if (address) {
    nftData = await fetchNftData([address])
  }

  return {
    props: {
      address,
      contractData: nftData || null
    }
  }
};