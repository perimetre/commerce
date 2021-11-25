import React, { useEffect, ReactChild, ReactElement, MutableRefObject, ReactNode } from 'react';
import { tabbable } from 'tabbable';

interface Props {
  children: ReactNode | ReactChild | ReactElement;
  focusFirst?: boolean;
}

export default function FocusTrap({ children, focusFirst = false }: Props) {
  const root = React.useRef() as MutableRefObject<HTMLElement>;
  const anchor = React.useRef(document.activeElement) as MutableRefObject<HTMLElement>;

  const returnFocus = () => {
    // Returns focus to the last focused element prior to trap.
    if (anchor) {
      anchor.current?.focus();
    }
  };

  const selectFirstFocusableEl = () => {
    // Try to find focusable elements, if match then focus
    // Up to 6 seconds of load time threshold
    let match = false;
    const end = 60; // Try to find match at least n times
    let i = 0;
    const timer = setInterval(() => {
      if (!match !== i > end) {
        match = !!tabbable(root.current).length;
        if (match) {
          // Attempt to focus the first el
          tabbable(root.current)[0].focus();
        }
        i = i + 1;
      } else {
        // Clear interval after n attempts
        clearInterval(timer);
      }
    }, 100);
  };

  useEffect(() => {
    const trapFocus = () => {
      // Focus the container element
      if (root.current) {
        root.current.focus();
        if (focusFirst) {
          selectFirstFocusableEl();
        }
      }
    };

    setTimeout(trapFocus, 20);
    return () => {
      returnFocus();
    };
  }, [root, children, focusFirst]);

  return React.createElement(
    'div',
    {
      ref: root,
      className: 'outline-none focus-trap',
      tabIndex: -1
    },
    children
  );
}
