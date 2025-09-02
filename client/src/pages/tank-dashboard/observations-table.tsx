import { ArrowUpDown, TrashIcon } from "lucide-react"
import { useState } from 'react'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import api from '@/lib/api'
import { useParameters } from "@/hooks/useParameters";
import { type ObservationWithParameter } from "@/types/prisma-models"
import { ISOToMMDDYY } from "@/utils/date"
import errorLogger from '@/utils/errorLogger'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

function DeleteObservation({observation_id}: {observation_id: String}){

    const { refreshParameters } = useParameters();

    const handleDelete = async () => {
        try {
            await api.delete(
                `/observations/${observation_id}`,
            );
            alert("deleted")
            refreshParameters(); 
        } 
        catch (error: any) {
            errorLogger(error, 'alert');
        }
    }

    return (
        <div className="flex justify-center">
            <TrashIcon className="h-8 w-4 ml-4 mr-2 hover:stroke-destructive" onClick={()=> handleDelete()}/>
        </div>
    )
}

export const columns: ColumnDef<ObservationWithParameter>[] = [
    {
        accessorKey: "parameter_name",
        header: ({ column }) => {
            return (
                <div
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="flex ml-4"
                >
                    Parameter
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
            )
        },
        cell: ({ row }) => {
            const name: string = row.getValue("parameter_name")
            return <div className="ml-4">{name}</div>;
        },
    },
    {
        accessorKey: "value",
        header: "Value",
        cell: ({ row }) => {
            const value: number = row.getValue("value")
            const unit: string = (row.original as ObservationWithParameter).unit_of_measure;
            return `${value} ${unit}`;
        },
    },
    {
        accessorKey: "recorded_at",
        header: () => <div className="text-right">Date</div>,
        cell: ({ row }) => {
            const date: string = row.getValue("recorded_at")
            return <div className="text-right">{ISOToMMDDYY(date, true)}</div>
        },
    },
    {
        id: "delete",
        cell: ({ row }) => {
            const observation_id: string = (row.original as ObservationWithParameter).id;
            return (
                <DeleteObservation observation_id={observation_id}/>
            )
        },
    },
]

export function ObservationsTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
        sorting,
        columnFilters,
        },
    })

  return (
    <div>
        <div className="flex items-center pb-4">
            <Input
                placeholder="Filter parameters..."
                value={(table.getColumn("parameter_name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                    table.getColumn("parameter_name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm shadow-none"
            />
        </div>
      <div className="overflow-hidden rounded-md">
        <Table>
            <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                    return (
                    <TableHead key={header.id}>
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </TableHead>
                    )
                })}
                </TableRow>
            ))}
            </TableHeader>
            <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                >
                    {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                    ))}
                </TableRow>
                ))
            ) : (
                <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="shadow-none"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="shadow-none"
        >
          Next
        </Button>
      </div>
    </div>
  )
}