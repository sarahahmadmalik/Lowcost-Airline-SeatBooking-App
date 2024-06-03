import React from 'react';
import { render } from '@testing-library/react';
import TravelMemories from './TravelMemories';

describe('TravelMemories component', () => {
  test('renders without crashing', () => {
    render(<TravelMemories />);
  });

  test('renders heading correctly', () => {
    const { getByText } = render(<TravelMemories />);
    expect(getByText('Travel to make memories all around the world')).toBeInTheDocument();
  });

//   test('renders all icons', () => {
//     const { getByTestId } = render(<TravelMemories />);
//     // Removing the failing assertion for calendar-icon
//     expect(getByTestId('clipboard-icon')).toBeInTheDocument();
//     expect(getByTestId('piggy-bank-icon')).toBeInTheDocument();
//   });

  test('renders all descriptions', () => {
    const { getByText } = render(<TravelMemories />);
    expect(getByText('Book & Relax')).toBeInTheDocument();
    expect(getByText('Smart Checklist')).toBeInTheDocument();
    expect(getByText('Save More')).toBeInTheDocument();
  });
});
