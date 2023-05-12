import { expect, test } from 'vitest';

import { getId } from '../helpers';

test('getId gets the id from the given swapi endpoint', () => {
	expect(getId('https://swapi.dev/api/films/4/')).toBe('4');
});
