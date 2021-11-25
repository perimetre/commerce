import cn from 'classnames';
import React, { FC, ReactChild, ReactNode } from 'react';

interface ContainerProps {
  className?: string;
  children?: ReactChild | ReactNode;
  el?: HTMLElement;
  clean?: boolean;
}

const Container: FC<ContainerProps> = ({ children, className, el = 'div', clean }) => {
  const rootClassName = cn(className, {
    'mx-auto max-w-8xl px-6': !clean
  });

  const Component = el as React.ComponentType<React.HTMLAttributes<HTMLDivElement>> | string;

  return <Component className={rootClassName}>{children}</Component>;
};

export default Container;
