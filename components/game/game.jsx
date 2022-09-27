import {useRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {decrementLifeCount, incrementDistance, setState} from "../../store/gameSlice";
import RunnerGame from "./src/Game";
import {config} from "../../constants/constants";
import lifeIcon from "../../assets/life.svg";
import Image from "next/image";

let game;

const Game = () => {
    const mount = useRef(null);
    const state = useSelector(state => state.state);
    const distance = useSelector(state => state.distance)
    const lifeCount = useSelector(state => state.lifeCount)
    const dispatch = useDispatch();

    useEffect(() => {
        game = new RunnerGame(mount);
        game.requestState = (state) => dispatch(setState(state));
        game.updateDistance = (value) => dispatch(incrementDistance(value));
        game.updateLifeCount = (value) => dispatch(decrementLifeCount(value));

        //document.body.onresize = () => game.resize();

        game.pause = () => {
            if(!game.paused) {
                game.ticker.stop();
                game.paused = true;
                dispatch(setState('pause'));
            }
            else {
                game.ticker.start();
                game.paused = false;
                dispatch(setState('game'));
            }

        }
        return () => {
            game.clear();
            game.destroy(true, true);
        }
    }, []);

    useEffect(() => {
        const promise = game.setState(state);
        const nextState = config[state].next;
        const isWaitState = config[state].isWait;
        if (isWaitState && nextState) promise.then(() => dispatch(setState(nextState)));
    }, [state]);

    return (
        <div>
            {
                (state !== 'showResults') ?
                    <div className='game__stats'>
                        <span className={'game__stats-distance'}>{distance}<br/></span>
                        <span className={'game__stats-lifes'}>{
                            Array.from(Array(lifeCount)).map((item, index) =>
                            <Image key={index} src={lifeIcon} width={20} height={20} alt='life'/>)
                        }
                        </span>
                        <button className={'game__pause-button'} onClick={() => game.pause()}>Pause</button>
                    </div>
                    :
                    <div className='game__results'>
                        <div>Ваш счёт: {distance}</div>
                        <button className={'game__restart-button'} onClick={() => dispatch(setState('initLevel'))}>Начать заново</button>
                    </div>
            }
            <div ref={mount}/>
        </div>);
}

export default Game;


// TODO РЕСАЙЗ
// TODO ДОМИКИ

