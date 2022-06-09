const {
  DB_USER= 'cllspqyswwbmdk',
  DB_PASSWORD='8309ffc4129e58b37a9a233382e21e839bd230b10a7b241322a8aff09de81f4e',
  DB_NAME= 'd3h6g6hk79h4cn',
  DB_HOST= 'ec2-3-234-131-8.compute-1.amazonaws.com',
  DB_PORT= '5432'
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_development`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres"
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_development`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres"
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: `${DB_NAME}_production`,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres"
  }
}
