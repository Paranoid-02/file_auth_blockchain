import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Modal from "./components/Modal"; 
import VModal from "./components/VModal"; 
import Display from "./components/Display";

const App = () => {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [vmodalOpen, setVModalOpen] = useState(false);
  
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", (chainId) => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", (accounts) => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

        const contract = new ethers.Contract(
          contractAddress,
          Certificate.abi,
          signer
        );
        // console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Please install Metamask");
      }
    };

    provider && loadProvider();
  }, []);

  return (
    <div className="text-center mx-auto">
      {/* {!modalOpen && (
        <button  onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}{" "}
      {modalOpen && (<Modal setModalOpen={setModalOpen} contract={contract} />)} */}

      {!vmodalOpen && (
        <button  onClick={() => setVModalOpen(true)}>
          Verify
        </button>
      )}{" "}
      {vmodalOpen && (<VModal setVModalOpen={setVModalOpen} contract={contract} />)}

      <div className="App flex flex-col items-center  mx-auto py-7">

        <h1 style={{color: "white"}} className="">Certificate Verification System</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <p style={{ color: "white" }}>
          <span className="font-bold">Account : </span>{account ? account : "Please connect your account"}
        </p>
        <FileUpload contract={contract} account={account} provider={provider} />
        <Display contract={contract} account={account} />
      </div>
    </div>
  );
};

export default App;
