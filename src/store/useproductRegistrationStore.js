import { create } from 'zustand'


 export const useProductRegistrationStore = create((set) => ({
    productCode: '',
    productName: '',
    rawMaterials: '',
    bacAddr: '',
    interactionStatus: '',
    setProductCode: (value) => set[{ productCode: value }],
    setProductName: (value) => set[{productName:value}],
    setRawMaterials:(value) => set[{ rawMaterials:value }],
    setBacAddr: (value) => set[{bacAddr:value}],
    setInteractionStatus: (value) => set[{ interactionStatus:value}]
}))


