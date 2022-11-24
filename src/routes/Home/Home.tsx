import React, { useState } from "react";
import { Input } from "../../components/Form/Input";
import { Table } from "../../components/Table";
import { useFetch } from "../../hooks/useFetch";
import { User } from "../../types";
import styles from "./styles.module.scss";

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  const { data } = useFetch<User[]>(
    `/clients?_page=${pageIndex}&_limit=${pageLimit}`
  );

  console.log({ data });

  const handleSearchChange = () => {};

  return (
    <div>
      <Input
        type="search"
        placeholder="Digite aqui um nome ou CPF..."
        width="100%"
      />

      <div>
        <Table data={data} />
      </div>
    </div>
  );
};
