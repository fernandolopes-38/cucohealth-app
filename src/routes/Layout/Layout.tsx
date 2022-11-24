import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";

export const Layout: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
};
