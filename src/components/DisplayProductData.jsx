import React from 'react'
import useProductStore from '../store/useProductStore'

import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, } from '../../components/ui/table'
const DisplayProductData = () => {
  const { products } = useProductStore()
  const productTable= products.map((product,i)=>{
    
    return (
      <TableRow key={i}>
        <TableCell>{i+1}</TableCell>
        <TableCell>{product.productName}</TableCell>
        <TableCell>{product.productCode.toString()}</TableCell>
        <TableCell>{product.rawMaterials}</TableCell>
        <TableCell>{product.owner}</TableCell>
        <TableCell>{product.bacAddress}</TableCell>
        <TableCell>{product.registrationTime.toString()}</TableCell>
      </TableRow>
    )
   })
  return (
    <div className='w-full h-[15rem] font-jakarta '>
      <Table >
        <TableCaption className='text-lg'>Registered Products and Materials</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>     S/N</TableHead>
            <TableHead>   Name</TableHead>
            <TableHead>  Product Code</TableHead>
            <TableHead> Materials</TableHead>
            <TableHead>    Owner</TableHead>
            <TableHead>    BAC Address</TableHead>
            <TableHead>    TimeStamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
       {products === undefined || products.length === 0 ? <div> No Products Registered </div>: productTable}
        </TableBody>
      </Table>
    </div>
  )
}

export default DisplayProductData
