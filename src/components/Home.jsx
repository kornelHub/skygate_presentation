import { ethers } from "ethers";
import WalletBalance from "./WalletBalance";
import ContractButtons from "./ContractButtons";

function Home() {
    return (
        <div>
            <WalletBalance />
            <ContractButtons />
        </div>
    );
}
export default Home;