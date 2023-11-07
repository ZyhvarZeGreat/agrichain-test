import React from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "../../components/ui/tabs"
import { BatchRegistrationInteraction, ProductRegistrationInteraction, TransactionRegistration } from '../components/index'
const Home = () => {
  return (
    <div className='w-full flex   items-center justify-center h-full'>
      <Tabs defaultValue="register-products" className="w-[80%]">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger className=' font-spaceGrotesk' value="register-products">Register Products</TabsTrigger>
          <TabsTrigger className=' font-spaceGrotesk' value="add-batch"> Batch Registration</TabsTrigger>
          <TabsTrigger className=' font-spaceGrotesk' value="transaction-registration"> TX Registration</TabsTrigger>
        </TabsList>
        <TabsContent value="register-products">
          <ProductRegistrationInteraction />
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
