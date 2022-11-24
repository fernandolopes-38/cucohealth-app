export const startDateMask = (value: string): string =>
  value
    .replace(/\D/g, "")
    .replace(/^(\d{2})\/?(\d{1,4})/, "$1/$2")
    .replace(/^(\d{2})\/(\d{4})(\d{0,})$/, "$1/$2");

export const cpfMask = (value: string): string => {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return value;
};

export const cpfUnmask = (value: string): string => value.replace(/\-|\./g, "");
