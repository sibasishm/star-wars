import { rest } from 'msw';
import { SWAPI_BASE_URL } from '../constants';
import { film, person1, person2, planet } from './db';

export const handlers = [
	rest.get(`${SWAPI_BASE_URL}/planets`, (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(planet));
	}),
	rest.get(`${SWAPI_BASE_URL}/films`, (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(film));
	}),
	rest.get(`${SWAPI_BASE_URL}/people`, (req, res, ctx) => {
		const pageNum = req.url.searchParams.get('page');
		if (pageNum) {
			return res(
				ctx.status(200),
				ctx.json({
					count: 82,
					next: 'https://swapi.dev/api/people/?page=2',
					previous: null,
					results: [person1, person2],
				})
			);
		}
		return res(ctx.status(200), ctx.json(person1));
	}),
];
