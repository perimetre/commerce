import { FC, useRef, useEffect, useCallback, ReactNode } from 'react';
import s from './Modal.module.css';
import FocusTrap from '@lib/focus-trap';
import { Cross } from '@components/icons';
import { disableBodyScroll, clearAllBodyScrollLocks, enableBodyScroll } from 'body-scroll-lock';
interface ModalProps {
  className?: string;
  children?: ReactNode;
  onClose: () => void;
  onEnter?: () => void;
}

const Modal: FC<ModalProps> = ({ children, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const modal = ref.current;

    if (modal) {
      disableBodyScroll(modal, { reserveScrollBarGap: true });
      window.addEventListener('keydown', handleKey);
    }
    return () => {
      if (modal) {
        enableBodyScroll(modal);
      }
      clearAllBodyScrollLocks();
      window.removeEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  return (
    <div className={s.root}>
      <div className={s.modal} role="dialog" ref={ref}>
        <button onClick={() => onClose()} aria-label="Close panel" className={s.close}>
          <Cross className="w-6 h-6" />
        </button>
        <FocusTrap focusFirst>{children}</FocusTrap>
      </div>
    </div>
  );
};

export default Modal;
