import React from "react";
import { useFormContext } from "react-hook-form";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: {
    value: string;
    label: string;
  }[];
}

export function Select(props: SelectProps) {
  const { register, getValues, setValue } = useFormContext();
  const currentValue = getValues(props.name);

  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(props.name, event.target.value);
  };

  return (
    <>
      <select
        id={props.name}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2"
        {...register(props.name)}
        value={currentValue}
        onChange={handleOnChange}
      >
        <option value="">Selecione uma opção</option> {/* Opção vazia */}
        {props.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/*       Exibe o valor atual
      <p>{currentValue}</p>   */}
    </>
  );
}
