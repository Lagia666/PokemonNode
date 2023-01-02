import { Sequelize } from 'sequelize'

const Database = new Sequelize (
    'PC_DE_LEO',
        'root',
    'Toto',
    {
        host: 'localhost',
        dialect:'mysql',
    },
);


(async () => {
    try{
        await Database.authenticate()
        await Database.sync({force: true})
        console.log('Database is up')
    } catch (error) {
        console.log(error)
    }
})()

export default Database