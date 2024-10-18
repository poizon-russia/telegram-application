import SignInForm from '@/src/widgets/signInForm/signInForm';
import PromoBanner from '@/src/widgets/promoBanner/PromoBanner';

import css from './styles.module.scss';

const SignInPage: React.FC = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.rightItems}>
        <PromoBanner />
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPage;
