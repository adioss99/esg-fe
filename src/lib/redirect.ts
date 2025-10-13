export const roleRedirect = (userRole: string) => {
  switch (userRole) {
    case "ADMIN":
      return "/dashboard";
    case "QC":
      return "/qc/dashboard";
    case "PACKING":
      return "/operator/dashboard";
    default:
      return "/";
  }
};
