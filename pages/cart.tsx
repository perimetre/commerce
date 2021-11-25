import type { GetStaticPropsContext } from 'next';
import useCart from '@framework/cart/use-cart';
import usePrice from '@framework/product/use-price';
import commerce from '@lib/api/commerce';
import { Layout } from '@components/common';
import { Button, Text } from '@components/ui';
import { Bag, Cross, Check, MapPin, CreditCard } from '@components/icons';
import { CartItem } from '@components/cart';
import { LineItem } from '@commerce/types/cart';

export async function getStaticProps({ preview, locale, locales }: GetStaticPropsContext) {
  const config = { locale, locales };
  const pagesPromise = commerce.getAllPages({ config, preview });
  const siteInfoPromise = commerce.getSiteInfo({ config, preview });
  const { pages } = await pagesPromise;
  const { categories } = await siteInfoPromise;
  return {
    props: { pages, categories }
  };
}

export default function Cart() {
  const error = null;
  const success = null;
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

  return (
    <div className="w-full mx-auto grid lg:grid-cols-12 max-w-7xl">
      <div className="lg:col-span-8">
        {isLoading || isEmpty ? (
          <div className="flex flex-col items-center justify-center flex-1 px-12 py-24">
            <span className="flex items-center justify-center w-16 h-16 p-12 border border-dashed rounded-lg border-secondary bg-primary text-primary">
              <Bag className="absolute" />
            </span>
            <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">Your cart is empty</h2>
            <p className="px-10 pt-2 text-center text-accent-6">
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
          <div className="flex-1 px-4 sm:px-6">
            <Text variant="pageHeading">My Cart</Text>
            <Text variant="sectionHeading">Review your Order</Text>
            <ul className="py-6 border-b space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-accent-2 border-accent-2">
              {data?.lineItems.map((item: LineItem) => (
                <CartItem key={item.id} item={item} currencyCode={data?.currency.code} />
              ))}
            </ul>
            <div className="my-6">
              <Text>Before you leave, take a look at these items. We picked them just for you</Text>
              <div className="flex py-6 space-x-6">
                {[1, 2, 3, 4, 5, 6].map((x) => (
                  <div
                    key={x}
                    className="w-full h-24 border cursor-pointer border-accent-3 bg-accent-2 bg-opacity-50 transform hover:scale-110 duration-75"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="lg:col-span-4">
        <div className="flex-shrink-0 px-4 py-24 sm:px-6">
          {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED && (
            <>
              {/* Shipping Address */}
              {/* Only available with customCheckout set to true - Meaning that the provider does offer checkout functionality. */}
              <div className="flex items-center justify-center px-6 py-6 mb-4 text-center border cursor-pointer rounded-md border-accent-2 hover:border-accent-4">
                <div className="mr-5">
                  <MapPin />
                </div>
                <div className="text-sm font-medium text-center">
                  <span className="uppercase">+ Add Shipping Address</span>
                  {/* <span>
                    1046 Kearny Street.<br/>
                    San Franssisco, California
                  </span> */}
                </div>
              </div>
              {/* Payment Method */}
              {/* Only available with customCheckout set to true - Meaning that the provider does offer checkout functionality. */}
              <div className="flex items-center justify-center px-6 py-6 mb-4 text-center border cursor-pointer rounded-md border-accent-2 hover:border-accent-4">
                <div className="mr-5">
                  <CreditCard />
                </div>
                <div className="text-sm font-medium text-center">
                  <span className="uppercase">+ Add Payment Method</span>
                  {/* <span>VISA #### #### #### 2345</span> */}
                </div>
              </div>
            </>
          )}
          <div className="border-t border-accent-2">
            <ul className="py-3">
              <li className="flex justify-between py-1">
                <span>Subtotal</span>
                <span>{subTotal}</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </li>
              <li className="flex justify-between py-1">
                <span>Estimated Shipping</span>
                <span className="font-bold tracking-wide">FREE</span>
              </li>
            </ul>
            <div className="flex justify-between py-3 mb-10 font-bold border-t border-accent-2">
              <span>Total</span>
              <span>{total}</span>
            </div>
          </div>
          <div className="flex flex-row justify-end">
            <div className="w-full lg:w-72">
              {isEmpty ? (
                <Button href="/" Component="a" width="100%">
                  Continue Shopping
                </Button>
              ) : (
                <Button href="/checkout" Component="a" width="100%">
                  Proceed to Checkout
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Cart.Layout = Layout;
