import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
}

export function TextArea(props: TextAreaProps) {
  const { register } = useFormContext();

  return (
    <textarea
      id={props.name}
      className="rounded-lg border border-gray-300 px-4 py-2 resize-none"
      {...register(props.name)}
      {...props}
    />
  );
}
