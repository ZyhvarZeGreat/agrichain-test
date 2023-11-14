import React, { useState } from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import DisplayTransactionData from './DisplayTransactionData'
import { toast } from 'sonner'
import ContractABI from '../services/batchRegistration.json'
import { CrossCircledIcon, CheckCircledIcon } from '@radix-ui/react-icons'
import useContractStore from '../store/useContractStore'
import useProductStore from '../store/useProductStore'
import { Label } from "../../components/ui/label"
const TransactionRegistrationInteraction = () => {
  const { web3, account } = useContractStore()
  const { batches } = useProductStore()
  const [targetAddress, setTargetAddress] = useState(null)
  const [batchCode, setBatchCode] = useState(null)
  const invalidAddress = '0x0000000000000000000000000000000000000000'
  let found = false
  const findBatchesByCode = async () => {
    console.log(batches)
    const contractObj = batches.find((batch) => { return batch.batchCode.toString() === batchCode })
  

    try {
      const targetAddress = contractObj.batchManager
      const contract = await new web3.eth.Contract(ContractABI, targetAddress)
      const TUCAddress = await contract.methods.getTUCAddressForBatch(batchCode).call()
      console.log(targetAddress, TUCAddress, invalidAddress)
      if (contractObj !== null || contractObj !== undefined) {
        toast(`Batch Found with address ${targetAddress}`, {
          className: 'font-mono text-lg h-[4rem]',
          duration: 3000,
          icon: <CheckCircledIcon />
        })
        setTargetAddress(TUCAddress)
        toast(`TUC Address Found with address ${TUCAddress}`, {
          className: 'font-mono text-lg h-[4rem]',
          duration: 3000,
          icon: <CheckCircledIcon />
        })
      }
    }
    catch (error) {
      if (error instanceof TypeError && error.message.includes('undefined')) {
        toast('Batch Not Found, please input a valid code', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 3000,
          icon: <CheckCircledIcon />
        })
        console.error('Error: contractObj is undefined. Please make sure it is properly initialized.');
      } else {
        // Handle other types of errors or rethrow if you don't want to handle them here
        throw error;
      }
    }
  }

  const updateTransaction = async () => {

  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className='font-spaceGrotesk text-2xl'>
          Update Transaction
        </CardTitle>
        <CardDescription className='font-spaceGrotesk'>
          Make changes to your account here. Click save when you're done.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 font-jakarta">
        <div className="space-y-1">
          <Label htmlFor="batch-number">Batch Code</Label>
          <Input id="username" placeholder='672132...' value={batchCode} onChange={(e) => { setBatchCode(e.target.value) }} />
        </div>

        {/* {found ? <div>
          <p> TUC Address </p>
        </div> : <div></div>} */}
      </CardContent>
      <CardFooter>
        <Button className='font-jakarta' onClick={findBatchesByCode}>Search TX</Button>
      </CardFooter>

      <CardContent className='font-jakarta text-lg'>
        <CardDescription className='h-[4rem] text-xl'>
          <h3> Update Transactions </h3>
        </CardDescription>
        <div className="space-y-1">
          <Label htmlFor="prev-tx text-lg">Prev TX Hash</Label>
          <Input id="name" placeholder='Input the tx hash of the product ' />
        </div>
        <div className="space-y-1">
          <Label htmlFor="receiver">Receiver</Label>
          <Input id="Receiver" placeholder='input the contract address of the reciever' />
        </div>
        <Button className='mt-6'>
          Update Transaction
        </Button>
      </CardContent>

      <CardContent>
        <DisplayTransactionData />
      </CardContent>


    </Card>
  )
}

export default TransactionRegistrationInteraction
