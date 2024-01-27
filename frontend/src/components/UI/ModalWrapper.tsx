import React from "react";
import { FC, ReactElement, useEffect, useMemo, RefObject } from "react";
import ReactDOM from "react-dom";
import styles from "./ModalWrapper.module.scss";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

interface ModalWrapperProps {
  children: ReactElement;
  toggleModal?: () => void;
  ref?: RefObject<HTMLDivElement>;
}

const ModalWrapper: FC<ModalWrapperProps> = ({ children, toggleModal }) => {
  const containerElement: HTMLElement | null = useMemo(
    () => document.getElementById("modal-container"),
    []
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    // return () => {
    //   document.body.style.removeProperty("overflow");
    // };
  }, []);

  if (!containerElement) {
    return null;
  }
  return ReactDOM.createPortal(
    <div onClick={toggleModal} className={styles.modal}>
      <div onClick={(e) => e.stopPropagation()} className={styles.content}>
        {children}
      </div>
      {/* <CloseIcon className={styles.closeIcon} onClick={toggleModal} /> */}
    </div>,
    containerElement
  );
};

export default ModalWrapper;
