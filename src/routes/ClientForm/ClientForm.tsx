import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
  ActionFunctionArgs,
  Link,
  LoaderFunctionArgs,
  redirect,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import { Button } from "../../components/Button";
import { Input } from "../../components/Form/Input";
import { api } from "../../services/api";
import { User } from "../../types";
import { convertToIsoDate, formatDate } from "../../utils/helpers.utils";
import { cpfMask, dateMask, phoneMask } from "../../utils/masks.utils";
import { validateBirtdate, validateCpf } from "../../utils/validator.utils";
import styles from "./styles.module.scss";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { data } = await api.get<User>(`/clients/${params.id}`);
  return data;
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const errors: any = {};
  const { cpf, birthdate } = data;

  if (!validateCpf(cpf as string)) {
    errors.cpf = "CPF inválido";
  }
  if (!validateBirtdate(convertToIsoDate(birthdate as string))) {
    errors.birthdate = "Data de nascimento inválida";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  const body = {
    ...data,
    birthdate: convertToIsoDate(birthdate as string),
  };

  if (params.id) {
    try {
      await api.put(`/clients/${params.id}`, body);
      return redirect("/");
    } catch (error: any) {
      const responseError: AxiosError = error.response.data;
      return responseError;
    }
  }
  try {
    await api.post("/clients", body);
    return redirect("/");
  } catch (error: any) {
    const responseError: AxiosError = error.response.data;
    return responseError;
  }
};

export const ClientForm: React.FC = () => {
  const client = useLoaderData() as User;
  const { Form, state, data: errors } = useFetcher();

  const [cpf, setCpf] = useState(client?.cpf ?? "");
  const [birthdate, setBirthdate] = useState(
    client?.birthdate ? formatDate(client.birthdate) : ""
  );
  const [phone, setPhone] = useState(client?.phone ?? "");
  const [formErros, setFormErros] = useState(errors);

  useEffect(() => {
    if (errors) {
      setFormErros(errors);
    }
  }, [errors]);

  const handleInputFocus = (name: string) => () => {
    if (formErros) {
      setFormErros({ ...formErros, [name]: null });
    }
  };

  return (
    <div className={styles.container}>
      <Form method="post">
        <fieldset>
          <div className={styles.row}>
            <Input
              name="name"
              placeholder="Nome"
              minLength={2}
              defaultValue={client?.name ?? ""}
              required
            />
            <Input
              name="cpf"
              placeholder="CPF"
              maxLength={14}
              minLength={14}
              value={cpf}
              onChange={(e) => setCpf(cpfMask(e.target.value))}
              pattern="^\d{3}\.\d{3}\.\d{3}-\d{2}$"
              required
              error={formErros?.cpf}
              onFocus={handleInputFocus("cpf")}
            />
          </div>
          <div className={styles.row}>
            <Input
              name="birthdate"
              placeholder="Data de Nascimento"
              maxLength={10}
              minLength={10}
              value={birthdate}
              onChange={(e) => setBirthdate(dateMask(e.target.value))}
              pattern="^\d{2}\/\d{2}\/\d{4}$"
              required
              error={formErros?.birthdate}
              onFocus={handleInputFocus("birthdate")}
            />
            <Input
              name="phone"
              placeholder="Telefone"
              maxLength={15}
              minLength={15}
              value={phone}
              onChange={(e) => setPhone(phoneMask(e.target.value))}
              pattern="^\(\d{2}\) \d{5}-\d{4}$"
            />
          </div>
        </fieldset>

        <footer>
          <Link to="/">
            <Button type="button" theme="plain">
              Cancelar
            </Button>
          </Link>
          <Button
            type="submit"
            theme="success"
            width={106}
            loading={state === "submitting"}
          >
            Salvar
          </Button>
        </footer>
      </Form>
    </div>
  );
};
