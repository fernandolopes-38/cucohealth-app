import React from "react";
import styles from "./styles.module.scss";

interface TablePaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (pageInde: number) => void;
}
export const TablePagination: React.FC<TablePaginationProps> = ({
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
    <div data-testid="clients-table-pagination" className={styles.pageCount}>
      <RenderFirstButton />
      <RenderMiddleButtons />
      <RenderLastButton />
    </div>
  );
};
