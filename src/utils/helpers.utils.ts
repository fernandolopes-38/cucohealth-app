export const formatDateLong = (value: string) => {
  const date = new Date(`${value}T00:00`);
  return Intl.DateTimeFormat("pt-BT", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  }).format(date);
};

export const formatDate = (value: string): string => {
  if (!value) return "";

  return value.replace(/^(\d{4})-(\d{2})-(\d{2})$/, "$3/$2/$1");
};
export const convertToIsoDate = (value: string): string => {
  if (!value) return "";

  return value.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "$3-$2-$1");
};
