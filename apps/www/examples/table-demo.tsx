import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  { id: "INV-1042", client: "Northwind", amount: "$2,400.00", status: "Paid" },
  { id: "INV-1043", client: "Globex", amount: "$1,150.00", status: "Pending" },
  { id: "INV-1044", client: "Initech", amount: "$870.00", status: "Failed" },
] as const

const statusVariant = { Paid: "success", Pending: "warning", Failed: "destructive" } as const

export default function TableDemo() {
  return (
    <div className="w-full max-w-xl">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-semibold">{invoice.id}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[invoice.status]}>{invoice.status}</Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">{invoice.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
