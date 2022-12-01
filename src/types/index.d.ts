export interface UsersResponse {
  data: User[];
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
}

export interface User {
  id: string;
  name: string;
  cpf: string;
  birthdate: string;
  phone: string;
}

export interface Option {
  value: string | number;
  label: string;
}
