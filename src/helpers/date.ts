export const formattedDate = (dateValue: string | Date) => {
  const dateObj = new Date(dateValue);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
