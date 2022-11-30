import React from "react";
import styles from "./styles.module.scss";

interface SkeletonProps {
  width?: number | string;
  height?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ width, height }) => {
  return <div className={styles.container} style={{ width, height }} />;
};
