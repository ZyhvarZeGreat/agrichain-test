import React from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import DisplayBatchData from './DisplayBatchData'
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
const BatchRegistrationInteraction = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='font-spaceGrotesk text-2xl'>Batch Registration</CardTitle>
        <CardDescription className='font-spaceGrotesk text-md'>
          Input the batch code of your products
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 font-jakarta">
        <div className="space-y-1">
          <Label htmlFor="batch-code">Batch Code</Label>
          <Input id="name" defaultValue="Pedro Duarte" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="@peduarte" />
        </div>
      </CardContent>
      <CardFooter>
        <Button className='font-jakarta'>Save changes</Button>
      </CardFooter>



      <CardContent>
        <DisplayBatchData />
      </CardContent>

    </Card>
  )
}

export default BatchRegistrationInteraction
