import React, { FC } from 'react';
import { Cross, ChevronLeft } from '@components/icons';
import { UserNav } from '@components/common';
import cn from 'classnames';
import s from './SidebarLayout.module.css';

type ComponentProps = { className?: string } & (
  | { handleClose: () => void; handleBack?: never }
  | { handleBack: () => void; handleClose?: never }
);

const SidebarLayout: FC<ComponentProps> = ({ children, className, handleClose, handleBack }) => {
  return (
    <div className={cn(s.root, className)}>
      <header className={s.header}>
        {handleClose && (
          <button
            onClick={handleClose}
            aria-label="Close"
            className="flex items-center hover:text-accent-5 transition ease-in-out duration-150 focus:outline-none"
          >
            <Cross className="w-6 h-6 hover:text-accent-3" />
            <span className="ml-2 text-sm text-accent-7">Close</span>
          </button>
        )}
        {handleBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="flex items-center hover:text-accent-5 transition ease-in-out duration-150 focus:outline-none"
          >
            <ChevronLeft className="w-6 h-6 hover:text-accent-3" />
            <span className="ml-2 text-xs text-accent-7">Back</span>
          </button>
        )}
        <span className={s.nav}>
          <UserNav />
        </span>
      </header>
      <div className={s.container}>{children}</div>
    </div>
  );
};

export default SidebarLayout;
