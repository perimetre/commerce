import { FC, useEffect, useState, useCallback } from 'react';
import { validate } from 'email-validator';
import { State, useUI } from '@components/ui/context';
import { Logo, Button, Input } from '@components/ui';

interface ExtendedUI extends State {
  setModalView: (arg: string) => void;
}

const ForgotPassword: FC = () => {
  // Form State
  const [email, setEmail] = useState('');
  const [loading] = useState(false);
  const [message] = useState('');
  const [dirty, setDirty] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const { setModalView } = useUI() as ExtendedUI;

  const handleResetPassword = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (!dirty && !disabled) {
      setDirty(true);
      handleValidation();
    }
  };

  const handleValidation = useCallback(() => {
    // Unable to send form unless fields are valid.
    if (dirty) {
      setDisabled(!validate(email));
    }
  }, [email, dirty]);

  useEffect(() => {
    handleValidation();
  }, [handleValidation]);

  return (
    <form onSubmit={handleResetPassword} className="flex flex-col justify-between p-3 w-80">
      <div className="flex justify-center pb-12 ">
        <Logo width="64px" height="64px" />
      </div>
      <div className="flex flex-col space-y-4">
        {message && <div className="p-3 border text-red border-red">{message}</div>}

        <Input placeholder="Email" onChange={setEmail} type="email" />
        <div className="flex flex-col w-full pt-2">
          <Button variant="slim" type="submit" loading={loading} disabled={disabled}>
            Recover Password
          </Button>
        </div>

        <span className="pt-3 text-sm text-center">
          <span className="text-accent-7">Do you have an account?</span>
          {` `}
          <a
            className="font-bold cursor-pointer text-accent-9 hover:underline"
            onClick={() => setModalView('LOGIN_VIEW')}
            onKeyDown={(e) => e.key == 'Enter' && setModalView('LOGIN_VIEW')}
            role="button"
            tabIndex={0}
          >
            Log In
          </a>
        </span>
      </div>
    </form>
  );
};

export default ForgotPassword;
