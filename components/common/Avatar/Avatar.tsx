import { FC, ReactElement, ReactNode, useRef } from 'react';
import { useUserAvatar } from '@lib/hooks/useUserAvatar';

interface Props {
  className?: string;
  children?: ReactElement | ReactNode;
}

const Avatar: FC<Props> = ({}) => {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { userAvatar } = useUserAvatar();

  return (
    <div
      ref={ref}
      style={{ backgroundImage: userAvatar }}
      className="inline-block w-8 h-8 border-2 rounded-full border-primary hover:border-secondary focus:border-secondary transition-colors ease-linear"
    >
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  );
};

export default Avatar;
