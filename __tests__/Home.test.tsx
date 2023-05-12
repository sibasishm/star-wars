import { expect, test } from 'vitest';
import {
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from '../pages';
import { person1, person2, planet } from '../mocks/db';

const queryClient = new QueryClient({
	logger: {
		log: console.log,
		warn: console.warn,
		error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
	},
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

test('renders all the character information', async () => {
	render(
		<QueryClientProvider client={queryClient}>
			<Home />
		</QueryClientProvider>
	);

	expect(screen.getByText(/Star Wars Universe!/i)).toBeDefined();

	await waitForElementToBeRemoved(screen.queryByText(/loading/i));

	expect(screen.getByText(person1.name)).toBeDefined();
	expect(screen.getByText(person2.name)).toBeDefined();

	expect(screen.getByText(`Gender: ${person1.gender}`)).toBeDefined();
	expect(screen.getByText(`Gender: ${person2.gender}`)).toBeDefined();

	screen.debug();
});
