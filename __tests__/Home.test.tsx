import { expect, test } from 'vitest';
import {
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from '../pages';
import Character from '../pages/character/[id]';
import { person1, person2 } from '../mocks/db';

const queryClient = new QueryClient({
	logger: {
		log: console.log,
		warn: console.warn,
		error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
	},
});

test('renders all the character information', async () => {
	render(
		<QueryClientProvider client={queryClient}>
			<Home />
		</QueryClientProvider>
	);

	expect(screen.getByText(/Star Wars Universe!/i)).toBeDefined();

	await waitForElementToBeRemoved(screen.queryAllByText(/loading/i));

	expect(screen.getByText(person1.name)).toBeDefined();
	expect(screen.getByText(person2.name)).toBeDefined();

	expect(screen.getByText(`Gender: ${person1.gender}`)).toBeDefined();
	expect(screen.getByText(`Gender: ${person2.gender}`)).toBeDefined();
});

test('renders a particular character information', async () => {
	window.history.pushState({}, 'Test page', `/character/${2}`);

	render(
		<QueryClientProvider client={queryClient}>
			<Character />
		</QueryClientProvider>
	);

	// await waitForElementToBeRemoved(screen.queryAllByText(/loading/i));

	screen.debug();

	expect(screen.getByText(person2.name)).toBeDefined();

	expect(screen.getByText(`Gender: ${person2.gender}`)).toBeDefined();
});
