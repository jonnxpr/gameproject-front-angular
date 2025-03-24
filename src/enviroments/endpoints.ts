const env = {
  dev: {
    BACK_PROTOCOL: 'http',
    GAME_PROJECT: 'localhost:8080/api/gamepedia',
  }
}

export const endpoints = {
  games: {
    // Endpoint para buscar todos os jogos
    findAll: `${env.dev.BACK_PROTOCOL}://${env.dev.GAME_PROJECT}/find-all`,
    // Endpoint para deletar um jogo pelo ID
    deleteGame: `${env.dev.BACK_PROTOCOL}://${env.dev.GAME_PROJECT}/delete-by-id`,
    // Endpoint para deletar todos os jogos
    deleteAll: `${env.dev.BACK_PROTOCOL}://${env.dev.GAME_PROJECT}/delete-all`,
    // Endpoint para popular o banco de dados
    populateDatabase: `${env.dev.BACK_PROTOCOL}://${env.dev.GAME_PROJECT}/populate-database`,
    // Endpoint para salvar um jogo
    saveGame: `${env.dev.BACK_PROTOCOL}://${env.dev.GAME_PROJECT}/save`
  }
}
