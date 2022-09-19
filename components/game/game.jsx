import {useRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {decrementLifeCount, incrementDistance, setState} from "../../store/gameSlice";
import RunnerGame from "./src/Game";
import {config} from "../../constants/constants";

let game;

const Game = () => {
    const mount = useRef(null);
    const state = useSelector(state => state.state);
    const distance = useSelector(state => state.distance)
    const lifeCount = useSelector(state => state.lifeCount)
    const dispatch = useDispatch();

    // Сеттер с инстансом игры, логика перехода между стейтами

    const updateDistance = (value) => {
        dispatch(incrementDistance(value));
    }

   const updateLifeCount = () => {
        dispatch(decrementLifeCount());
    }

    useEffect(() => {

        game = new RunnerGame(mount, updateDistance, updateLifeCount);

        return () => {
            //game.clear();
            //game.destroy(true, true);
        }
    }, []);

    useEffect(() => {
        const promise = game.setState(state);
        const isWaitState = config[state].next;

        //if(!isWaitState) game.requestState = (state) => dispatch(setState(state));

        if(isWaitState) promise.then(() => dispatch(setState(isWaitState)));
        //else dispatch(setState(isWaitState));

    }, [state]);

    return (<div>
        <div>State = {state} | Distance = {distance} | LifeCount = {lifeCount}</div>
        <div ref={mount}></div>
    </div>);
}


export default Game;
