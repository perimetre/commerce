import { FC } from 'react';
import s from './ShippingWidget.module.css';
import { ChevronRight, MapPin, Check } from '@components/icons';
// import cn from 'classnames';

interface ComponentProps {
  onClick?: () => void;
  isValid?: boolean;
}

const ShippingWidget: FC<ComponentProps> = ({ onClick, isValid }) => {
  /* Shipping Address
  Only available with checkout set to true -
  This means that the provider does offer checkout functionality. */
  return (
    <div onClick={onClick} onKeyDown={(e) => e.key == 'enter' && onClick} className={s.root} tabIndex={0} role="button">
      <div className="flex items-center flex-1">
        <MapPin className="flex w-5" />
        <span className="ml-5 text-sm font-medium text-center">Add Shipping Address</span>
        {/* <span>
          1046 Kearny Street.<br/>
          San Franssisco, California
        </span> */}
      </div>
      <div>{isValid ? <Check /> : <ChevronRight />}</div>
    </div>
  );
};

export default ShippingWidget;
