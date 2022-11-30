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

export const validateBirtdate = (birthdate: string): boolean => {
  const date = new Date(`${birthdate}T00:00`);
  if (!(date instanceof Date && !isNaN(date.valueOf()))) return false;

  let now = new Date();
  const currentYear = now.getFullYear();
  const [year, month, day] = birthdate.split("-");

  if (parseInt(year) >= currentYear) return false;
  if (parseInt(day) > 31 || parseInt(day) === 0) return false;
  if (parseInt(month) > 12 || parseInt(month) === 0) return false;
  return true;
};
