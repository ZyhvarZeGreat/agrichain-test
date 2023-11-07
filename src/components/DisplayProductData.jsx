import React from 'react'
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption, } from '../../components/ui/table'
const DisplayProductData = () => {
  return (
    <div className='w-full h-[15rem] font-jakarta '>
      <Table>
        <TableHeader>
          <TableHead className='text-lg'>Registered Products and Materials</TableHead>
        </TableHeader>
        <TableBody>
          <TableCell>
            <h3 className='text-[1rem] font-bold'>
              S/N
            </h3>
          </TableCell>

          <TableCell>
            <h3 className='text-[1rem] font-bold'>
              TX Hash
            </h3>
          </TableCell>
          <TableCell>
            <h3 className='text-[1rem] font-bold'>
              Previous TX
            </h3>
          </TableCell>

          <TableCell>
            <h3 className='text-[1rem] font-bold'>
              Sender
            </h3>
          </TableCell>

          <TableCell>
            <h3 className='text-[1rem] font-bold'>
              Receiver
            </h3>
          </TableCell>
        </TableBody>
      </Table>
    </div>
  )
}

export default DisplayProductData
