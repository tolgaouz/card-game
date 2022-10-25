import clsx from 'clsx';
import { CSSProperties } from 'react';
import { useMediaQuery } from 'react-responsive';
import { TransitionGroup, Transition } from 'react-transition-group';
import Card from '../../components/Card';
import MediaQueries from '../../mediaQueries';
import { CardGameState, TransitionStyle } from '../../types';

interface CardsContainerProps extends React.HTMLProps<HTMLDivElement> {
  cards: CardGameState['hand'];
}

const CardsContainer: React.FC<CardsContainerProps> = ({ cards, className }) => {
  // Should be in-sync with the theme object
  const isDesktop = useMediaQuery({
    query: `(min-width: ${MediaQueries.md})`,
  });
  const duration = 300;
  return (
    <TransitionGroup
      className={clsx(
        'flex my-6 md:px-8 md:my-32 flex-wrap gap-x-3 gap-y-5 md:gap-5 justify-center w-full',
        className
      )}
    >
      {cards.map((card, idx) => {
        // Taking the card in the middle as center point,
        // spread the cars along a circular perimeter
        // Tailwind won't work with dynamically constructed class names,
        // for reference: https://tailwindcss.com/docs/content-configuration#dynamic-class-names
        const centerIndex = Math.floor(cards.length / 2);
        const defaultStyle: CSSProperties = {
          transition: `all ${duration}ms ease-in-out`,
          transformOrigin: '50% 0',
        };
        let transitionStyles: {
          [k in TransitionStyle]?: CSSProperties;
        } = {
          entering: { opacity: 0 },
          entered: {
            opacity: 1,
            transform: `translateY(20px)`,
          },
          exiting: { display: 'none' },
          exited: { display: 'none' },
        };
        // Dont need to apply circular transform if cards length is smaller than 3 or
        // mobile view
        if (cards.length > 3 && isDesktop) {
          transitionStyles = {
            entering: { opacity: 0 },
            entered: {
              opacity: 1,
              transform: `rotate(${(centerIndex - idx) * 6}deg) translateY(${
                Math.cos((centerIndex - idx) * 12) * 80
              }px)`,
            },
            exiting: { display: 'none' },
            exited: { display: 'none' },
          };
        }
        return (
          <Transition key={`${card.kind}_${card.number}`} in timeout={duration}>
            {(state) => (
              <Card
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state as TransitionStyle],
                }}
                kind={card.kind}
                number={card.number}
              />
            )}
          </Transition>
        );
      })}
    </TransitionGroup>
  );
};

export default CardsContainer;
