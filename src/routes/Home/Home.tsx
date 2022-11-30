import { AxiosResponseHeaders, RawAxiosResponseHeaders } from "axios";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "../../components/Form/Input";
import { SearchIcon } from "../../components/Icons/SearchIcon";
import { Table } from "../../components/Table";
import { useDebounce } from "../../hooks/useDebounce";
import { useFetch } from "../../hooks/useFetch";
import { User } from "../../types";
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

  const { response, isLoading } = useFetch<{
    data: User[];
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  }>(url);

  useEffect(() => {
    if (response) {
      setClientsCount(Number(response?.headers["x-total-count"]));
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

      <div className={styles.tableContainer}>
        <Table
          data={response?.data}
          totalCount={clientsCount}
          totalPages={totalPages}
          pageSize={pageLimit}
          pageIndex={pageIndex}
          onPageChange={handlePageChange}
          loading={isLoading}
        />
      </div>
    </div>
  );
};
