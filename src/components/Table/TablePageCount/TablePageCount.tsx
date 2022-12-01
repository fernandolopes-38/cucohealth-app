import React from "react";
import styles from "./styles.module.scss";

interface TablePageCountProps {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}
export const TablePageCount: React.FC<TablePageCountProps> = ({
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
