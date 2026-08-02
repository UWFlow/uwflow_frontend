import { useEffect, useRef } from 'react';

// Lets keyboard users dismiss an open dropdown with Escape, matching the
// pointer-only backdrop click. The handler is kept in a ref so callers don't
// have to memoize it just to stop this effect from rebinding every render.
const useEscapeToClose = (open: boolean, onClose: () => void) => {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open]);
};

export default useEscapeToClose;
