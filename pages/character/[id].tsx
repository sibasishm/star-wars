import type { NextPage } from 'next';

import Head from 'next/head';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import styles from '../../styles/Character.module.css';
import { People } from '../../types';
import Link from 'next/link';
import { Homeworld } from '../../components/Homeworld';
import { getId } from '../../helpers';
import { Movie } from '../../components/Movie';

const Character: NextPage = () => {
	const router = useRouter();
	const characterId = router.query.id as string;

	const fetchCharacter = (characterId: string): Promise<People> =>
		fetch(`https://swapi.dev/api/people/${characterId}`).then(res =>
			res.json()
		);

	const { isLoading, data, error } = useQuery({
		queryKey: ['character', characterId],
		queryFn: () => fetchCharacter(characterId),
	});

	if (error) {
		return (
			<div className={styles.container}>
				<h2>Something is not right!</h2>
			</div>
		);
	}

	if (!data || isLoading) {
		return (
			<div className={styles.container}>
				<h2>Loading...</h2>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>{`Star Wars | ${data.name}`}</title>
				<meta
					name='description'
					content='Character details from the Star Wars universe'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={styles.main}>
				<Link href='/' className={styles.backLink}>
					Go Back
				</Link>
				<h1 className={styles.title}>{data.name}</h1>
				<main className={styles.card}>
					<p>Gender: {data.gender}</p>
					<p>Eye Color: {data.eye_color}</p>
					<p>Hair Color: {data.hair_color}</p>
					<p>
						Home Planet: <Homeworld id={getId(data.homeworld)} />
					</p>
					<p>Films: </p>
					<ol>
						{data.films.map(filmEndpoint => (
							<Movie id={getId(filmEndpoint)} />
						))}
					</ol>
				</main>
			</div>
		</div>
	);
};

export default Character;
