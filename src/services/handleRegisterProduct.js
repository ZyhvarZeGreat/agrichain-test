import useProductStore from '../store/useProductStore'
import {web3} from 'web3'
import { toast } from 'sonner'
import { ArrowUpIcon, CheckCircledIcon } from '@radix-ui/react-icons'
import useContractStore from '../store/useContractStore'

const {contract} = useContractStore()
console.log(contract)

const { productName, productCode, rawMaterials, materialName, materialCode, setProductCode, setProductName, setRawMaterials, setMaterialName, setMaterialCode } = useProductStore()
const handleRegisterProduct = async () => {
  const accounts = await web3.eth.getAccounts()
  if (!contract) {
    toast('Please Connect your Wallet 👆', {
      className: 'font-mono text-lg h-[4rem]',
      duration: 1200,
      icon: <ArrowUpIcon />
    })
  }

  try {// Replace with your signing method

    // Call the register method on the contract
    const tx = await contract.methods.register(productCode, productName, rawMaterials, {
      from: accounts[0],
    })

    const toastMessage = 'Product registered successfully'
    toast(toastMessage, {
      className: 'font-mono text-lg h-[4rem]',
      duration: 2000,
      icon: <CheckCircledIcon />
    })

    console.log('Product registered successfully');
  } catch (error) {
    console.error('Error:', error);
    const toastMessage = 'Product registration failed: ' + error.message
    toast(toastMessage, {
      className: 'font-mono text-lg h-[4rem]',
      duration: 4000,
      icon: <CheckCircledIcon />
    })
  }
}


export default handleRegisterProduct
