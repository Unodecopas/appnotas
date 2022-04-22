require('dotenv').config()
const {getConnection} = require('./db')
const logger = require('npmlog')
const { random } = require("lodash")
const faker = require("faker/locale/es");
let connection

async function main(){
    try {
        connection = await getConnection()
    
        //delete tables
        logger.info(__filename, "Borrando tablas...")
        await connection.query('drop table if exists notes')
        await connection.query('drop table if exists categories')
        await connection.query('drop table if exists users')
        
        //create tables CATEGORIES, USERS, PRODUCTS
        logger.info(__filename, "Creando tablas")
        await connection.query(
            `
            CREATE TABLE categories(
                id int unsigned not null primary key auto_increment,
                name char(200) not null
            )
        `)
        await connection.query(
            `
            CREATE TABLE users(
                id int unsigned not null primary key auto_increment,
                username char(200) not null unique,
                password char(200) not null,
                name char(200) not null,
                lastname char(200) not null,
                logged boolean DEFAULT false,
                role ENUM("normal", "admin") default "normal" not null
            )
            `
        )
        await connection.query(
            `
            CREATE TABLE notes(
                id int unsigned not null primary key auto_increment,
                title char(200) not null,
                description char(200) not null,
                public boolean default false,
                img tinytext,
                userID int unsigned not null,
                categoryID int unsigned not null,
                foreign key (userID) references users(id),
                foreign key (categoryID) references categories(id)
            )
            `

        )

        /* INTRODUCIENDO DATOS DE PRUEBA */
        
        //admin user
        await connection.query(
            `
            insert into users
            (username, password, name, lastname, role)
            values
            ("unodecopas", "eres", "Jesus", "Gallardo", "admin")
            `
        )
        await connection.query(
            `
            insert into users
            (username, password, name, lastname, role)
            values
            ("nitagreen", "green", "Ana", "Gonzalez", "admin")
            `
        )
        //users 
        const users = 5
        for (let i = 0; i < users; i++) {
            const name = faker.name.firstName()
            const username = faker.internet.userName()
            const lastname = faker.name.lastName()
            const password = faker.internet.password()
            await connection.query(
                `
                insert into users
                (username, password, name, lastname)
                values
                ("${username}","${password}","${name}","${lastname}")
                `
            )
            
        }
        //categories
        const categoriesNames = ["NODE", "REACT", "MySQL"]
        for (let i = 0; i<categoriesNames.length; i++){
            await connection.query(
                `
                insert into categories
                (name)
                values
                ("${categoriesNames[i]}")
                `
            )
        }

        //notes
        const notes = 10
        for (let i = 0; i < notes; i++) {
            const title = faker.lorem.sentence()
            const description = faker.lorem.sentence()
            const userID = Math.floor(Math.random()*5 +1)
            const categoryID = Math.floor(Math.random()*3+1)

            await connection.query(
                `
                insert into notes
                (title, description, userID, categoryID)
                values
                ("${title}","${description}",${userID},${categoryID})
                `
            )
            
        }
       
    } catch (error) {
        logger.error(error)
    }finally{
        logger.info(__filename, "Conexion liberada")
        if (connection) connection.release()
        process.exit()
    }


}

main()