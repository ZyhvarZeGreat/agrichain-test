import React, { useState, useEffect } from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import DisplayTransactionData from './DisplayTransactionData'
import { toast } from 'sonner'
import ContractABI from '../services/batchRegistration.json'
import transactionABI from '../services/transactionRegistration.json'
import { CrossCircledIcon, CheckCircledIcon } from '@radix-ui/react-icons'
import useContractStore from '../store/useContractStore'
import useProductStore from '../store/useProductStore'
import { Label } from "../../components/ui/label"
const TransactionRegistrationInteraction = () => {
  const { web3, account } = useContractStore()
  const { batches } = useProductStore()
  const [targetAddress, setTargetAddress] = useState(null)
  const [receiver, setReciever] = useState(null)
  const [txHash, setTXHash] = useState(null)
  const [previousTXHash, setPreviousTXHash] = useState(null)
  const [batchCode, setBatchCode] = useState(null)
  const [totalTransactions,setTotalTransactions] = useState(null) 
  const [totalAddresses, setTotalAddresses] = useState(null)
  const invalidAddress = '0x0000000000000000000000000000000000000000'
  let found = false




  const findBatchesByCode = async () => {
    const contractObj = batches.find((batch) => { return batch.batchCode.toString() === batchCode })

    setTotalAddresses(getAllAddresses())
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
    if (!previousTXHash || !receiver) {
      // Handle the case where one of the values is not defined
      console.error("Invalid values for previousTXHash, Reciever ");
      toast('Please fill in all the values', {
        className: 'font-mono text-lg h-[4rem]',
        duration: 2000,
        icon: <CrossCircledIcon />
      })
      return;
    }

    const transactionContract = await new web3.eth.Contract(transactionABI, targetAddress)
    const prevTXHashCheck = previousTXHash.startsWith('0x') ? previousTXHash : Number(previousTXHash)


    const owner = await transactionContract.methods.owner().call()
    const data = await transactionContract.methods.transferCustody(receiver, prevTXHashCheck).encodeABI()
    console.log(owner)
    const params = [{
      from: account[0],
      to: targetAddress,
      data: data
    }]

    console.log(owner, data)

    const result = await window.ethereum.request({ method: 'eth_sendTransaction', params })
      .then((hash) => {
        console.log('Transaction Hash: ' + hash)
        setTXHash(hash)
      }).catch(error => {
        console.log(error)
      })


    if (txHash !== null || txHash !== undefined) {
      const transactionReceipt = await web3.eth.getTransactionReceipt(txHash)

      const status = parseInt(transactionReceipt.status)
      if (status === false) {
        console.log('Transaction Failed' + transactionReceipt.errorMessage)
      }
      else if (status === true) {
        // setStatus(status)
        toast(' Transaction Updated  Successfully', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 2000,
          icon: <CheckCircledIcon />
        })
      }
      else {
        toast('Transaction Update Failed', {
          className: 'font-mono text-lg h-[4rem]',
          duration: 2000,
          icon: <CheckCircledIcon />
        })
      }
    }
    // if (totalAddresses.length > 0 || totalAddresses !== null) {
    //   getAllTransactions()
    // }
  }

  const getAllTransactions = async () => {

    const totalAddresses = batches.map((batch) => {
      return batch.tucAddress
    })

    const allTransactions = []
    for (const address of totalAddresses) {
      const transactionContract = await new web3.eth.Contract(transactionABI, address)
      const transactionArray = await transactionContract.methods.getAllTransactions().call()
      allTransactions.push(transactionArray)
    }
    
    const flattenedTransactions = ([].concat(...allTransactions).filter((item)=> typeof item === 'object'))
    setTotalTransactions(flattenedTransactions)
    console.log(flattenedTransactions)
  }

  useEffect(() => {
    if (batches.length > 0) {
      getAllTransactions()
    }
  }, [batches])


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
          <Input id="tx-hash" value={previousTXHash} placeholder='Input the tx hash of the product' onChange={(e) => { setPreviousTXHash(e.target.value) }} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="receiver">Receiver</Label>
          <Input id="receiver" value={receiver} placeholder='input the contract address of the reciever' onChange={(e) => { setReciever(e.target.value) }} />
        </div>
        <Button className='mt-6' onClick={updateTransaction}>
          Transfer Batches
        </Button>
        <Button className='mt-6' onClick={getAllTransactions}>
          Fetch Transactions
        </Button>
      </CardContent>

      <CardContent>
        <DisplayTransactionData data={totalTransactions} />
      </CardContent>


    </Card>
  )
}

export default TransactionRegistrationInteraction
