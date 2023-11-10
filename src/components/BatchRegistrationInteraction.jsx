import React, { useEffect, useState } from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import DisplayBatchData from './DisplayBatchData'
import { Input } from "../../components/ui/input"
import ContractABI from '../services/batchRegistration.json'
import { toast } from 'sonner'
import useContractStore from '../store/useContractStore'
import useProductStore from '../store/useProductStore'
import { Label } from "../../components/ui/label"
import { CrossCircledIcon, CheckCircledIcon } from '@radix-ui/react-icons'
const BatchRegistrationInteraction = () => {
  const invalidAddress = '0x0000000000000000000000000000000000000000'
  const { batchAddresses } = useProductStore()
  const { web3, account, contract } = useContractStore()
  const [productCode, setProductCode] = useState(null)
  const [batchCode, setBatchCode] = useState(null)
  const [batchCount, setBatchCount] = useState(null)
  const [rawMaterialsUsed, setRawMaterialsUsed] = useState(null)
  const [batchAddress, setBatchAddress] = useState(null)
  const [totalBatches, setTotalBatches] = useState(null)
  const [batchContract, setBatchContract] = useState(null)
  const [txHash, setTxHash] = useState(null)




  const findProductsByCode = async () => {
    try {
      const targetAddress = await contract.methods.getBACAddressForProduct(productCode).call()
      console.log(targetAddress, invalidAddress)
      setBatchAddress(targetAddress)
      if (targetAddress !== invalidAddress) {
        toast(`Product Found with address ${targetAddress}`, {
          className: 'font-mono text-lg h-[4rem]',
          duration: 3000,
          icon: <CheckCircledIcon />
        })
      }
      else if (targetAddress === invalidAddress) {
        toast(`Product Not Found, please input a valid code`, {
          className: 'font-mono text-lg h-[4rem]',
          duration: 2000,
          icon: <CrossCircledIcon />
        })
      }
    }
    catch (error) {
      console.error('Error fetching product data array:', error);
      return [];
    }
    console.log('clicked ' + productCode, batchAddress)
  }


  const addBatch = async () => {
   const batchABI = ContractABI
   console.log(Array.isArray(batchABI),batchABI)
    const _batchContract = await  new web3.eth.Contract(batchABI,batchAddress)
    console.log(batchCode,batchCount,rawMaterialsUsed,batchAddresses)
      const data = await _batchContract.methods.addBatch(batchCode,batchCount,rawMaterialsUsed).encodeABI()
      const params = [{
        from:account[0],
        to:batchAddress,
        data:data
      }]
      let result = await window.ethereum.request({ method: 'eth_sendTransaction', params })
      .then((hash) => {
        console.log('Transaction Completed: ' + hash)
        setTxHash(hash)
      }).catch(error => {
        console.log(error)
      })

      const transactionReceipt = await web3.eth.getTransactionReceipt(txHash)
      const status = parseInt(transactionReceipt.status)
      if (status > 0) {
        // setStatus(status)
        toast(' Batch Added Successfully', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 2000,
          icon: <CheckCircledIcon />
        })
      }
      else {
        toast('Batch Registration Failed', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 2000,
          icon: <CheckCircledIcon />
        })
      }
      setBatchCode('')
      setBatchCount('')
      setRawMaterialsUsed('')
  }

  const retrieveAllBatches = async () => {
    for (const address of batchAddresses) {
      const batchContract = new web3.eth.Contract(address, batchContractABI)

    }
  }

  let found = false


  return (
    <Card>
      <CardHeader>
        <CardTitle className='font-spaceGrotesk text-lg'>Batch Registration</CardTitle>
        <CardDescription className='font-spaceGrotesk text-md'>
          Input the batch code of your products
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2 font-jakarta">
        <div className="space-y-1 mb-[2rem] flex  h-[8rem] items-start justify-center w-full flex-col gap-2">
          <h2 className='text-xl'> Search for a product</h2>
          <Label htmlFor="product-code">Product Code</Label>
          <Input id="product-code" value={productCode} onChange={(e) => { setProductCode(e.target.value) }} placeholder='ec2356' />
          <Button className='text-md w-[6rem] h-[2.5rem]' onClick={findProductsByCode}> Search </Button>
        </div>

        <div className="space-y-1">
          <Label htmlFor="batch-code">Batch Code</Label>
          <Input id="name" placeholder='234ec1'  value={batchCode} onChange={(e) => { setBatchCode(e.target.value) }}  />
        </div>
        <div className="space-y-1">
          <Label htmlFor="batch-count">Batch Count</Label>
          <Input id="batch-count" placeholder='100'  value={batchCount} onChange={(e) => { setBatchCount(e.target.value) }}  />
        </div>
        <div className="space-y-1">
          <Label htmlFor="raw-materials" >Raw Materials Used</Label>
          <Input id="raw-materials" placeholder='121213' value={rawMaterialsUsed} onChange={(e) => { setRawMaterialsUsed(e.target.value) }} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={addBatch} className='font-jakarta'>Add Batch</Button>
      </CardFooter>

      <CardContent>
        <DisplayBatchData />
      </CardContent>


      <CardContent className="space-y-1  flex flex-col items-center  justify-center  gap-4 font-jakarta">

        {found ? <div className='flex flex-col items-start justify-center w-full gap-4'>
          <div>
            <p> Product Name: </p>
          </div>
          <div>
            <p> Materials </p>
          </div>

          <div>
            <p> Product Owner </p>
          </div>

          <div>
            <p> BAC Address </p>
          </div>

          <div>
            <p> Registration Date </p>
          </div>
        </div> : <div></div>}




      </CardContent>

    </Card>
  )
}

export default BatchRegistrationInteraction
