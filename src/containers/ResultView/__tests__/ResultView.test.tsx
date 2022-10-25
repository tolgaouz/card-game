import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultView from '../ResultView';

describe('Result View', () => {
  it('renders game over text when userWon is false', () => {
    const { container, getByTestId } = render(
      <ResultView userWon={false} onPlayAgain={() => null} />
    );
    expect(container).toMatchSnapshot();
    expect(getByTestId('lost-text')).toBeInTheDocument();
  });

  it('successfully calls onPlayAgain', () => {
    const onPlayAgain = jest.fn();
    const { getByTestId } = render(<ResultView userWon={false} onPlayAgain={onPlayAgain} />);
    userEvent.click(getByTestId('play-again-button'));
    expect(onPlayAgain).toBeCalledTimes(1);
  });

  it('renders winner image when userWon is true', () => {
    const { container, getByTestId, queryByTestId } = render(
      <ResultView userWon onPlayAgain={() => null} />
    );
    expect(container).toMatchSnapshot();
    expect(queryByTestId('lost-text')).not.toBeInTheDocument();
    expect(getByTestId('win-image')).toBeInTheDocument();
  });
});
