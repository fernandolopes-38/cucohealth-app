import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { KeyedMutator } from "swr";
import { api } from "../../services/api";
import { User, UsersResponse } from "../../types";
import { formatDateLong } from "../../utils/helpers.utils";
import { Button } from "../Button";
import { DeleteModal } from "../DeleteModal";
import { Checkbox } from "../Form/Checkbox";
import { DeleteIcon } from "../Icons/DeleteIcon";
import { EditIcon } from "../Icons/EditIcon";
import { Modal } from "../Modal";
import { Skeleton } from "../Skeleton";
import styles from "./styles.module.scss";
import { TablePagination } from "./TablePagination";

interface TableProps {
  data: User[];
  totalCount: number;
  totalPages: number;
  pageSize: number;
  pageIndex: number;
  onPageChange: (pageInde: number) => void;
  loading?: boolean;
  clientsMutation: KeyedMutator<UsersResponse>;
}
export const Table: React.FC<TableProps> = ({
  data,
  totalCount,
  totalPages,
  pageSize,
  pageIndex,
  onPageChange,
  loading,
  clientsMutation,
}) => {
  const [rowsChecked, setRowsChecked] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.currentTarget.checked;
    const value = event.currentTarget.value;
    if (checked) {
      if (value === "all") {
        setRowsChecked(data?.map((datum) => datum.id));
        return;
      }
      setRowsChecked([...rowsChecked, value]);
      return;
    }
    if (value === "all") {
      setRowsChecked([]);
      return;
    }
    setRowsChecked((state) => state.filter((item) => item !== value));
  };

  const handleDeleteClient = async () => {
    try {
      for (let clientId of rowsChecked) {
        await api.delete(`/clients/${clientId}`);
      }
      setRowsChecked([]);
      toast.success("Cliente(s) exlcuidos com sucesso.");
      clientsMutation();
    } catch (error) {
      toast.error("Erro ao tentar excluir Cliente(s).");
    } finally {
      setIsModalOpen(false);
    }

    // const promises: Promise<any>[] = [];
    // rowsChecked.map((clientId) => {
    //   console.log(clientId);
    //   const clienteDeletePromise = api.delete(`/clients/${clientId}`);
    //   promises.push(clienteDeletePromise);
    // });

    // try {
    //   await Promise.allSettled(promises);
    //   setRowsChecked([]);
    //   toast.success("Cliente(s) exlcuidos com sucesso.");
    //   clientsMutation();
    // } catch (error: any) {
    //   toast.error("Erro ao tentar excluir Cliente(s).");
    // } finally {
    //   setIsModalOpen(false);
    // }
  };

  return (
    <div data-testid="clients-table" className={styles.table__container}>
      <table>
        <colgroup>
          <col width="9%" />
          <col width="44%" />
          <col width="22%" />
          <col width="15%" />
          <col width="25%" />
        </colgroup>
        <thead>
          <tr>
            <th>
              <Checkbox
                value="all"
                checked={rowsChecked.length === data?.length && !!data?.length}
                onChange={handleCheckboxChange}
              />
            </th>
            <th>NOME</th>
            <th>DATA DE NASCIMENTO</th>
            <th>TELEFONE</th>
            <th className={styles.flex__center}>
              <div className={styles.flex__center}>
                {!!rowsChecked.length && (
                  <Button
                    theme="danger"
                    icon={<DeleteIcon />}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Excluir
                  </Button>
                )}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {true */}
          {loading && !data?.length
            ? Array.from({ length: pageSize }).map((_, index) => (
                <tr key={`${index}-row`}>
                  <td className={styles.skeleton__container}>
                    <Skeleton width="45%" height={24} />
                  </td>
                  <td className={styles.skeleton__container}>
                    <Skeleton width="75%" height={22} />
                    <Skeleton width="30%" height={20} />
                  </td>
                  <td className={styles.skeleton__container}>
                    <Skeleton width="65%" height={22} />
                  </td>
                  <td className={styles.skeleton__container}>
                    <Skeleton width="65%" height={22} />
                  </td>
                  <td className={styles.skeleton__container}>
                    <Skeleton width="75%" height={22} />
                  </td>
                </tr>
              ))
            : !data?.length && (
                <tr>
                  <td colSpan={5}>No clients....</td>
                </tr>
              )}
          {data?.map((datum) => (
            <tr key={datum.id}>
              <td>
                <Checkbox
                  value={datum.id}
                  checked={rowsChecked.indexOf(datum.id) >= 0}
                  onChange={handleCheckboxChange}
                />
              </td>
              <td>
                <p className={styles.main__text}>{datum.name}</p>
                <p className={styles.secondary__text}>{datum.cpf}</p>
              </td>
              <td>{formatDateLong(datum.birthdate)}</td>
              <td>{datum.phone}</td>
              <td>
                <div className={styles.flex__center}>
                  <Link to={`/client-form/${datum.id}`}>
                    <Button theme="success" icon={<EditIcon />}>
                      Editar
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!!data.length && (
        <footer>
          <PagesResults
            pageSize={pageSize}
            currentPage={pageIndex}
            totalCount={totalCount}
          />

          <TablePagination
            currentPage={pageIndex}
            lastPage={totalPages}
            onPageChange={onPageChange}
          />
        </footer>
      )}

      <Modal
        title="Atencão"
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <DeleteModal
          text="Você tem certeza que quer excluir os cliente(s) selecionado(s)?"
          onDeleteClick={() => handleDeleteClient()}
          onCancelClick={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

interface PagesResultsProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}
const PagesResults: React.FC<PagesResultsProps> = ({
  pageSize,
  currentPage,
  totalCount,
}) => {
  const startRow = pageSize * (currentPage - 1) + 1;
  const endRow = startRow - 1 + pageSize;

  if (endRow < totalCount) {
    return (
      <div>
        <span>
          <strong>
            {pageSize * (currentPage - 1) + 1} - {endRow}
          </strong>{" "}
          de <strong>{totalCount}</strong>
        </span>
      </div>
    );
  }
  return (
    <div>
      <span>
        <strong>
          {pageSize * (currentPage - 1) + 1} - {totalCount}
        </strong>{" "}
        de <strong>{totalCount}</strong>
      </span>
    </div>
  );
};
