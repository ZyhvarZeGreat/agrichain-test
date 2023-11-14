
/**
 * The function `ProductRegistrationInteraction` is a React component that handles the registration of
 * products and materials, connects to a wallet using Metamask, fetches product data from a smart
 * contract, and displays the registered product data.
 * @returns The component `ProductRegistrationInteraction` is being returned.
 */
import React, { useEffect, useState } from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Web3 } from 'web3'
import contractABI from '../services/contractABI.json'
import DisplayProductData from './DisplayProductData'

import { Label } from "../../components/ui/label"
import useProductStore from '../store/useProductStore'
import useContractStore from '../store/useContractStore'
import { toast } from 'sonner'
import { ArrowUpIcon, CheckCircledIcon } from '@radix-ui/react-icons'
// import fetchProducts from '../services/fetchProducts'
const ProductRegistrationInteraction = () => {
  const { productName, productCode, products, batchAddresses, setBatchAddresses, setProducts, rawMaterials, materialName, materialCode, setProductCode, setProductName, setRawMaterials, setMaterialName, setMaterialCode } = useProductStore()
  const { account, web3, contract, setContract, setAccount, setWeb3 } = useContractStore()
  const [status, setStatus] = useState(null)
  const [txHash, setTxHash] = useState(null)
  const contractAddress = '0x0cFA9DF188fbdf683a9D87498Ab63F2041DaaDFe'; // Replace with your contract address'
  const alchemyUrl = 'https://polygon-mumbai.g.alchemy.com/v2/bE6pdrk27bZW93aL3QUr9v_93SCiINit'
  const contractAbi = contractABI

  const connectWallet = async () => {


    if (!window.ethereum) {
      toast('Please install Metamask to use this feature', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 2000,
        icon: <CheckCircledIcon />
      })
    }
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: "0x13881" }],
      })
    } catch (e) {
      console.log(e)
    }

    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{ eth_accounts: {} }],
      })
      const accounts = await web3.eth.getAccounts()

      if (accounts.length > 0) {
        console.log('Connected to Metamask')
        toast('Connected to Metamask', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 2000,
          icon: <CheckCircledIcon />
        })
        web3.setProvider(alchemyUrl)
        setAccount(accounts)
        setWeb3(web3)
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        setContract(contract)
        web3.eth.defaultAccount = accounts[1]
      }
      else {
        console.log('Metamask is  not connected')
        toast('Please Connect to Metamask', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 2000,
          icon: <CheckCircledIcon />
        })
      }
    }
    else {
      console.log('Metamask is not installed')
      toast('Please install Metamask', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 2000,
        icon: <CheckCircledIcon />
      })
    }
  }



  async function fetchProducts() {
    try {
      const productDataArray = await contract.methods.getAllProductData().call();
      setProducts(productDataArray)
      console.log(productDataArray)
      const totalBatchAddresses = productDataArray.map((product) => {
        return product.bacAddress
      })
      setBatchAddresses(totalBatchAddresses)

    } catch (error) {
      console.error('Error fetching product data array:', error);
      return [];
    }

  }


  // useEffect(() => {
  //   connectWallet()
  // }, [])




  useEffect(() => {
    if (contract) {
      fetchProducts()
    }
  }, [account,txHash])



  const handleRegisterProduct = async () => {
    if (contract === null) {
      toast('Please Connect Your Wallet 👆👆', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 2000,
        icon: <CheckCircledIcon />
      })
    }
    //ENSURE TO USE THE ENCODE ABI METHOD AFTER TRYING TO INITIALIZE THE CONTRACT
    const data = await contract.methods.register(productCode, productName, rawMaterials).encodeABI()
    
    const params = [{
      from: account[0],
      to: contractAddress,
      data: data
    }]
    let result = await window.ethereum.request({ method: 'eth_sendTransaction', params })
      .then((hash) => {
        console.log('Transaction Completed: ' + hash)
        setTxHash(hash)
      }).catch((error )=> {
        console.log(error.message)
      })
      
      console.log(result)
    const transactionReceipt = await web3.eth.getTransactionReceipt(txHash)
    const status = parseInt(transactionReceipt.status)
  
    if (status > 0) {
      setStatus(status)
      toast('Product Registered Successfully', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 2000,
        icon: <CheckCircledIcon />
      })
    }
    else {
      toast('Product Registration Failed', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 2000,
        icon: <CheckCircledIcon />
      })
    }
    setProductCode('')
    setProductName('')
    setRawMaterials('')
  }



  return (
    <Card>
      <CardHeader className='flex flex-row  justify-between'>
        <div className='flex flex-col'>
          <CardTitle className='font-spaceGrotesk text-3xl'>Platform Information</CardTitle>
          <CardDescription className='font-spaceGrotesk'>
            {!account ? <p> please connect an account</p> : <p> Connected Account: {account} </p>}
          </CardDescription>
        </div>
        <div className='font-jakarta '>
          <Button className='' onClick={connectWallet}>Connect Wallet</Button>
        </div>


      </CardHeader>

      <CardHeader>
        <CardTitle className='font-spaceGrotesk text-lg '>
          Register Your Products and Materials
        </CardTitle>

      </CardHeader>



      <div className='flex w-full justify-center  gap-2'>
        <CardContent className="space-y-2 w-full font-light">
          <div className="space-y-1 font-jakarta">
            <Label htmlFor="product-code ">Product Code</Label>
            <Input value={productCode} onChange={(e) => { setProductCode(e.target.value) }} id="product-code" placeholder="product code (13 bit)" />
          </div>
          <div className="space-y-1 font-jakarta  font-light">
            <Label htmlFor="product-name">Product Name</Label>
            <Input value={productName} onChange={(e) => { setProductName(e.target.value) }} id="product-name" placeholder="product name ( 3 chars at least)" />
          </div>

          <div className="space-y-1 font-jakarta font-light">
            <Label htmlFor="raw-materials">Raw Materials</Label>
            <Input value={rawMaterials} onChange={(e) => { setRawMaterials(e.target.value) }} id="raw-materials" placeholder="Barley" />
          </div>
        </CardContent>
        <CardContent className="space-y-2 font-light w-full">
          <div className="space-y-1 font-jakarta">
            <Label htmlFor="material-code ">Material Code</Label>
            <Input value={materialCode} onChange={(e) => { useProductRegistrationStore.setState(e.target.value) }} id="material-code" placeholder="EC12345" />
          </div>
          <div className="space-y-1 font-jakarta  font-light">
            <Label htmlFor="material-name">Material Name</Label>
            <Input value={materialName} onChange={(e) => { useProductRegistrationStore.setState(e.target.value) }} id="material-name" placeholder="Grains" />
          </div>

          <div className=' h-[3rem] flex items-center justify-start   font-jakarta'>
            <Button onClick={fetchProducts}>
              Register Materials
            </Button>
          </div>
        </CardContent>
      </div>

      <CardFooter>
        <Button className='font-jakarta' onClick={handleRegisterProduct} >Register Product</Button>
      </CardFooter>

      <CardContent className="space-y-2 w-full font-light">
        <DisplayProductData />
      </CardContent>

    </Card>
  )
}

export default ProductRegistrationInteraction
