import { FC } from 'react';
import s from './PaymentWidget.module.css';
import { ChevronRight, CreditCard, Check } from '@components/icons';

interface ComponentProps {
  onClick?: () => void;
  isValid?: boolean;
}

const PaymentWidget: FC<ComponentProps> = ({ onClick, isValid }) => {
  /* Shipping Address
  Only available with checkout set to true -
  This means that the provider does offer checkout functionality. */
  return (
    <div onClick={onClick} onKeyDown={(e) => e.key == 'Enter' && onClick} role="button" className={s.root} tabIndex={0}>
      <div className="flex items-center flex-1">
        <CreditCard className="flex w-5" />
        <span className="ml-5 text-sm font-medium text-center">Add Payment Method</span>
        {/* <span>VISA #### #### #### 2345</span> */}
      </div>
      <div>{isValid ? <Check /> : <ChevronRight />}</div>
    </div>
  );
};

export default PaymentWidget;
