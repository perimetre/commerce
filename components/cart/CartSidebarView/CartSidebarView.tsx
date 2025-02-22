import cn from 'classnames';
import Link from 'next/link';
import { FC } from 'react';
import s from './CartSidebarView.module.css';
import CartItem from '../CartItem';
import { Button, Text } from '@components/ui';
import { State, useUI } from '@components/ui/context';
import { Bag, Cross, Check } from '@components/icons';
import useCart from '@framework/cart/use-cart';
import usePrice from '@framework/product/use-price';
import SidebarLayout from '@components/common/SidebarLayout';
import { LineItem } from '@commerce/types/cart';

interface ExtendedUI extends State {
  closeSidebar: () => void;
  setSidebarView: (arg: string) => void;
}

const CartSidebarView: FC = () => {
  const { closeSidebar, setSidebarView } = useUI() as ExtendedUI;
  const { data, isLoading, isEmpty } = useCart();

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code
    }
  );
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code
    }
  );
  const handleClose = () => closeSidebar();
  const goToCheckout = () => setSidebarView('CHECKOUT_VIEW');

  const error = null;
  const success = null;

  return (
    <SidebarLayout
      className={cn({
        [s.empty]: error || success || isLoading || isEmpty
      })}
      handleClose={handleClose}
    >
      {isLoading || isEmpty ? (
        <div className="flex flex-col items-center justify-center flex-1 px-4">
          <span className="flex items-center justify-center w-16 h-16 p-12 border border-dashed rounded-full border-primary bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">Your cart is empty</h2>
          <p className="px-10 pt-2 text-center text-accent-3">
            Biscuit oat cake wafer icing ice cream tiramisu pudding cupcake.
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center flex-1 px-4">
          <span className="flex items-center justify-center w-16 h-16 border border-white rounded-full">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex flex-col items-center justify-center flex-1 px-4">
          <span className="flex items-center justify-center w-16 h-16 border border-white rounded-full">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">Thank you for your order.</h2>
        </div>
      ) : (
        <>
          <div className="flex-1 px-4 sm:px-6">
            <Link href="/cart">
              <a>
                <Text variant="sectionHeading" onClick={handleClose}>
                  My Cart
                </Text>
              </a>
            </Link>
            <ul className={s.lineItemsList}>
              {data.lineItems.map((item: LineItem) => (
                <CartItem key={item.id} item={item} currencyCode={data.currency.code} />
              ))}
            </ul>
          </div>

          <div className="sticky bottom-0 left-0 right-0 z-20 flex-shrink-0 w-full px-6 py-6 text-sm border-t sm:px-6 bg-accent-0">
            <ul className="pb-2">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Shipping</span>
                <span className="font-bold tracking-wide">FREE</span>
              </li>
            </ul>
            <div className="flex justify-between py-3 mb-2 font-bold border-t border-accent-2">
              <span>Total</span>
              <span>{total}</span>
            </div>
            <div>
              {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED ? (
                <Button Component="a" width="100%" onClick={goToCheckout}>
                  Proceed to Checkout ({total})
                </Button>
              ) : (
                <Button href="/checkout" Component="a" width="100%">
                  Proceed to Checkout
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </SidebarLayout>
  );
};

export default CartSidebarView;
