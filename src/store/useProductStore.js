import { create } from 'zustand';

const useProductStore = create((set) => ({
  productCode: '',
  productName: '',
  rawMaterials: '',
  materialName: '',
  materialCode: '',
  products: [],
  batchAddresses: [],
  setProductCode: (value) => set({ productCode: value }),
  setProductName: (value) => set({ productName: value }),
  setRawMaterials: (value) => set({ rawMaterials: value }),
  setMaterialName: (value) => set({ materialName: value }),
  setMaterialCode: (value) => set({ materialCode: value }),
  setProducts: (value) => set({ products: value }),
  setBatchAddresses: (value) => set({ batchAddresses: value }),
}));
export default useProductStore;