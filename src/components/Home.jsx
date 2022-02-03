import { ethers } from "ethers";
import WalletBalance from "./WalletBalance";
import ContractButtons from "./ContractButtons";

function Home() {
    return (
        <div style={{marginLeft: '5%'}}>
            <WalletBalance />
            <ContractButtons />
        </div>
    );
}
export default Home;