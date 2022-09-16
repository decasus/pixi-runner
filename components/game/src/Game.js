import {Application, Loader, Renderer} from "pixi.js";
import Level from "./Level";

class RunnerGame extends Application {

    constructor() {
        super();
    }

    init(ref) {
        this.renderer = new Renderer({
            width: 390, height: 844, backgroundColor: 0x323232, antialias: true
        });
        this.intervals = [];
        this.events = [];
        ref.current.appendChild(this.view);
    }

    initTouchEvents(hero) {
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
        this.events.push({type: "touchstart", handler: touchStart})
        document.addEventListener("touchend", touchEnd);
        this.events.push({type: "touchend", handler: touchEnd})
    }

    loadTextures() {
        return new Promise((resolve, reject) => {
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
        });
    };

    initLevel() {
        this.level = new Level();
        const {level} = this;
        level.init();
        this.initTouchEvents(level.hero);
        this.stage.addChild(level);
        this.ticker.add(level.gameLoop);
    }

    // Сообщаю игре стейт ->
    // Могу создавать промис внутри обработчика, если не возвращает промис, то по умолчанию

    clear() {
        this.events.forEach(e => document.removeEventListener(e.type, e.handler))
        Loader.shared.reset();
    }
}

export default new RunnerGame;


// TODO ФАБРИКА ВОЗВРАЩАЕТ ПУСТОЙ ОБЪЕКТ - БАЗОВАЯ ФАБРИКА
// TODO КАСТОМНАЯ ФАБРИКА
// TODO ФУНКЦИЯ RESET В КЛАССЕ ИЛИ В ФАБРИКЕ