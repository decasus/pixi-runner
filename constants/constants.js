export const enemyPositions = [-120, -40, 40, 120];

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
    "game": {},
    "loseAnim": {next: "lose", isWait: true},
    "lose": {next: "showResults", isWait: true},
    "showResults": {},
    "pause": {}
}
