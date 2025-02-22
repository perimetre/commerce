import { FC, ReactChild, ReactElement, ReactNode, useEffect, useRef } from 'react';
import s from './Sidebar.module.css';
import cn from 'classnames';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

interface SidebarProps {
  children: ReactChild | ReactElement | ReactNode;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ children, onClose }) => {
  const sidebarRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const contentRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const onKeyDownSidebar = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.focus();
    }

    const contentElement = contentRef.current;

    if (contentElement) {
      disableBodyScroll(contentElement, { reserveScrollBarGap: true });
    }

    return () => {
      if (contentElement) enableBodyScroll(contentElement);
      clearAllBodyScrollLocks();
    };
  }, []);

  return (
    <div className={cn(s.root)} ref={sidebarRef} onKeyDown={onKeyDownSidebar} tabIndex={0} role="button">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={s.backdrop}
          onClick={onClose}
          onKeyDown={(e) => e.key == 'Enter' && onClose()}
          tabIndex={0}
          role="button"
        />
        <section className="absolute inset-y-0 right-0 flex max-w-full pl-10 outline-none">
          <div className="w-full h-full md:w-screen md:max-w-md">
            <div className={s.sidebar} ref={contentRef}>
              {children}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sidebar;
