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
import { useCreateProduct, useUpdateProduct } from "@/hooks/use-product";
import {
  ProductRequest,
  ProductStatusType,
  ProductType,
  UpdateProductRequest,
} from "@/types/product-types";
import {
  productSchema,
  ProductSchemaType,
  productStatusSchema,
  ProductStatusSchemaType,
} from "@/validator/product-validator";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ProductFormDialogProps extends Partial<ProductType> {
  trigger: React.ReactNode; // 👈 trigger button passed as prop
}
export function ProductFormDialog({
  referenceNo,
  trigger,
}: ProductFormDialogProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const { mutateAsync: createProduct, isPending, error } = useCreateProduct();
  const {
    mutateAsync: update,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateProduct(referenceNo!);
  const isEdit = !!referenceNo;

  const form = useForm<ProductSchemaType | ProductStatusSchemaType>({
    defaultValues: {
      modelName: "",
      quantity: 0 as number,
      status: "PENDING" as ProductStatusType,
    },
    resolver: zodResolver(!isEdit ? productSchema : productStatusSchema),
  });

  const handleRegister = async (data: ProductRequest) => {
    const qty = Number(data.quantity);
    const payload = { ...data, qty };
    const res = await createProduct(payload);
    if (!res.success) {
      console.error(res);
      toast.error("Register failed.");
      return;
    }
    if (error) {
      toast.error("Something went wrong.");
      return;
    }
    toast.success("Register success.");
    btnRef.current?.click();
  };

  const handleUpdate = async (data: UpdateProductRequest) => {
    const res = await update(data);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    if (updateError) {
      toast.error("Something went wrong.");
      return;
    }
    toast.success("Update success.");
    btnRef.current?.click();
  };
  const onSubmit = async (data: any) => {
    try {
      if (isEdit) {
        handleUpdate(data);
      } else {
        handleRegister(data);
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {referenceNo ? `Update  ${referenceNo}` : "Add"}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {referenceNo ? `Update product status` : "Add new product"}
        </DialogDescription>

        <Form {...form}>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}>
            {!isEdit ? (
              <>
                <FormField
                  control={form.control}
                  name="modelName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Model Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Model Name"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Quantity"
                          className="w-full"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(
                              value === "" ? undefined : Number(value)
                            );
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <FormField
                control={form.control}
                name="status"
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
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              {isPending || isUpdating ? (
                <Button disabled>Loading...</Button>
              ) : (
                <>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </>
              )}
            </DialogFooter>
          </form>
        </Form>
        <DialogClose ref={btnRef} />
      </DialogContent>
    </Dialog>
  );
}
