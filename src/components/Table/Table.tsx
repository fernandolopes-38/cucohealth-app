import React from "react";
import { Link } from "react-router-dom";
import { formatDateLong } from "../../utils/helpers.utils";
import { Button } from "../Button";
import { EditIcon } from "../Icons/EditIcon";
import styles from "./styles.module.scss";

interface TableProps {
  data: any[] | undefined;
  totalPages: number;
  pageLimit: number;
  pageIndex: number;
}
export const Table: React.FC<TableProps> = ({
  data,
  totalPages,
  pageLimit,
  pageIndex,
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
            <th></th>
            <th>NOME</th>
            <th>DATA DE NASCIMENTO</th>
            <th>TELEFONE</th>
            <th className={styles.flex__center}></th>
          </tr>
        </thead>
        <tbody>
          {"loading" === "loading" && !data?.length ? (
            <tr>
              {/* <td className={styles.skeleton__container}>
                <Skeleton width={200} height={24} />
              </td>
              <td className={styles.skeleton__container}>
                <Skeleton width={300} height={24} />
              </td>
              <td className={styles.skeleton__container}>
                <Skeleton width={100} height={24} />
              </td>
              <td className={styles.skeleton__container}>
                <Skeleton width={150} height={24} />
              </td>
              <td className={styles.skeleton__container}>
                <Skeleton height={24} />
              </td>
              <td className={styles.skeleton__container}>
                <Skeleton height={24} />
              </td> */}
            </tr>
          ) : (
            !data?.length && (
              <tr>
                <td colSpan={6}>No employees....</td>
              </tr>
            )
          )}
          {data?.map((datum) => (
            <tr key={datum.id}>
              <td></td>
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
        <div>
          <span>
            <strong>
              {pageLimit * (pageIndex - 1) + 1} -{" "}
              {pageLimit + (pageIndex - 1) * pageLimit}
            </strong>{" "}
            de <strong>{totalPages}</strong>
          </span>
        </div>

        <div className={styles.pageCount}>
          <span>
            <strong>{pageIndex}</strong>
          </span>
        </div>
      </footer>
    </div>
  );
};

interface PagesResultsProps {
  size: number;
  index: number;
  total: number;
}
const PagesResults: React.FC<PagesResultsProps> = ({ size, index, total }) => {
  return <></>;
};
const Pagination = () => {};
