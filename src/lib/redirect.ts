import { redirect } from "next/navigation";

export const roleRedirect = (userRole: string) => {
  switch (userRole) {
    case "ADMIN":
      return redirect("/dashboard");
    case "QC":
      return redirect("/qc/dashboard");
    case "OPERATOR":
      return redirect("/operator/dashboard");
    default:
      return redirect("/");
  }
};
