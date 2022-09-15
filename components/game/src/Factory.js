import {enemySources} from "../../../constants/constants";
import Enemy from "./sprites/Enemy";
import House from "./sprites/House";

export default class Factory {

    constructor() {
        this.items = [];
    }

    create(type) {
        const freeItem = this.items.find(item => item.type === type && !item.instance.isActive)
        let item;
        if (freeItem) {
            item = freeItem.instance;
            item.reset();
        } else {
            if (type === "Enemy") {
                item = new Enemy(0, 0, enemySources[Math.floor(Math.random() * enemySources.length)]);
            }
            if (type === "House") {
                item = new House(0, 0);
            }
            this.items.push({type: type, instance: item});
        }
        item.isActive = true;
        //console.log(this.items)
        return item;
    }
}
