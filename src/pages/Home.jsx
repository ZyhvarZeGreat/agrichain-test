import React from 'react'
import { Button } from "../../components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "../../components/ui/tabs"
import { BatchRegistrationInteraction, ProductRegistrationInteraction, TransactionRegistration } from '../components/index'
const Home = () => {

  return (
    <div className='w-full flex  flex-col  items-center justify-center h-full'>
  


      <Tabs defaultValue="register-products" className="w-[80%]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger className=' font-spaceGrotesk' value="register-products">Register Products</TabsTrigger>
          <TabsTrigger className=' font-spaceGrotesk' value="add-batch"> Batch Registration</TabsTrigger>
          <TabsTrigger className=' font-spaceGrotesk' value="transaction-registration"> TX Registration</TabsTrigger>
        </TabsList>
        <TabsContent value="register-products">
          <ProductRegistrationInteraction web3={web3} />
        </TabsContent>
        <TabsContent value="add-batch">
          <BatchRegistrationInteraction />
        </TabsContent>

        <TabsContent value="transaction-registration">
          <TransactionRegistration />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Home
