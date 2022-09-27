import {Application, Loader, Renderer} from "pixi.js";
import Level from "./Level";

class RunnerGame extends Application {

    constructor(mount) {
        super();
        this.mount = mount;
        this.events = [];
        this.resizeTo = window;
        this.paused = false;
    }

    loadTextures = (resolve, reject) => {
        Loader.shared
            .add('hero', '/images/hero.png')
            .add('enemy_1', 'images/enemy_1.png')
            .add('enemy_2', 'images/enemy_2.png')
            .add('bonus', 'images/bonus.png')
            .add('home_1', 'images/home-1.png')
            .add('home_2', 'images/home-2.png')
            .add('home_3', 'images/home-3.png')
            .add('home_4', 'images/home-4.png')
            .add('home_5', 'images/home-5.png')
            .add('home_6', 'images/home-6.png')
            .add('home_7', 'images/home-7.png')
            .add('wave', 'images/wave.png')
            .load();
        Loader.shared.onComplete.add(() => resolve())
        Loader.shared.onError.add(() => reject())
    };

    setState = (state) => {
        console.log(state);
        return new Promise((resolve, reject) => {
            switch (state) {
                case "loading":
                    this.loadTextures(resolve, reject);
                    break;
                case "init":
                    this.init();
                    resolve();
                    break;
                case "initLevel":
                    this.initLevel();
                    resolve();
                    break;
                case "showLevel":
                    this.showLevel(resolve);
                    break;
                case "game":
                    this.startGame();
                    resolve();
                    break;
                case "loseAnim":
                    this.level.loseAnim(resolve);
                    break;
                case "lose":
                    this.stopGame();
                    resolve();
                    break;
                case "showResults":
                    this.stopGame();
                    resolve();
                    break;
                default:
                    resolve();
                    break;
            }
        });
    }

    init = () => {
        this.renderer = new Renderer({
            width: 390, height: 844, backgroundColor: 0x323232, antialias: true
        });
        this.mount.current.appendChild(this.view);
    }

    initTouchEvents = (hero) => {
        let touchstartX = 0
        let touchendX = 0

        const checkDirection = () => {
            if (touchendX < touchstartX && hero.x > 75) hero.moveLeft = hero.x - 80;
            if (touchendX > touchstartX && hero.x < 315) hero.moveRight = hero.x + 80;
        }

        const touchStart = (e) => {
            touchstartX = e.changedTouches[0].screenX;
        }
        const touchEnd = (e) => {
            touchendX = e.changedTouches[0].screenX;
            checkDirection()
        }

        document.addEventListener("touchstart", touchStart);
        this.events.push({type: "touchstart", handler: touchStart});
        document.addEventListener("touchend", touchEnd);
        this.events.push({type: "touchend", handler: touchEnd});
    }

    initLevel = () => {
        this.level = new Level();
        const {level} = this;
        level.init();
        this.updateDistance(0);
        this.updateLifeCount(3);
        level.updateDistance = this.updateDistance;
        level.updateLifeCount = this.updateLifeCount;
        level.requestState = this.requestState;
        this.ticker.add(level.gameLoop);
        this.ticker.start();
        console.log(level);
        this.stage.addChild(level);
    }

    showLevel = (resolve) => {
        const {level} = this;
        level.showAnim(resolve);
    }

    startGame = () => {
        const {level} = this;
        this.initTouchEvents(level.hero);
    }

    stopGame = () => {
        const {level} = this;
        level.clear();
        this.stage.removeChild(level);
        this.ticker.stop();
        this.ticker.remove(level.gameLoop);
        this.events.forEach(e => document.removeEventListener(e.type, e.handler));
    }

    clear = () => {
        this.events.forEach(e => document.removeEventListener(e.type, e.handler));
        Loader.shared.reset();
    }
}

export default RunnerGame;