import type { NextPage } from 'next';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';

import { PaginatedRes, People } from '../types';
import styles from '../styles/Home.module.css';

const FIRST_PAGE_NUMBER = 1;

const Home: NextPage = () => {
	const [pageNum, setPageNum] = useState(FIRST_PAGE_NUMBER);

	const fetchCharacters = (
		page = FIRST_PAGE_NUMBER
	): Promise<PaginatedRes<People>> =>
		fetch(`https://swapi.dev/api/people/?page=${pageNum}`).then(res =>
			res.json()
		);

	const { isLoading, isError, data, isFetching, isPreviousData, refetch } =
		useQuery({
			queryKey: ['characters', pageNum],
			queryFn: () => fetchCharacters(pageNum),
			keepPreviousData: true,
		});

	return (
		<div className={styles.container}>
			<Head>
				<title>Star Wars</title>
				<meta
					name='description'
					content='Character details from the Star Wars universe'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={styles.main}>
				<h1 className={styles.title}>Star Wars Universe!</h1>
				<p className={styles.description}>
					All your favourite Star Wars characters in one place...
				</p>
				<span>Current Page: {pageNum}</span>
				<button
					onClick={() => setPageNum(old => Math.max(old - 1, 1))}
					disabled={pageNum === 1}
				>
					Previous Page
				</button>{' '}
				<button
					onClick={() => {
						if (!isPreviousData && data?.next) {
							setPageNum(old => old + 1);
						}
					}}
					disabled={isPreviousData || !data?.next}
				>
					Next Page
				</button>
				{isFetching ? <span> Fetching more...</span> : null}{' '}
				<main className={styles.content}>
					{isLoading ? (
						<div>Loading...</div>
					) : isError ? (
						<div>
							<p>Oops! Something went wrong. Please retry.</p>
							<button onClick={() => refetch()}>Retry</button>
						</div>
					) : (
						<>
							{data.results.map((character, idx) => (
								<CharacterCard character={character} id={idx + 1} />
							))}
						</>
					)}
				</main>
			</div>
		</div>
	);
};

const CharacterCard = ({
	character,
	id,
}: {
	character: People;
	id: number;
}) => {
	const fetchPlanet = () => fetch(character.homeworld).then(res => res.json());

	const planetId = character.homeworld.split('/').reverse()[1];

	const { isLoading, data } = useQuery({
		queryKey: ['plant', planetId],
		queryFn: fetchPlanet,
	});

	return (
		<Link href={`/character/${id}`} className={styles.card} key={id}>
			<h2>{character.name}</h2>
			<p>Gender: {character.gender}</p>
			<p>Home World: {isLoading ? 'Loading...' : data.name}</p>
		</Link>
	);
};

export default Home;
