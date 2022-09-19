export const houseSources = ['images/home-1.png', 'images/home-2.png', 'images/home-3.png', 'images/home-4.png', 'images/home-5.png', 'images/home-6.png', 'images/home-7.png'];
export const enemySources = ['images/enemy_1.png', 'images/enemy_2.png'];
export const enemyPositions = [75, 155, 235, 315];

export const config = {
    "idle": {next: "loading", isWait: true},
    "loading": {next: "loadingComplete", isWait: true},
    "loadingComplete": {next: "init", isWait: true},
    "init": {next: "initComplete", isWait: true},
    "initComplete": {next: "initLevel", isWait: true},
    "initLevel": {next: "initLevelComplete", isWait: true},
    "initLevelComplete": {next: "showLevel", isWait: true},
    "showLevel": {next: "showLevelComplete", isWait: true},
    "showLevelComplete": {next: "game", isWait: true},
    "game": {}
}