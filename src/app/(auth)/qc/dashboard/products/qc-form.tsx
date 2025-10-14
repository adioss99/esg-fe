/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateQc } from "@/hooks/use-qc";
import { qcSchema, QcSchemaType } from "@/validator/qc-validator";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface QcFormDialogProps {
  prodId: number;
  trigger: React.ReactNode; // 👈 trigger button passed as prop
}
export function QcFormDialog({ prodId, trigger }: QcFormDialogProps) {
  const { mutateAsync: createQC, isPending, error } = useCreateQc(prodId!);
  const form = useForm<QcSchemaType>({
    defaultValues: {
      notes: "",
      passed: "false",
    },
    resolver: zodResolver(qcSchema),
  });

  const onSubmit = async (data: any) => {
    const res = await createQC(data);
    if (!res.success) {
      toast.error("Failed creating qc report.");
      console.error(res.message);
      throw new Error(res.message);
    }
    if (error) {
      toast.error("Something went wrong.");
      return;
    }
    toast.success("QC report success.");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create QC Report</DialogTitle>
        </DialogHeader>
        <DialogDescription>{isPending && "Creating..."}</DialogDescription>

        <Form {...form}>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="passed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="false">Failed</SelectItem>
                      <SelectItem value={"true"}>Passed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Notes"
                      className="w-full"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
