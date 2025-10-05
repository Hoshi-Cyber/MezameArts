import { InputHTMLAttributes } from 'react';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="border rounded px-3 py-2 focus:outline-none focus-visible:ring-2 ring-offset-2 ring-blue-500"
    />
  );
}
