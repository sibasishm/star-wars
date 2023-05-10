import type { NextPage } from 'next';
import Head from 'next/head';
// import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
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
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ullam,
					natus a eos.
				</p>

				<main className={styles.content}>
					<a href='#' className={styles.card}>
						<h2>Character 1</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
							ullam, natus a eos.
						</p>
					</a>

					<a href='#' className={styles.card}>
						<h2>Character 2</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
							ullam, natus a eos.
						</p>
					</a>

					<a href='#' className={styles.card}>
						<h2>Character 3</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
							ullam, natus a eos.
						</p>
					</a>

					<a
						href='#'
						target='_blank'
						rel='noopener noreferrer'
						className={styles.card}
					>
						<h2>Character 4</h2>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
							ullam, natus a eos.
						</p>
					</a>
				</main>
			</div>
		</div>
	);
};

export default Home;
