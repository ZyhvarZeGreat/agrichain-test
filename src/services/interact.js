const alchemyKey = "wss://polygon-mumbai.g.alchemy.com/v2/bE6pdrk27bZW93aL3QUr9v_93SCiINit"
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.API_KEY); 
const contractABI = require('../contractABI.json')
const contractAddress = '0x825e7C1f202dE2bb0d797fE104E7E05F9CB9eaa9';

export const contract = new web3.eth.Contract(
  contractABI,
  contractAddress
);


export const loadCurrentMessage = async () => {

};

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          const obj = {
            status: "👆🏽 Write a message in the text-field above.",
            address: addressArray[0],
          };
          return obj;
        } catch (err) {
          return {
            address: "",
            status: "😥 " + err.message,
          };
        }
      } else {
        console.error("Metamask not installed")
    }
};

const getCurrentWalletConnected = async () => { 

};


export const updateMessage = async (message) => {

};