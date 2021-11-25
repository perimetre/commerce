import { FC } from 'react';
import cn from 'classnames';

import useAddCard from '@framework/customer/card/use-add-item';
import { Button, Text } from '@components/ui';
import { State, useUI } from '@components/ui/context';
import SidebarLayout from '@components/common/SidebarLayout';

import s from './PaymentMethodView.module.css';

interface ExtendedUI extends State {
  setSidebarView: (arg: string) => void;
}

interface Form extends HTMLFormElement {
  cardHolder: HTMLInputElement;
  cardNumber: HTMLInputElement;
  cardExpireDate: HTMLInputElement;
  cardCvc: HTMLInputElement;
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  company: HTMLInputElement;
  streetNumber: HTMLInputElement;
  zipCode: HTMLInputElement;
  city: HTMLInputElement;
  country: HTMLSelectElement;
}

const PaymentMethodView: FC = () => {
  const { setSidebarView } = useUI() as ExtendedUI;
  const addCard = useAddCard();

  async function handleSubmit(event: React.ChangeEvent<Form>) {
    event.preventDefault();

    await addCard({
      cardHolder: event.target.cardHolder.value,
      cardNumber: event.target.cardNumber.value,
      cardExpireDate: event.target.cardExpireDate.value,
      cardCvc: event.target.cardCvc.value,
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      company: event.target.company.value,
      streetNumber: event.target.streetNumber.value,
      zipCode: event.target.zipCode.value,
      city: event.target.city.value,
      country: event.target.country.value
    });

    setSidebarView('CHECKOUT_VIEW');
  }

  return (
    <form className="h-full" onSubmit={handleSubmit}>
      <SidebarLayout handleBack={() => setSidebarView('CHECKOUT_VIEW')}>
        <div className="flex-1 px-4 sm:px-6">
          <Text variant="sectionHeading"> Payment Method</Text>
          <div>
            <div className={s.fieldset}>
              <label htmlFor="cardHolderInput" className={s.label}>
                Cardholder Name
              </label>
              <input id="cardHolderInput" name="cardHolder" className={s.input} />
            </div>
            <div className="grid gap-3 grid-flow-row grid-cols-12">
              <div className={cn(s.fieldset, 'col-span-7')}>
                <label htmlFor="cardNumberInput" className={s.label}>
                  Card Number
                </label>
                <input id="cardNumberInput" name="cardNumber" className={s.input} />
              </div>
              <div className={cn(s.fieldset, 'col-span-3')}>
                <label htmlFor="cardExpireDateInput" className={s.label}>
                  Expires
                </label>
                <input id="cardExpireDateInput" name="cardExpireDate" className={s.input} placeholder="MM/YY" />
              </div>
              <div className={cn(s.fieldset, 'col-span-2')}>
                <label htmlFor="cardCvcInput" className={s.label}>
                  CVC
                </label>
                <input id="cardCvcInput" name="cardCvc" className={s.input} />
              </div>
            </div>
            <hr className="my-6 border-accent-2" />
            <div className="grid gap-3 grid-flow-row grid-cols-12">
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label htmlFor="firstNameInput" className={s.label}>
                  First Name
                </label>
                <input id="firstNameInput" name="firstName" className={s.input} />
              </div>
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label htmlFor="lastNameInput" className={s.label}>
                  Last Name
                </label>
                <input id="lastNameInput" name="lastName" className={s.input} />
              </div>
            </div>
            <div className={s.fieldset}>
              <label htmlFor="companyInput" className={s.label}>
                Company (Optional)
              </label>
              <input id="companyInput" name="company" className={s.input} />
            </div>
            <div className={s.fieldset}>
              <label htmlFor="streetNumberInput" className={s.label}>
                Street and House Number
              </label>
              <input id="streetNumberInput" name="streetNumber" className={s.input} />
            </div>
            <div className={s.fieldset}>
              <label htmlFor="apartmentInput" className={s.label}>
                Apartment, Suite, Etc. (Optional)
              </label>
              <input id="apartmentInput" className={s.input} name="apartment" />
            </div>
            <div className="grid gap-3 grid-flow-row grid-cols-12">
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label htmlFor="zipCodeInput" className={s.label}>
                  Postal Code
                </label>
                <input id="zipCodeInput" name="zipCode" className={s.input} />
              </div>
              <div className={cn(s.fieldset, 'col-span-6')}>
                <label htmlFor="cityInput" className={s.label}>
                  City
                </label>
                <input id="cityInput" name="city" className={s.input} />
              </div>
            </div>
            <div className={s.fieldset}>
              <label htmlFor="countryInput" className={s.label}>
                Country/Region
              </label>
              <select id="countryInput" name="country" className={s.select}>
                <option>Hong Kong</option>
              </select>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 left-0 right-0 z-20 w-full px-6 py-12 border-t bg-accent-0 border-accent-2">
          <Button type="submit" width="100%" variant="ghost">
            Continue
          </Button>
        </div>
      </SidebarLayout>
    </form>
  );
};

export default PaymentMethodView;
