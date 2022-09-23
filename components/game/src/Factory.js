export default class Factory {
    constructor() {
        this.items = [];
    }

    getItem = (type) => {
        const freeItem = this.items.find(item => item.type === type && !item.instance.isActive)
        let item;
        if (freeItem) {
            item = freeItem.instance;
            if (item.hasOwnProperty('reset')) item.reset(); // TODO Проверка существует ли метод вообще
        }
        else {
            item = this.createItem(type);
            this.items.push({type: type, instance: item});
        }
        item.isActive = true;
        return item;
    }

    createItem = (type) => {
        return {}
    }

}
