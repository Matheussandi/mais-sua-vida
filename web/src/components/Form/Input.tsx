import { InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function Input(props: InputProps) {
  const { register } = useFormContext();

  return (
    <input
      id={props.name}
      className="rounded-lg border border-gray-300 px-4 py-2"
      {...register(props.name)}
      {...props}
    />
  );
}
