import { TransitionStatus } from 'react-transition-group';

export enum CardKind {
  CLUBS = 'Clubs',
  DIAMONDS = 'Diamonds',
  HEARTS = 'Hearts',
  SPADES = 'Spades',
}
/*
Denote non-number types with numbers as well,
1 --> Ace
11 --> Jack
12 --> Queen
13 --> King
*/
export type CardNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
export enum CardKindColorCSS {
  RED = 'text-redCard',
  BLACK = 'text-black',
}
export type Card = { kind: CardKind; number: CardNumber };

export type Ace = { number: 1; kind: CardKind };
export type King = { number: 13; kind: CardKind };
export type Queen = { number: 12; kind: CardKind };
export type Jack = { number: 11; kind: CardKind };

export interface CardGameState {
  deck: Card[];
  hand: Card[];
  acesInDeck: Ace[];
  finished?: boolean;
  userWon?: boolean;
}

export type TransitionStyle = Exclude<TransitionStatus, 'unmounted'>;
