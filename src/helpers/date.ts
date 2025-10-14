export const formattedDate = (dateValue: string) => {
  const dateObj = new Date(dateValue);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
