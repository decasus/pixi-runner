import Head from 'next/head'
import dynamic from "next/dynamic";

const Game = dynamic(() => import("../components/game/game"), { ssr: false });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Runner</title>
      </Head>
        <Game />
    </div>
  )
}
