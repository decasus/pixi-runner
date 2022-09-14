import {enemyPositions} from "../../../constants/constants";
import Enemy from "./sprites/enemy";

export class Factory {
    createItem(name) {
        if(name === "enemy") {

        }
    }
}

export default class EnemyFactory {
    create(path, container) {
        for (let i = 0; i < path.length; i++) {
            path[i].forEach((value, index) => {
                !value &&
                //Math.floor(Math.random() * 2) &&
                container.addChild(new Enemy(enemyPositions[index], -100 * i));
            })
        }
    }
}
