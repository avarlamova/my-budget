import React from "react";
import { FC, ReactElement, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import styles from "./ModalWrapper.module.scss";

interface ModalWrapperProps {
  children: ReactElement;
  toggleModal?: any;
}

const ModalWrapper: FC<ModalWrapperProps> = ({ children, toggleModal }) => {
  const containerElement: HTMLElement | null = useMemo(
    () => document.getElementById("modal-container"),
    []
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);

  if (!containerElement) {
    return null;
  }
  return ReactDOM.createPortal(
    <div onClick={toggleModal} className={styles.modal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.content}>
        {children}
      </div>
    </div>,
    containerElement
  );
};

export default ModalWrapper;
