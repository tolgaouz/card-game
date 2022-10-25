import React from 'react';
import Button from '../components/Button';
import CardsContainer from '../containers/CardsContainer';
import ResultView from '../containers/ResultView';
import useCardGame from '../hooks/useCardGame';

const CardGameView = () => {
  const { hand, deck, acesInDeck, reset, deal, userWon, finished } = useCardGame();
  return (
    <div className="w-full h-full py-8 md:py-20 flex flex-col items-center">
      <div className="flex h-fit w-full justify-center align-center">
        <div className="border-[1px] border-amber-200 bg-black font-courier font-bold text-white text-center w-fit py-2 px-3">
          <div className="text-5xl">{deck.length}</div>
          <div className="text-xl">Cards Left</div>
        </div>
        <div className="border-[1px] border-amber-200 bg-white font-courier font-bold text-black text-center w-fit py-2 px-3">
          <div className="text-5xl">{acesInDeck.length}</div>
          <div className="text-xl">Aces Left</div>
        </div>
      </div>
      <CardsContainer cards={hand} />
      {!finished ? (
        <>
          <Button className="my-8 py-2.5 px-16 text-6xl leading-tight" onClick={() => deal()}>
            DEAL
          </Button>
          <Button
            onClick={() => reset()}
            variant="outline"
            className="text-2xl px-5 xl:px-9 py-2 my-6 md:my-6 md:absolute md:bottom-12 md:right-10"
          >
            Reset
          </Button>
        </>
      ) : (
        <ResultView userWon={userWon} onPlayAgain={reset} />
      )}
    </div>
  );
};

export default CardGameView;
