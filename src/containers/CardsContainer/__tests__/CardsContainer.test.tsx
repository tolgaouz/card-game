import { render } from '@testing-library/react';
import { Card, CardKind } from '../../../types';
import CardsContainer from '../CardsContainer';

const cards: Card[] = [
  { kind: CardKind.CLUBS, number: 2 },
  { kind: CardKind.CLUBS, number: 3 },
  { kind: CardKind.CLUBS, number: 4 },
  { kind: CardKind.CLUBS, number: 5 },
  { kind: CardKind.CLUBS, number: 6 },
];

describe('Circular Cards View', () => {
  it('renders correctly', () => {
    const container = render(<CardsContainer cards={cards} />);
    expect(container).toMatchSnapshot();
  });
});
