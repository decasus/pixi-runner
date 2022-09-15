import {randomInt} from "../../../utils/randomInt";


export default class Router {
    constructor() {
        this.prevRoutes = [2, 2];
        this.lastLine = [1, 1, 1, 1];
        this.pathSize = 2;
    }

    generateRoute() {
        let routes = [0, 0];
        do this.prevRoutes.forEach((route, i) => {
            const direction = randomInt(-1, 1);
            if(direction === -1) {
                if (route === 0) routes[i] = route;
                else routes[i] = route - 1;
            }
            else if(direction === 1) {
                if (route === 3) routes[i] = route;
                else routes[i] = route + 1;
            }
            else routes[i] = route;
        })
        while (Math.abs(routes[1] - routes[0]) === 1)
        this.prevRoutes = routes;
        let route = [0, 0, 0, 0];
        routes.forEach(el => route[el] = 1);
        return route;
    }

    createMatrix() {
        const matrix = [];
        const route = this.generateRoute();
        for (let i = 0; i < this.pathSize; i++) {
            if (i === 0) {
                const transition = route.map((item, index) => this.lastLine[index] === 1 ? 1 : item);
                matrix.push(transition);
            } else matrix.push(route);
        }
        this.lastLine = route;
        return matrix;
    }
}