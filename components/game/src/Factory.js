export default class Factory {
    constructor() {
        this.items = [];
    }

    getItem = (type, texture) => {
        const freeItem = this.items.find(item => item.type === type && !item.instance.isActive)
        let item;
        if (freeItem) {
            item = freeItem.instance;
            if (item.hasOwnProperty('reset')) item.reset();
        }
        else {
            item = this.createItem(type);
            this.items.push({type: type, instance: item});
        }
        if(texture) item.texture = texture;
        item.isActive = true;
        return item;
    }

    createItem = (type) => {
        return {}
    }

}
