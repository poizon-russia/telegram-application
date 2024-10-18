import Link from 'next/link';

import { PUBLIC_URL } from '@/src/config/url.config';

import LogoIcon from './LogoIcon';

const Logotype: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <Link href={PUBLIC_URL.root()}>
      <LogoIcon {...props} />
    </Link>
  );
};

export default Logotype;
