import { ChangeEvent, memo } from "react";

import styles from "./Input.module.scss";

type InputProps = {
  label: string;
  name: string;
  type: string;
  value: string | number | undefined;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
}: InputProps): JSX.Element => {
  return (
    <div className={styles["input"]}>
      <label htmlFor={name}>{label}</label>
      <input
        placeholder={placeholder}
        value={value ?? ""}
        onChange={onChange}
        type={type}
        name={name}
        id={name}
      />
    </div>
  );
};

export default memo(Input);
