import ClubsSVG from '../../assets/Clubs.svg';
import DiamondSVG from '../../assets/Diamonds.svg';
import HeartSVG from '../../assets/Hearts.svg';
import SpadeSVG from '../../assets/Spades.svg';
import { CardNumber, CardKind, CardKindColorCSS } from '../../types';

export const errorMessages = {
  cardKind: 'Type parameter needs to be one of CardType enums.',
  cardNumber: 'Card number can not be more than 13',
};

export const getCardColor = (type: CardKind): CardKindColorCSS => {
  if ([CardKind.CLUBS, CardKind.SPADES].includes(type)) return CardKindColorCSS.BLACK;
  if ([CardKind.DIAMONDS, CardKind.HEARTS].includes(type)) return CardKindColorCSS.RED;
  throw new Error(errorMessages.cardKind);
};

export const getCardText = (number: CardNumber): string => {
  switch (number) {
    case 1:
      return 'Ace';
    case 11:
      return 'Jack';
    case 12:
      return 'Queen';
    case 13:
      return 'King';
    default:
      if (number > 13) throw new Error(errorMessages.cardNumber);
      return number.toString();
  }
};

export const getCardSymbol = (type: CardKind): string => {
  switch (type) {
    case CardKind.CLUBS:
      return ClubsSVG;
    case CardKind.DIAMONDS:
      return DiamondSVG;
    case CardKind.HEARTS:
      return HeartSVG;
    case CardKind.SPADES:
      return SpadeSVG;
    default:
      throw new Error(errorMessages.cardKind);
  }
};
