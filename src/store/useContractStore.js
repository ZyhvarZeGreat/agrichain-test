import {create} from 'zustand';

const useContractStore = create((set) => ({
  account: null, // Ethereum account
  contract: null, // Contract instance
  setAccount: (account) => set({ account }),
  setContract: (contract) => set({ contract }),
}));

export default useContractStore;