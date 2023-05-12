import { useQuery } from '@tanstack/react-query';

import { Film } from '../types';
import { SWAPI_BASE_URL } from '../constants';

export const Movie = ({ id }: { id: string }) => {
	const fetchFilm = (): Promise<Film> =>
		fetch(`${SWAPI_BASE_URL}/films/${id}`).then(res => res.json());

	const { data, status } = useQuery({
		queryKey: ['film', id],
		queryFn: fetchFilm,
	});

	if (status !== 'success') {
		return null;
	}

	return <li key={id}>{data.title}</li>;
};
