import { expect, test } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Home from '../pages';

test('home', () => {
	render(<Home />);
	const main = within(screen.getByRole('main'));
	expect(
		main.getByRole('heading', { level: 1, name: /star wars universe!/i })
	).toBeDefined();
});
