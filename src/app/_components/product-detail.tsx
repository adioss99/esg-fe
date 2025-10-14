import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetProductDetail } from "@/hooks/use-product";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formattedDate } from "@/helpers/date";
interface DialogProductComponentProps {
  trigerBtn: React.ReactNode;
  reffNo: string;
  actionBtn?: React.ReactNode;
}

const ProductDetailDialog = ({
  trigerBtn,
  reffNo,
  actionBtn,
}: DialogProductComponentProps) => {
  const { data, isLoading, isError, error } = useGetProductDetail(reffNo!);

  const production = data?.data;

  if (error) {
    throw new Error(error.message);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigerBtn}</DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle className="text-center">Production Detail</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex gap-2">
          <Label className="text-black">{production?.referenceNo}</Label>
        </DialogDescription>
        <ScrollArea className="max-h-[65vh]">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Something went wrong</p>}
          {production && (
            <div className="flex flex-col gap-2">
              <div className="grid sm:grid-cols-2 gap-2">
                <div>
                  <p className="text-gray-500 text-sm">Model Name :</p>
                  <p className="font-medium">{production.modelName}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Quantity</p>
                  <p className="font-medium">{production.quantity}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Status</p>
                  <Badge
                    className={`px-3 rounded-full text-sm font-medium ${
                      production.status === "COMPLETED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                    {production.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Created At</p>
                  <p className="font-medium">
                    {formattedDate(production.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Created By</p>
                  <p className="font-medium">
                    {production.createdByUser.name}{" "}
                    <span className="text-gray-700 text-sm">
                      ({production.createdByUser.email})
                    </span>
                  </p>
                </div>
              </div>
              <h2 className="mt-5">QC Inspections</h2>
              <div className="grid w-full [&>div]:border [&>div]:rounded">
                <Table>
                  <TableHeader>
                    <TableRow className="*:whitespace-nowrap">
                      <TableHead>Inspector</TableHead>
                      <TableHead>Passed</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Created At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="overflow-hidden">
                    {production.qcInspections.map((qc) => (
                      <TableRow key={qc.id}>
                        <TableCell>{qc.inspectorUser.name}</TableCell>
                        <TableCell>
                          <Badge
                            className={`px-2 py-1 rounded-full font-medium ${
                              qc.passed
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}>
                            {qc.passed ? "Passed" : "Failed"}
                          </Badge>
                        </TableCell>
                        <TableCell className="truncate">
                          {qc.notes ? (
                            qc.notes
                          ) : (
                            <span className="text-gray-400">
                              —
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{formattedDate(qc.createdAt)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </ScrollArea>
        <DialogFooter>{actionBtn}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;
