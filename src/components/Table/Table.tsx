import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectUsersFetchStatus } from "../../store/usersSlice";
import { User } from "../../types";
import { Button } from "../Button";
import styles from "./styles.module.scss";

interface TableProps {
  data: any[] | undefined;
}
export const Table: React.FC<TableProps> = ({ data }) => {
  // const fetchStatus = useAppSelector(selectUsersFetchStatus);
  // const dispatch = useAppDispatch();

  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [currentEmployee, setCurrentEmployee] = useState<User>();

  // const handleDeleteClick = (employee: User) => {
  //   setCurrentEmployee(employee);
  //   setIsDeleteModalOpen(true);
  // };

  // const handleEditClick = async (employee: User) => {
  //   setCurrentEmployee(employee);
  //   setIsEditModalOpen(true);
  // };

  // const handleEditEmployee = async (data: FormData) => {
  //   await dispatch(updateUser({ userId: currentEmployee!._id, user: data }));
  //   setIsEditModalOpen(false);
  // };
  // const handleDeleteEmployee = () => {
  //   dispatch(deleteUser(currentEmployee!._id));
  //   setIsDeleteModalOpen(false);
  // };

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
                <p>{datum.name}</p>
                <p>{datum.cpf}</p>
              </td>
              <td>{datum.birthdate}</td>
              <td>{datum.phone}</td>
              <td>
                <div className={styles.flex__center}>
                  <Link to={`/client-form/${datum.id}`}>
                    <Button
                      theme="success"
                      // onClick={() => handleEditClick(datum)}
                    >
                      Edit
                    </Button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div></div>
    </div>
  );
};
