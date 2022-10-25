import { render } from '@testing-library/react';
import { Card as CardT, CardKind, Ace, King, Jack, Queen } from '../../../types';
import Card from '../Card';

const Aces: Ace[] = Object.values(CardKind).map((kind) => ({ kind, number: 1 }));
const Kings: King[] = Object.values(CardKind).map((kind) => ({ kind, number: 13 }));
const Queens: Queen[] = Object.values(CardKind).map((kind) => ({ kind, number: 12 }));
const Jacks: Jack[] = Object.values(CardKind).map((kind) => ({ kind, number: 11 }));
const Numbers: CardT[] = Object.values(CardKind).map((kind) => ({ kind, number: 3 }));

const Cards = [Aces, Kings, Queens, Jacks, Numbers];

describe('Card', () => {
  it('renders correctly', () => {
    const { container } = render(
      <div>
        {Cards.map(([card]) => (
          <Card key={`${card.kind}_${card.number}`} {...card} />
        ))}
      </div>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders all kinds of standard cards properly', () => {
    const { queryAllByTestId, queryAllByAltText } = render(
      <div>
        {Numbers.map((card) => (
          <Card key={`${card.kind}_${card.number}`} {...card} />
        ))}
      </div>
    );
    Object.values(CardKind).forEach((kind) => {
      const symbolImages = queryAllByAltText(`3 of ${kind}`);
      expect(symbolImages[1].getAttribute('src')).toBe(`${kind}.svg`);
      queryAllByTestId('card-text').forEach((node) => {
        expect(node.textContent).toBe('3');
      });
      expect(queryAllByAltText(`3 of ${kind}`).length).toBe(2);
    });
  });

  it('renders all kinds of ace cards properly', () => {
    const { queryAllByTestId, queryAllByAltText } = render(
      <div>
        {Aces.map((card) => (
          <Card key={`${card.kind}_${card.number}`} {...card} />
        ))}
      </div>
    );
    Object.values(CardKind).forEach((kind) => {
      const symbolImages = queryAllByAltText(`Ace of ${kind}`);
      expect(symbolImages[1].getAttribute('src')).toBe(`${kind}.svg`);
      queryAllByTestId('card-text').forEach((node) => {
        expect(node.textContent).toBe('A');
      });
      expect(queryAllByAltText(`Ace of ${kind}`).length).toBe(2);
    });
  });

  it('renders all kinds of jack cards properly', () => {
    const { queryAllByTestId, queryAllByAltText } = render(
      <div>
        {Jacks.map((card) => (
          <Card key={`${card.kind}_${card.number}`} {...card} />
        ))}
      </div>
    );
    Object.values(CardKind).forEach((kind) => {
      const symbolImages = queryAllByAltText(`Jack of ${kind}`);
      expect(symbolImages[1].getAttribute('src')).toBe(`${kind}.svg`);
      queryAllByTestId('card-text').forEach((node) => {
        expect(node.textContent).toBe('J');
      });
      expect(queryAllByAltText(`Jack of ${kind}`).length).toBe(2);
    });
  });

  it('renders all kinds of queen cards properly', () => {
    const { queryAllByTestId, queryAllByAltText } = render(
      <div>
        {Queens.map((card) => (
          <Card key={`${card.kind}_${card.number}`} {...card} />
        ))}
      </div>
    );
    Object.values(CardKind).forEach((kind) => {
      const symbolImages = queryAllByAltText(`Queen of ${kind}`);
      expect(symbolImages[1].getAttribute('src')).toBe(`${kind}.svg`);
      queryAllByTestId('card-text').forEach((node) => {
        expect(node.textContent).toBe('Q');
      });
      expect(queryAllByAltText(`Queen of ${kind}`).length).toBe(2);
    });
  });

  it('renders all kinds of king cards properly', () => {
    const { queryAllByTestId, queryAllByAltText } = render(
      <div>
        {Kings.map((card) => (
          <Card key={`${card.kind}_${card.number}`} {...card} />
        ))}
      </div>
    );
    Object.values(CardKind).forEach((kind) => {
      const symbolImages = queryAllByAltText(`King of ${kind}`);
      expect(symbolImages[1].getAttribute('src')).toBe(`${kind}.svg`);
      queryAllByTestId('card-text').forEach((node) => {
        expect(node.textContent).toBe('K');
      });
      expect(symbolImages.length).toBe(2);
    });
  });
});
