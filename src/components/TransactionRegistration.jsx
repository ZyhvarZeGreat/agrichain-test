import React from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import  DisplayTransactionData from './DisplayTransactionData'
import { Label } from "../../components/ui/label"
const TransactionRegistrationInteraction = () => {
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
          <Label htmlFor="product-code">Product Code</Label>
          <Input id="name" defaultValue="1234567" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="batch-number">Batch Number</Label>
          <Input id="username" defaultValue="2109/2312" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className='font-jakarta'>Save changes</Button>
      </CardFooter>

      <CardContent>
        <DisplayTransactionData />
      </CardContent>
    </Card>
  )
}

export default TransactionRegistrationInteraction
