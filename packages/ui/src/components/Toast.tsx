import { ReactNode } from 'react';

interface ToastProps {
  show: boolean;
  children: ReactNode;
}

export function Toast({ show, children }: ToastProps) {
  return show ? (
    <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded">
      {children}
    </div>
  ) : null;
}
