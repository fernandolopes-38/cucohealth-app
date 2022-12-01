import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  let [searchParams, setSearchParams] = useSearchParams();

  const searchIndex = searchParams.get("index")
    ? Number(searchParams.get("index"))
    : 1;
  const searchSize = searchParams.get("size")
    ? Number(searchParams.get("size"))
    : 5;
  const searchTermParam = searchParams.get("term") ?? "";

  const [searchTerm, setSearchTerm] = useState(searchTermParam);
  const [filter, setFilter] = useState("");
  const [clientsCount, setClientsCount] = useState(1);

  const inuputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  let url = `/clients?_page=${searchIndex}&_limit=${searchSize}${filter}`;

  const { response, mutate, isLoading } = useFetch<UsersResponse>(url);

  useEffect(() => {
    if (response) {
      const totalClients = Number(response?.headers["x-total-count"]);
      setClientsCount(totalClients);
      const totalPages = Math.ceil(totalClients / searchSize);

      if (searchIndex > totalPages) {
        searchParams.set("index", String(totalPages));
        setSearchParams(searchParams);
      }
    }
  }, [response]);

  const totalPages = Math.ceil(clientsCount / searchSize);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchParams.set("index", "1");
      setSearchParams(searchParams);
      if (parseInt(debouncedSearchTerm)) {
        setFilter(`&cpf_like=${debouncedSearchTerm}`);
        return;
      }
      setFilter(`&name_like=${debouncedSearchTerm}`);
      return;
    }
    setFilter("");
    searchParams.delete("term");
    setSearchParams(searchParams);
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
    searchParams.set("index", String(pageToGo));
    setSearchParams(searchParams);
  };
  const handlePageLimitChange = (pageSize: number | string) => {
    searchParams.set("size", pageSize as string);
    setSearchParams(searchParams);
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
          defaultValue={searchSize}
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
          pageSize={searchSize}
          pageIndex={searchIndex}
          onPageChange={handlePageChange}
          loading={isLoading}
          clientsMutation={mutate}
        />
      </div>
    </div>
  );
};
