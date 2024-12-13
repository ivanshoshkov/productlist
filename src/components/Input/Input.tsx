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
  type,
  value,
  placeholder,
  onChange,
}: InputProps): JSX.Element => {
  return (
    <div className={styles["input"]}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default memo(Input);
