import React from 'react'
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, } from '../../components/ui/table'
const DisplayTransactionData = () => {
  return (
    <div className='w-full h-[15rem] font-jakarta overflow-y-scroll '>
    <Table >
      <TableCaption className='text-lg'>Registered Products and Materials</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>     S/N</TableHead>
          <TableHead>   TX Hash</TableHead>
          <TableHead>  Previous TX</TableHead>
          <TableHead> Sender</TableHead>
          <TableHead>    Receiver</TableHead> 
          <TableHead>    TimeStamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
     {/* {products === undefined || products.length === 0 ? <div> No Products Registered </div>: productTable} */}
      </TableBody>
    </Table>
  </div>
  )
}

export default DisplayTransactionData
