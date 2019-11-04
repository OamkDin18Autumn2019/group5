module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: PROCESS_ENV.DATABASE_HOST,
        user: PROCESS_ENV.DATABASE_USER,
        password: PROCESS_ENV.DATABASE_PASSWORD,
        database: PROCESS_ENV.DATABASE_NAME
      },
      migrations: {
        tableName: 'migrations'
      }
    }
  };