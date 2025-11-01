import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import {
  ToastProvider as RadixToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from './toast';

const ToastContext = createContext({ toast: () => {} });

const AUTO_DISMISS_MS = 4000;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timeouts = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((state) => state.filter((toast) => toast.id !== id));
    const timeoutId = timeouts.current.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeouts.current.delete(id);
    }
  }, []);

  const toast = useCallback((toastData) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((state) => [...state, { id, ...toastData }]);

    const timeoutId = setTimeout(() => {
      dismiss(id);
    }, AUTO_DISMISS_MS);

    timeouts.current.set(id, timeoutId);

    return {
      id,
      dismiss: () => dismiss(id),
    };
  }, [dismiss]);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <RadixToastProvider swipeDirection="right">
      <ToastContext.Provider value={value}>
        {children}
        <ToastViewport />
        {toasts.map((toastItem) => (
          <Toast
            key={toastItem.id}
            onOpenChange={(open) => {
              if (!open) dismiss(toastItem.id);
            }}
          >
            <div className="grid gap-1">
              {toastItem.title && <ToastTitle>{toastItem.title}</ToastTitle>}
              {toastItem.description && (
                <ToastDescription>{toastItem.description}</ToastDescription>
              )}
            </div>
            <ToastClose />
          </Toast>
        ))}
      </ToastContext.Provider>
    </RadixToastProvider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
