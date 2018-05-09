module.exports = {
    server: {
        port: 3000
    },
    mysql: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        passwd: 'root',
        database: 'test',
        connectionLimit: 10
    },
    mongodb: {
        user: "user",
        password: "password",
        host: 'localhost',
        port: '27017',
        database: 'test'
    },
    redis: {
        port: '6379', 
        host: "localhost",
        password: 'password'
    }
};  