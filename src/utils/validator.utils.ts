import { cpfUnmask } from "./masks.utils";

export const validateCpf = (cpf: string): boolean => {
  cpf = cpfUnmask(cpf);
  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  const values = cpf.split("").map((el) => parseInt(el));
  const rest = (count: number) =>
    ((values
      .slice(0, count - 12)
      .reduce((soma, el, index) => soma + el * (count - index), 0) *
      10) %
      11) %
    10;

  return rest(10) === values[9] && rest(11) === values[10];
};

export const validateStartDate = (date: string): boolean => {
  const [month, year] = date.split("/");
  if (parseInt(month) > 12 || parseInt(month) === 0) return false;
  return true;
};
