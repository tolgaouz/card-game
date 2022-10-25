import clsx from 'clsx';
import React from 'react';
import { CardKind, CardNumber } from '../../types';
import { getCardText, getCardColor, getCardSymbol } from './utils';

interface CardProps extends React.HTMLProps<HTMLDivElement> {
  kind: CardKind;
  number: CardNumber;
}

const Card: React.FC<CardProps> = ({ kind, number, className, ...restProps }) => {
  const firstLetter = getCardText(number).slice(0)[0];
  const symbol = getCardSymbol(kind);
  const text = `${getCardText(number)} of ${kind}`;
  const color = getCardColor(kind);
  return (
    <div
      className={clsx(
        'bg-white rounded-lg md:rounded-2xl lg:rounded-3xl relative font-courier w-1/6 min-w-[103px] max-w-[192px] aspect-[2.2/3]',
        className
      )}
      {...restProps}
    >
      <div
        className={clsx(
          'font-bold leading-none relative w-fit text-4xl md:text-6xl lg:text-8xl pt-5 pl-5',
          color
        )}
        data-testid="card-text"
      >
        {firstLetter.toUpperCase()}
        <img
          className="absolute min-w-[20px] aspect-[1/1] max-w-[36px] w-1/2 right-0 lg:right-1 lg:-bottom-6"
          src={symbol}
          alt={text}
        />
      </div>
      <img
        data-testid="card-symbol"
        className="min-w-[48px] max-w-[90px] w-1/2 aspect-[1/1] absolute right-3.5 bottom-3.5 lg:right-6 lg:bottom-6"
        src={symbol}
        alt={text}
      />
    </div>
  );
};

export default Card;
