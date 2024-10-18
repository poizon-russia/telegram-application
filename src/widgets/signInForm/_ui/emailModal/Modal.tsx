import { Dialog, DialogContent, DialogTrigger } from '@/src/shared/ui/dialog';

import css from './modal.module.scss';
import LoginByCode from '../forms/LoginByCode';

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = ({ open, setIsOpen, children }) => {
  return (
    <Dialog modal={true} open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={css.content}>
        <LoginByCode />
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
