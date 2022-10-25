import sampleSize from 'lodash/sampleSize';
import shuffle from 'lodash/shuffle';
import React from 'react';
import { CardKind, Card as CardT, Ace, CardGameState, CardNumber } from '../types';

enum CardGameActionType {
  DEAL = 'DEAL',
  RESET = 'RESET',
}

interface CardGameAction {
  type: CardGameActionType;
}

export const generateDeck = (): CardT[] => {
  const deck = [CardKind.CLUBS, CardKind.DIAMONDS, CardKind.HEARTS, CardKind.SPADES]
    .map((val) => {
      return [...new Array(13)].map((_, idx) => ({ kind: val, number: (idx + 1) as CardNumber }));
    })
    .flat();
  return deck;
};

export const getAces = (cards: CardT[]): Ace[] => {
  return cards.filter((card) => card.number === 1) as Ace[];
};

const dealFromDeck = (deck: CardT[]): CardGameState => {
  const dealt = sampleSize(deck, Math.min(5, deck.length));
  const newDeck = deck.filter((card) => {
    return !dealt.includes(card);
  });
  return {
    deck: newDeck,
    hand: dealt,
    acesInDeck: getAces(newDeck),
  };
};

const getInitialState = (): CardGameState => {
  return {
    ...dealFromDeck(shuffle(generateDeck())),
    finished: false,
    userWon: false,
  };
};

const useCardGame = () => {
  const reducer = (state: CardGameState, action: CardGameAction) => {
    switch (action.type) {
      case CardGameActionType.DEAL: {
        const newState = dealFromDeck(state.deck);
        if (newState.acesInDeck.length === 0) {
          newState.finished = true;
          const acesInHand = getAces(newState.hand);
          if (acesInHand.length > 0 && newState.deck.length === 0) {
            newState.userWon = true;
          }
        }
        return newState;
      }
      case CardGameActionType.RESET: {
        return getInitialState();
      }
      default:
        return state;
    }
  };

  const initialState = getInitialState();

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const deal = React.useCallback(() => dispatch({ type: CardGameActionType.DEAL }), []);

  const reset = React.useCallback(() => dispatch({ type: CardGameActionType.RESET }), []);

  return { ...state, deal, reset };
};

export default useCardGame;
