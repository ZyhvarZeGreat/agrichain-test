import React from 'react'
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, } from '../../components/ui/table'
const DisplayBatchData = () => {
  return (
    <div className='w-full h-[15rem] font-jakarta '>
      <Table>
        <TableHeader>
          <TableHead className='text-lg'>Added Batches</TableHead>
        </TableHeader>
        <TableBody>
          <TableCell>
            <h3 className='text-[1rem] font-bold'>
              S/N
            </h3>
          </TableCell>

          <TableCell>
            <h3 className='text-[1rem] font-bold'>
              Batch Number
            </h3>
          </TableCell>
          <TableCell>
            <h3 className='text-[1rem] font-bold'>
              Material Batch
            </h3>
          </TableCell>

          <TableCell>
            <h3 className='text-[1rem] font-bold'>
              Manager
            </h3>
          </TableCell>

          <TableCell>
            <h3 className='text-[1rem] font-bold'>
              TUC Address
            </h3>
          </TableCell>

          <TableCell>
            <h3 className='text-[1rem] font-bold'>
              Timestamp
            </h3>
          </TableCell>
        </TableBody>
      </Table>
    </div>
  )
}

export default DisplayBatchData
