import { act, renderHook } from '@testing-library/react';
import { CardKind, CardGameState } from '../../types';
import useCardGame, { generateDeck } from '../useCardGame';

interface CardGameHookResults extends CardGameState {
  reset: () => void;
  deal: () => void;
}

describe('generateDeck', () => {
  it('generates a deck of 52 cards correctly', () => {
    const deck = generateDeck();
    expect(deck.length).toBe(52);
    // Checking if all the cards from each card is in the deck
    let hasAllCards = true;
    const kinds = [CardKind.CLUBS, CardKind.DIAMONDS, CardKind.HEARTS, CardKind.SPADES];
    kinds.forEach((kind) => {
      // For each kind there should be 13 card numbers
      [...new Array(13)].forEach((_, idx) => {
        if (!deck.find((card) => card.number === idx + 1 && card.kind === kind))
          hasAllCards = false;
      });
    });
    expect(hasAllCards).toBe(true);
  });
});

describe('useCardGame', () => {
  it('deals 52 cards and with 47 on the deck and 5 in hand initially', () => {
    const { result } = renderHook<CardGameHookResults, never>(() => useCardGame());
    expect(result.current.hand.length).toBe(5);
    expect(result.current.deck.length).toBe(47);
  });

  it('deals 5 cards when deal is called and removes them from deck', () => {
    const { result } = renderHook<CardGameHookResults, never>(() => useCardGame());
    act(() => result.current.deal());
    expect(result.current.hand.length).toBe(5);
    expect(result.current.deck.length).toBe(42);
    // Check if deck still contains any of the dealt cards
    let hasDealtCards = false;
    result.current.hand.forEach((card) => {
      if (result.current.deck.includes(card)) hasDealtCards = true;
    });
    expect(hasDealtCards).toBe(false);
  });

  it('resets correctly after dealing', () => {
    const { result } = renderHook<CardGameHookResults, never>(() => useCardGame());
    act(() => result.current.deal());
    expect(result.current.hand.length).toBe(5);
    expect(result.current.deck.length).toBe(42);
    act(() => result.current.reset());
    expect(result.current.hand.length).toBe(5);
    expect(result.current.deck.length).toBe(47);
  });

  it('shuffles the deck every time reset is called', () => {
    const { result } = renderHook<CardGameHookResults, never>(() => useCardGame());
    const firstDeck = [...result.current.deck];
    act(() => result.current.reset());
    const secondDeck = [...result.current.deck];
    // Below while loop will run until it finds the first unmatching card,
    // that means 2 decks are different.
    let isSameDeck = true;
    let i = 0;
    while (isSameDeck && i < 52) {
      const { kind, number } = secondDeck[i];
      if (kind !== firstDeck[i].kind && number !== firstDeck[i].number) isSameDeck = false;
      i += 1;
    }
    expect(isSameDeck).toBe(false);
  });

  it('game finishes when there are no aces left in the deck', () => {
    const { result } = renderHook<CardGameHookResults, never>(() => useCardGame());
    while (result.current.acesInDeck.length > 0) {
      act(() => result.current.deal());
    }
    expect(result.current.finished).toBe(true);
  });

  it('can not deal more cards when the deck is empty', () => {
    const { result } = renderHook<CardGameHookResults, never>(() => useCardGame());
    // Finish up all the cards
    while (result.current.deck.length > 0) {
      act(() => result.current.deal());
    }
    act(() => result.current.deal());
    expect(result.current.hand).toStrictEqual([]);
  });

  it('can not deal the same card again', () => {
    const { result } = renderHook<CardGameHookResults, never>(() => useCardGame());
    act(() => result.current.deal());
    const firstHand = [...result.current.hand];
    // Go through all of the deck
    let totalSameCards = 0;
    while (result.current.deck.length > 0) {
      act(() => result.current.deal());
      const currentHand = [...result.current.hand];
      const sameCards = currentHand.reduce((prevCount, currentCard) => {
        let newCount = prevCount;
        firstHand.forEach((firstCard) => {
          if (currentCard.kind === firstCard.kind && currentCard.number === firstCard.number)
            newCount += 1;
        });
        return newCount;
      }, 0);
      totalSameCards += sameCards;
    }
    expect(totalSameCards).toBe(0);
  });
});
