import React from "react";
import { Link } from "react-router-dom";
import { formatDateLong } from "../../../utils/helpers.utils";
import { Button } from "../../Button";
import { EditIcon } from "../../Icons/EditIcon";
import { Skeleton } from "../../Skeleton";
import styles from "./styles.module.scss";

interface TableProps {
  data: any[] | undefined;
  totalCount: number;
  totalPages: number;
  pageSize: number;
  pageIndex: number;
  onPageChange: (pageInde: number) => void;
  loading?: boolean;
}
export const Table: React.FC<TableProps> = ({
  data,
  totalCount,
  totalPages,
  pageSize,
  pageIndex,
  onPageChange,
  loading,
}) => {
  return (
    <div data-testid="users-table" className={styles.table__container}>
      <table>
        {/* <colgroup>
          <col width="25%" />
          <col width="31%" />
          <col width="15%" />
          <col width="15%" />
          <col width="7%" />
          <col width="7%" />
        </colgroup> */}
        <thead>
          <tr>
            {/* <th></th> */}
            <th>NOME</th>
            <th>DATA DE NASCIMENTO</th>
            <th>TELEFONE</th>
            <th className={styles.flex__center}></th>
          </tr>
        </thead>
        <tbody>
          {/* {true */}
          {loading && !data?.length
            ? Array.from({ length: pageSize }).map((_, index) => (
                <tr key={`${index}-row`}>
                  {/* <td className={styles.skeleton__container}>
                    <Skeleton width="75%" height={24} />
                  </td> */}
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
                  <td colSpan={4}>No clients....</td>
                </tr>
              )}
          {data?.map((datum) => (
            <tr key={datum.id}>
              {/* <td></td> */}
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
                      Edit
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer>
        <PagesResults
          pageSize={pageSize}
          currentPage={pageIndex}
          totalCount={totalCount}
        />

        <Pagination
          currentPage={pageIndex}
          lastPage={totalPages}
          onPageChange={onPageChange}
        />
      </footer>
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

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (pageInde: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  onPageChange,
}) => {
  const RenderFirstButton = () => {
    if (currentPage > 3) {
      return (
        <>
          <button className={styles.pageButton} onClick={() => onPageChange(1)}>
            <strong>1</strong>
          </button>
          <span>
            <strong>...</strong>
          </span>
        </>
      );
    }

    return (
      <button
        className={`${styles.pageButton} ${
          currentPage === 1 ? styles.active : ""
        }`}
        onClick={() => onPageChange(1)}
      >
        <strong>1</strong>
      </button>
    );
  };

  const RenderLastButton = () => {
    if (lastPage === 1) return null;
    if (lastPage - currentPage > 2) {
      return (
        <>
          <span>
            <strong>...</strong>
          </span>
          <button
            className={styles.pageButton}
            onClick={() => onPageChange(lastPage)}
          >
            <strong>{lastPage}</strong>
          </button>
        </>
      );
    }
    return (
      <button
        className={`${styles.pageButton} ${
          currentPage === lastPage ? styles.active : ""
        }`}
        onClick={() => onPageChange(lastPage)}
      >
        <strong>{lastPage}</strong>
      </button>
    );
  };

  const RenderMiddleButtons = () => {
    if (lastPage === 1) return null;

    if (lastPage === 2) {
      return null;
    }
    if (lastPage - currentPage === 0) {
      return (
        <button
          className={styles.pageButton}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <strong>{currentPage - 1}</strong>
        </button>
      );
    }
    if (lastPage - currentPage === 1 && lastPage > 3) {
      return (
        <>
          <button
            className={styles.pageButton}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <strong>{currentPage - 1}</strong>
          </button>
          <button
            className={`${styles.pageButton} ${styles.active}`}
            onClick={() => onPageChange(currentPage)}
          >
            <strong>{currentPage}</strong>
          </button>
        </>
      );
    }
    if (currentPage > 2) {
      return (
        <>
          <button
            className={styles.pageButton}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <strong>{currentPage - 1}</strong>
          </button>
          <button
            className={`${styles.pageButton} ${styles.active}`}
            onClick={() => onPageChange(currentPage)}
          >
            <strong>{currentPage}</strong>
          </button>

          <button
            className={styles.pageButton}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <strong>{currentPage + 1}</strong>
          </button>
        </>
      );
    }
    if (currentPage > 1 && lastPage > 3) {
      return (
        <>
          <button
            className={`${styles.pageButton} ${styles.active}`}
            onClick={() => onPageChange(currentPage)}
          >
            <strong>{currentPage}</strong>
          </button>

          <button
            className={styles.pageButton}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <strong>{currentPage + 1}</strong>
          </button>
        </>
      );
    }
    if (currentPage > 1 && lastPage === 3) {
      return (
        <button
          className={`${styles.pageButton} ${styles.active}`}
          onClick={() => onPageChange(currentPage)}
        >
          <strong>{currentPage}</strong>
        </button>
      );
    }
    return (
      <button
        className={styles.pageButton}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <strong>{currentPage + 1}</strong>
      </button>
    );
  };

  return (
    <div className={styles.pageCount}>
      <RenderFirstButton />
      <RenderMiddleButtons />
      <RenderLastButton />
    </div>
  );
};
