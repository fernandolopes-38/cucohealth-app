import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "../../components/Form/Input";
import { SearchIcon } from "../../components/Icons/SearchIcon";
import { Select } from "../../components/Select";
import { Table } from "../../components/Table";
import { useDebounce } from "../../hooks/useDebounce";
import { useFetch } from "../../hooks/useFetch";
import { UsersResponse } from "../../types";
import { cpfMask } from "../../utils/masks.utils";
import styles from "./styles.module.scss";

export const Home: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageLimit, setPageLimit] = useState(7);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [clientsCount, setClientsCount] = useState(1);

  const inuputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  let url = `/clients?_page=${pageIndex}&_limit=${pageLimit}${filter}`;
  console.log(url);

  const { response, mutate, isLoading } = useFetch<UsersResponse>(url);

  useEffect(() => {
    if (response) {
      const totalClients = Number(response?.headers["x-total-count"]);
      setClientsCount(totalClients);
      const totalPages = Math.ceil(totalClients / pageLimit);
      if (pageIndex > totalPages) {
        setPageIndex(totalPages);
      }
    }
  }, [response]);

  const totalPages = Math.ceil(clientsCount / pageLimit);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setPageIndex(1);
      if (parseInt(debouncedSearchTerm)) {
        setFilter(`&cpf_like=${debouncedSearchTerm}`);
        return;
      }
      setFilter(`&name_like=${debouncedSearchTerm}`);
      return;
    }
    setPageIndex(1);
    setFilter("");
  }, [debouncedSearchTerm]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (parseInt(value) && value.length >= 3) {
      if (inuputRef.current) {
        inuputRef.current.maxLength = 14;
      }
      setSearchTerm(cpfMask(value));
      return;
    }
    if (inuputRef.current) {
      inuputRef.current.maxLength = 100;
    }
    setSearchTerm(value);
  };

  const handlePageChange = (pageToGo: number) => {
    setPageIndex(pageToGo);
  };
  const handlePageLimitChange = (pageSize: number | string) => {
    setPageLimit(pageSize as number);
  };

  return (
    <div>
      <Input
        ref={inuputRef}
        type="search"
        placeholder="Digite aqui um nome ou CPF..."
        width="100%"
        icon={<SearchIcon />}
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <div className={styles.row}>
        <span>Items por página:</span>
        <Select
          width={60}
          onChange={handlePageLimitChange}
          options={[
            { value: 5, label: "5" },
            { value: 10, label: "10" },
            { value: 25, label: "25" },
            { value: 50, label: "50" },
          ]}
        />
      </div>

      <div className={styles.tableContainer}>
        <Table
          data={response?.data ?? []}
          totalCount={clientsCount}
          totalPages={totalPages}
          pageSize={pageLimit}
          pageIndex={pageIndex}
          onPageChange={handlePageChange}
          loading={isLoading}
          clientsMutation={mutate}
        />
      </div>
    </div>
  );
};
