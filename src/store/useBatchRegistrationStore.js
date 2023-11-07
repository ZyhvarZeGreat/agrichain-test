import {create} from 'zustand'


const useBatchRegistrationStore = create((set)=>({
productName:'',
materials:'',
BACAddress:'',
RegistryDate:'',
batchData: (value) => set [{batchData: value}]
}))

export default useBatchRegistrationStore