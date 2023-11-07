import React, { useEffect, useState } from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import DisplayBatchData from './DisplayBatchData'
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
const BatchRegistrationInteraction = () => {
  let found = false
  const testCall = () => {}
  return (
    <Card>



      <CardHeader>
        <CardTitle className='font-spaceGrotesk text-lg'>Batch Registration</CardTitle>
        <CardDescription className='font-spaceGrotesk text-md'>
          Input the batch code of your products
        </CardDescription>
      </CardHeader>



      <CardContent className="space-y-2 font-jakarta">
        <div className="space-y-1">
          <Label htmlFor="batch-code">Batch Code</Label>
          <Input id="name" placeholder='234ec1' />
        </div>
        <div className="space-y-1">
          <Label htmlFor="batch-count">Batch Count</Label>
          <Input id="batch-count" placeholder='100' />
        </div>
        <div className="space-y-1">
          <Label htmlFor="raw-materials">Raw Materials Used</Label>
          <Input id="raw-materials" placeholder='121213' />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={testCall} className='font-jakarta'>Add Batch</Button>
      </CardFooter>

      <CardContent>
        <DisplayBatchData />
      </CardContent>


      <CardContent className="space-y-1  flex flex-col items-center  justify-center  gap-4 font-jakarta">

        <div className="space-y-1 mt-[2rem] flex  h-[12rem] items-start justify-center w-full flex-col gap-2">
          <h2 className='text-xl'> Search for a product</h2>
          <Label htmlFor="product-code">Product Code</Label>
          <Input id="product-code" placeholder='ec2356' />
          <Button className='text-md w-[6rem] h-[2.5rem]'> Search </Button>
        </div>
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
