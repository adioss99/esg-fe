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
import { useRegisterUser, useUpdateUser } from "@/hooks/use-admin";
import { UserType } from "@/types/auth-types";
import {
  registerSchema,
  RegisterSchemaType,
  updateUserSchema,
  UpdateUserSchemaType,
} from "@/validator/user-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface UserFormDialogProps extends Partial<UserType> {
  trigger: React.ReactNode; // 👈 trigger button passed as prop
}
export function UserFormDialog({
  id,
  name,
  email,
  role,
  trigger,
}: UserFormDialogProps) {
  const { mutateAsync: register, isPending, error } = useRegisterUser();
  const {
    mutateAsync: update,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateUser(id!);

  const isEdit = !!id;
  const form = useForm<RegisterSchemaType | UpdateUserSchemaType>({
    defaultValues: {
      name: name ?? "",
      email: email ?? "",
      role: role ?? "ADMIN",
      password: "",
    },
    resolver: zodResolver(isEdit ? updateUserSchema : registerSchema),
  });

  const handleRegister = async (data: RegisterSchemaType) => {
    const res = await register(data);
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
  };
  const handleUpdate = async (data: UpdateUserSchemaType) => {
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
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{id ? "Update" : "Register"}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {id ? "Update user" : "Register user"}
        </DialogDescription>

        <Form {...form}>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Name"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="QC">QC</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="OPERATOR">Operator</SelectItem>
                    </SelectContent>
                    <FormMessage />
                  </Select>
                </FormItem>
              )}
            />
            {!id && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
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
      </DialogContent>
    </Dialog>
  );
}
