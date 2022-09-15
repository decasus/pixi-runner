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
            if (type === "Enemy") item = new Enemy();
            if (type === "House") item = new House();
            this.items.push({type: type, instance: item});
        }
        item.isActive = true;
        return item;
    }
}
