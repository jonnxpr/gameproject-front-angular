
const env = {
  dev: {
    BACK_PROTOCOL: 'http',
    GAME_PROJECT: 'localhost:8080/game',
  }
}

export const endpoints = {
  games: {
    findAll: `${env.dev.BACK_PROTOCOL}://${env.dev.GAME_PROJECT}/find-all`,
    deleteGame: `${env.dev.BACK_PROTOCOL}://${env.dev.GAME_PROJECT}/delete-by-id`,
    deleteAll: `${env.dev.BACK_PROTOCOL}://${env.dev.GAME_PROJECT}/delete-all`,
    populateDatabase: `${env.dev.BACK_PROTOCOL}://${env.dev.GAME_PROJECT}/populate-database`,
  }
}
