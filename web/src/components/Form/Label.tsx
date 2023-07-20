import { LabelHTMLAttributes } from "react";

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className="text-lg font-medium" {...props} />;
}