import { useQuery } from '@tanstack/react-query';

import { Planet } from '../types';
import { SWAPI_BASE_URL } from '../constants';

export const Homeworld = ({ id }: { id: string }) => {
	const fetchPlanet = (): Promise<Planet> =>
		fetch(`${SWAPI_BASE_URL}/planets/${id}`).then(res => res.json());

	const { data, isLoading, isError } = useQuery({
		queryKey: ['homeworld', id],
		queryFn: fetchPlanet,
	});

	if (isLoading) {
		return <span>Loading...</span>;
	}

	if (isError) {
		return <span>Not found!</span>;
	}

	return <span>{data.name}</span>;
};
