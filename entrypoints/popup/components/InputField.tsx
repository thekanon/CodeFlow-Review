// entrypoints/popup/components/InputField.tsx
import { FC, ChangeEvent } from "react";
import "./InputField.scss";

export interface InputFieldProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  placeholder?: string;
  buttonLabel?: string;
  className?: string;
}

const InputField: FC<InputFieldProps> = ({
  value,
  onChange,
  onAdd,
  placeholder = "Enter text...",
  buttonLabel = "Add",
  className = "",
}) => {
  return (
    <div className={`input-field ${className}`}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button onClick={onAdd}>{buttonLabel}</button>
    </div>
  );
};

export default InputField;
