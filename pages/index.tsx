import type { NextPage } from 'next';

import fetch from 'cross-fetch';
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';

import { PaginatedRes, People } from '../types';
import styles from '../styles/Home.module.css';
import { Homeworld } from '../components/Homeworld';
import { SWAPI_BASE_URL } from '../constants';
import { getId } from '../helpers';

const FIRST_PAGE_NUMBER = 1;

const Home: NextPage = () => {
	const [pageNum, setPageNum] = useState(FIRST_PAGE_NUMBER);

	const fetchCharacters = (
		page = FIRST_PAGE_NUMBER
	): Promise<PaginatedRes<People>> =>
		fetch(`${SWAPI_BASE_URL}/people/?page=${pageNum}`).then(res => res.json());

	const { isLoading, isError, data, isPreviousData, refetch } = useQuery({
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
			<h1 className={styles.title}>Star Wars Universe!</h1>
			<p className={styles.description}>
				All your favourite Star Wars characters in one place...
			</p>
			<div className={styles.main}>
				<p>Current Page: {pageNum}</p>
				<div>
					<button
						onClick={() =>
							setPageNum(old => Math.max(old - 1, FIRST_PAGE_NUMBER))
						}
						disabled={pageNum === FIRST_PAGE_NUMBER}
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
				</div>
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
	const planetId = getId(character.homeworld);

	return (
		<Link href={`/character/${id}`} className={styles.card} key={id}>
			<h2>{character.name}</h2>
			<p>Gender: {character.gender}</p>
			<p>
				Home World: <Homeworld id={planetId} />
			</p>
		</Link>
	);
};

export default Home;
