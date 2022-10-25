import React from 'react';
import WinnerSVG from '../../assets/winner.svg';
import Button from '../../components/Button';
import { CardGameState } from '../../types';

interface ResultViewProps {
  userWon?: CardGameState['userWon'];
  onPlayAgain: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ userWon = false, onPlayAgain }) => {
  return (
    <div className="my-4 md:my-0 font-courier w-full text-white flex flex-col items-center">
      {!userWon ? (
        <div data-testid="lost-text" className="w-full flex flex-col items-center">
          <div className="text-5xl md:text-6xl leading-none">Game Over</div>
          <div className="text-4xl text-center mt-4">
            You lose. <br />
            Better luck next time!
          </div>
        </div>
      ) : (
        <img
          data-testid="win-image"
          className="z-10 absolute top-36 motion-safe:animate-bounce"
          src={WinnerSVG}
          alt="Winner"
        />
      )}
      <Button
        data-testid="play-again-button"
        className="text-2xl px-9 py-2 my-3"
        onClick={() => onPlayAgain()}
        variant="outline"
      >
        Play Again
      </Button>
    </div>
  );
};

export default ResultView;
