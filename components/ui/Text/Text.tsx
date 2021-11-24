/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  FunctionComponent,
  JSXElementConstructor,
  CSSProperties,
  ReactElement
  // ComponentElement,
  // Component,
  // ReactComponentElement
} from 'react';
import cn from 'classnames';
import s from './Text.module.css';
import { JsxElement } from 'typescript';

interface TextProps {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  html?: string;
  onClick?: () => React.MouseEventHandler<HTMLElement> | void;
}

type Variant = 'heading' | 'body' | 'pageHeading' | 'sectionHeading';

const Text: FunctionComponent<TextProps> = ({ style, className = '', variant = 'body', children, html, onClick }) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<P> | string;
  } = {
    body: 'div',
    heading: 'h1',
    pageHeading: 'h1',
    sectionHeading: 'h2'
  };

  const Component:
    | JSXElementConstructor<JsxElement>
    | React.ReactElement<ReactElement>
    | React.ComponentType<any>
    | string = componentsMap[variant];

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html }
      }
    : {};

  return (
    <Component
      className={cn(
        s.root,
        {
          [s.body]: variant === 'body',
          [s.heading]: variant === 'heading',
          [s.pageHeading]: variant === 'pageHeading',
          [s.sectionHeading]: variant === 'sectionHeading'
        },
        className
      )}
      onClick={onClick}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  );
};

export default Text;
