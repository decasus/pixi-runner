import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from "next/dynamic";

const Game = dynamic(() => import("../components/game/game"), { ssr: false });

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Runner</title>
      </Head>
        <Game />
    </div>
  )
}
