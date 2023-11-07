import React from 'react'
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import DisplayProductData from './DisplayProductData'
import { Label } from "../../components/ui/label"
import {useProductRegistrationStore}  from '../store/useproductRegistrationStore'
const ProductRegistrationInteraction = () => {
  const {productCode,ProductName,rawMaterials,bacAddr,interactionStatus,setProductCode,setProductName,setRawMaterials,setBacAddr,setInteractionStatus} = useProductRegistrationStore
  return (
    <Card>
      <CardHeader className='flex flex-col '>
        <CardTitle className='font-spaceGrotesk text-3xl'>Platform Information</CardTitle>
        <CardDescription className='font-spaceGrotesk'>
       Platform Address: 0xf.....
        </CardDescription>
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
          <Input id="product-code" defaultValue="EC12345" />
        </div>
        <div className="space-y-1 font-jakarta  font-light">
          <Label htmlFor="product-name">Product Name</Label>
          <Input id="product-name" defaultValue="Grains" />
        </div>

        <div className="space-y-1 font-jakarta font-light">
          <Label htmlFor="raw-materials">Raw Materials</Label>
          <Input id="raw-materials" defaultValue="Barley" />
        </div>
      </CardContent>
      <CardContent className="space-y-2 font-light w-full">
        <div className="space-y-1 font-jakarta">
          <Label htmlFor="product-code ">Material Code</Label>
          <Input id="product-code" defaultValue="EC12345" />
        </div>
        <div className="space-y-1 font-jakarta  font-light">
          <Label htmlFor="product-name">Material Name</Label>
          <Input id="product-name" defaultValue="Grains" />
        </div>
 
   <div className=' h-[3rem] flex items-center justify-start   font-jakarta'>
    <Button>
      Register Materials
    </Button>
   </div>
      </CardContent>
    </div>

      <CardFooter>
        <Button className='font-jakarta'>Register Product</Button>
      </CardFooter>

      <CardContent className="space-y-2 w-full font-light">
        <DisplayProductData/>
      </CardContent>

    </Card>
  )
}

export default ProductRegistrationInteraction
