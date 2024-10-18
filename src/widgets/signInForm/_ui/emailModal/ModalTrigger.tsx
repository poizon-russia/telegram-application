'use client';
import { useState } from 'react';

import { Button } from '@/src/shared/ui/button';
import MyTooltip from '@/src/shared/ui/myTooltip';

import Modal from './Modal';
import css from './modal.module.scss';

const ModalTrigger: React.FC = () => {
  const [isOpenModal, setIsModal] = useState<boolean>(false);
  return (
    <Modal open={isOpenModal} setIsOpen={setIsModal}>
      <div className={css.faq}>
        <Button className={css.loginByCode} variant={'ghost'}>
          Вход по Telegram-коду
        </Button>
        <MyTooltip>
          <div className={css.tooltip}>
            <h2>Как это работает?</h2>
            <p>
              Мы автоматически создаем для вас личный кабинет на основе номера телефона,
              который вы указали при оформлении заказа.
            </p>
            <p>
              Если вы не указывали пароль, вы можете войти в личный кабинет с
              помощью Telegram-кода.
            </p>
          </div>
        </MyTooltip>
      </div>
    </Modal>
  );
};

export default ModalTrigger;
