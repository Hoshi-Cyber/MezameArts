import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        {children}
        <button className="mt-4 text-blue-600 underline" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
