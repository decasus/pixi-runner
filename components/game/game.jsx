import {useRef, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    gameInit, gameInitFulfilled, levelInit, levelInitFulfilled,
    loading,
    loadingFulfilled,
    preloadResources,
    preloadResourcesFulfilled,
    start
} from "../../store/gameSlice";

const Game = () => {
    const mount = useRef(null);
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    // Сеттер с инстансом игры, логика перехода между стейтами

    useEffect(() => {

        let game;
        dispatch(loading());

        // Написать функцию requestState

        import("./src/Game.js").then(async ({default: RunnerGame}) => {

            dispatch(loadingFulfilled());

            dispatch(gameInit());
            game = RunnerGame;
            game.init(mount);
            dispatch(gameInitFulfilled());

            dispatch(preloadResources());
            await game.loadTextures();
            dispatch(preloadResourcesFulfilled());

            dispatch(levelInit());
            game.initLevel();

            dispatch(levelInitFulfilled());
            dispatch(start());

        });
// Каждый стейт возвращает промис, можно обратиться к статическому свойству промиса Resolve если не возвращает промис.........
        return () => {
            game.clear();
            game.destroy(true, true);
        }

    }, []);

    return (<div>
        {/*<button onClick={() => dispatch(start())}>TEST</button>*/}
        <div>State --- {state}</div>
        <div ref={mount}></div>
    </div>);
}


export default Game;
