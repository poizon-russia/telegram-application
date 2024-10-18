import Image from 'next/image';

import questionMark from '@/public/assets/icons/questionMark.svg';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/src/shared/ui/tooltip';

type Props = {
  children: React.ReactNode;
  customTrigger?: React.ReactNode;
};

export default function MyTooltip({
  children,
  customTrigger,
}: Props): JSX.Element {
  return (
    <TooltipProvider>
      <Tooltip defaultOpen={false}>
        <TooltipTrigger>
          {customTrigger ? (
            customTrigger
          ) : (
            <Image
              src={questionMark}
              alt="Question mark"
              width={18}
              height={18}
            />
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>{children}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
