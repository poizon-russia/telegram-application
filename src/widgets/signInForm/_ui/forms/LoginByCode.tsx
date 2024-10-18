'use client';

import { Undo2 } from 'lucide-react';

import Logotype from '@/src/shared/ui/assets/brand/logo/Logotype';
import { useAuthStore } from '@/src/features/auth/stores/useAuthStore';
import { Button } from '@/src/shared/ui/button';

import PhoneForm from './PhoneForm';
import CodeForm from './CodeForm';
import css from '../emailModal/modal.module.scss';

const LoginByCode: React.FC = () => {
  const { isCodeSent, userPhone, setCodeSent, resetAuthState } = useAuthStore();

  const handlePhoneSent = (phone: string) => {
    setCodeSent(true, phone);
  };

  const handleResetPhone = () => {
    resetAuthState();
  };

  return (
    <div className={css.content}>
      <div className={css.header}>
        {isCodeSent && (
          <Button
            variant={'ghost'}
            onClick={handleResetPhone}
            className={css.iconBtn}
          >
            <Undo2 className={css.undoIcon} />
          </Button>
        )}
        <div className={css.logoWrapper}>
          <Logotype />
        </div>
      </div>

      {!isCodeSent ? (
        <PhoneForm onPhoneSent={handlePhoneSent} />
      ) : (
        <CodeForm phone={userPhone} />
      )}
    </div>
  );
};

export default LoginByCode;
