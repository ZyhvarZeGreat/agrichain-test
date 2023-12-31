import {create} from 'zustand';

const useContractStore = create((set) => ({
  web3:null,
  account: null, // Ethereum account
  contract: null, // Contract instance
  bacContract: null, //
  setWeb3:(web3)=>set({web3}), 
  setAccount: (account) => set({ account }),
  setContract: (contract) => set({ contract }),
  setBACContract: (bacContract) => set({ bacContract }),
}));

export default useContractStore;