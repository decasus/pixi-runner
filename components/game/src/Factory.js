export default class Factory {
    constructor() {
        this.items = [];
    }

    getItem(type) {
        const freeItem = this.items.find(item => item.type === type && !item.instance.isActive)
        let item;
        if (freeItem) {
            item = freeItem.instance;
            item.reset();
        }
        else {
            item = this.createItem(type);
            this.items.push({type: type, instance: item});
        }
        item.isActive = true;
        return item;
    }

    createItem(type) {
        return {}
    }

}
