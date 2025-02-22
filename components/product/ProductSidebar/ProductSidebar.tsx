import s from './ProductSidebar.module.css';
import { useAddItem } from '@framework/cart';
import { FC, useEffect, useState } from 'react';
import { ProductOptions } from '@components/product';
import type { Product } from '@commerce/types/product';
import { Button, Text, Rating, Collapse, useUI } from '@components/ui';
import { getProductVariant, selectDefaultOptionFromProduct, SelectedOptions } from '../helpers';
import { State } from '@components/ui/context';

interface ProductSidebarProps {
  product: Product;
  className?: string;
}

interface ExtendedUI extends State {
  openSidebar: () => void;
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const addItem = useAddItem();
  const { openSidebar } = useUI() as ExtendedUI;
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions);
  }, [product]);

  const variant = getProductVariant(product, selectedOptions);
  const addToCart = async () => {
    setLoading(true);
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0].id)
      });
      openSidebar();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <Text className="w-full max-w-xl pb-4 break-words" html={product.descriptionHtml || product.description} />
      <div className="flex flex-row items-center justify-between">
        <Rating value={4} />
        <div className="pr-1 text-sm font-medium text-accent-6">36 reviews</div>
      </div>
      <div>
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label="Add to Cart"
            type="button"
            className={s.button}
            onClick={addToCart}
            loading={loading}
            disabled={variant?.availableForSale === false}
          >
            {variant?.availableForSale === false ? 'Not Available' : 'Add To Cart'}
          </Button>
        )}
      </div>
      <div className="mt-6">
        <Collapse title="Care">This is a limited edition production run. Printing starts when the drop ends.</Collapse>
        <Collapse title="Details">
          This is a limited edition production run. Printing starts when the drop ends. Reminder: Bad Boys For Life.
          Shipping may take 10+ days due to COVID-19.
        </Collapse>
      </div>
    </div>
  );
};

export default ProductSidebar;
