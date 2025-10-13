import React from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DialogAlerComponentProps {
  trigerBtn: React.ReactNode;
  title: string;
  desciption: string;
  confirmBtn?: React.ReactNode;
}

const DialogAlerComponent = ({
  trigerBtn,
  title,
  desciption,
  confirmBtn,
}: DialogAlerComponentProps) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>{trigerBtn}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{desciption}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {confirmBtn}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DialogAlerComponent;
