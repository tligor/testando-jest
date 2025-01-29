import { render, screen } from '@testing-library/react';
import App from './App';

describe('Testes para o componente principal', () => {
  test('Deve renderizar corretamente', () => {
    render(<App />);
    expect(screen.getByText('cadastrar')).toBeInTheDocument()
  });
});