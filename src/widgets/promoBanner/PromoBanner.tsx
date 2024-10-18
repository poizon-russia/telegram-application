import Logotype from '@/src/shared/ui/assets/brand/logo/Logotype';

import css from './promoBanner.module.scss';

const PromoBanner: React.FC = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <Logotype width={165} height={75} />
        <h1>Добро пожаловать в Poizon Russia</h1>
      </div>
      <div>
        <p>Poizon на вашей стороне — доставка эксклюзивных товаров из Китая!</p>
      </div>
    </div>
  );
};

export default PromoBanner;
