import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button', () => {
  it('renders correctly', () => {
    const { container } = render(<Button>Button</Button>);
    expect(container).toMatchSnapshot();
  });

  it('calls onClick function successfully', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Button</Button>);
    userEvent.click(getByText('Button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct classes when variant is outlined', () => {
    const { getByText } = render(<Button variant="outline">Button</Button>);
    const button = getByText('Button');
    expect(button).toHaveClass('border-2 text-yellow-300 border-yellow-300');
  });

  it('applies correct classes when variant is primary', () => {
    const { getByText } = render(<Button variant="primary">Button</Button>);
    const button = getByText('Button');
    expect(button).toHaveClass('bg-yellow-300');
  });

  it('passes down props to button element', () => {
    const { getByText } = render(
      <Button variant="primary" data="test">
        Button
      </Button>
    );
    const button = getByText('Button');
    expect(button.getAttribute('data')).toBe('test');
  });
});
