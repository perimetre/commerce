import { ChangeEvent, useEffect, useState } from 'react';
import cn from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import s from './CartItem.module.css';
// import { Trash, Plus, Minus, Cross } from '@components/icons';
import { State, useUI } from '@components/ui/context';
import type { LineItem, SelectedOption } from '@commerce/types/cart';
import usePrice from '@framework/product/use-price';
import useUpdateItem from '@framework/cart/use-update-item';
import useRemoveItem from '@framework/cart/use-remove-item';
import Quantity from '@components/ui/Quantity';

interface ExtendedUI extends State {
  closeSidebarIfPresent: () => void;
}

const CartItem = ({
  item,
  variant = 'default',
  currencyCode,
  ...rest
}: {
  variant?: 'default' | 'display';
  item: LineItem;
  currencyCode: string;
}) => {
  const { closeSidebarIfPresent } = useUI() as ExtendedUI;
  const [removing, setRemoving] = useState(false);
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const removeItem = useRemoveItem();
  const updateItem = useUpdateItem({ item });

  const { price } = usePrice({
    amount: item.variant.price * item.quantity,
    baseAmount: item.variant.listPrice * item.quantity,
    currencyCode
  });

  const handleChange = async ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(value));
    await updateItem({ quantity: Number(value) });
  };

  const increaseQuantity = async (n = 1) => {
    const val = Number(quantity) + n;
    setQuantity(val);
    await updateItem({ quantity: val });
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      await removeItem(item);
    } catch (error) {
      setRemoving(false);
    }
  };

  // TODO: Add a type for this
  const options = (item as LineItem).options;

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity);
    }
    // TODO: currently not including quantity in deps is intended, but we should
    // do this differently as it could break easily
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.quantity]);

  return (
    <li
      className={cn(s.root, {
        'opacity-50 pointer-events-none': removing
      })}
      {...rest}
    >
      <div className="flex flex-row py-4 space-x-4">
        <div className="relative z-0 w-16 h-16 overflow-hidden cursor-pointer bg-violet">
          <Link href={`/product/${item.path}`}>
            <a>
              <Image
                onClick={() => closeSidebarIfPresent()}
                className={s.productImage}
                width={150}
                height={150}
                src={item.variant?.image?.url || ''}
                alt={item.variant?.image?.url || ''}
                unoptimized
              />
            </a>
          </Link>
        </div>
        <div className="flex flex-col flex-1 text-base">
          <Link href={`/product/${item.path}`}>
            <a>
              <span
                className={s.productName}
                onClick={() => closeSidebarIfPresent()}
                onKeyDown={(e) => e.key == 'Enter' && closeSidebarIfPresent()}
                role="button"
                tabIndex={0}
              >
                {item.name}
              </span>
            </a>
          </Link>
          {options && options.length > 0 && (
            <div className="flex items-center pb-1">
              {options.map((option: SelectedOption, i: number) => (
                <div
                  key={`${item.id}-${option.name}`}
                  className="inline-flex items-center justify-center text-sm font-semibold text-accent-7"
                >
                  {option.name}
                  {option.name === 'Color' ? (
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 p-1 mx-2 overflow-hidden bg-transparent border rounded-full text-accent-9"
                      style={{
                        backgroundColor: `${option.value}`
                      }}
                    ></span>
                  ) : (
                    <span className="inline-flex items-center justify-center h-5 p-1 mx-2 overflow-hidden bg-transparent border rounded-full text-accent-9">
                      {option.value}
                    </span>
                  )}
                  {i === options.length - 1 ? '' : <span className="mr-3" />}
                </div>
              ))}
            </div>
          )}
          {variant === 'display' && <div className="text-sm tracking-wider">{quantity}x</div>}
        </div>
        <div className="flex flex-col justify-between text-sm space-y-2">
          <span>{price}</span>
        </div>
      </div>
      {variant === 'default' && (
        <Quantity
          value={quantity}
          handleRemove={handleRemove}
          handleChange={handleChange}
          increase={() => increaseQuantity(1)}
          decrease={() => increaseQuantity(-1)}
        />
      )}
    </li>
  );
};

export default CartItem;
