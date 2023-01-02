import { DataTypes, Model } from 'sequelize'
import Database from './Datalink.js'

class Trainer extends Model {}

Trainer.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        firstname: {
            type: DataTypes.STRING(12),
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING(12),
            allowNull: false,
        },
        login: {
            type: DataTypes.STRING(12),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(512),
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: Database,
        tableName: 'Trainer',
        timestamps: false,
        freezeTableName: true
    })


class Pokemon extends Model {}


Pokemon.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    trainerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {model: Trainer, key: "id"},
    },
    species: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    gender: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    height: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    shiny: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
},
    {
        sequelize: Database,
        tableName: 'PokemonTrainer',
        timestamps: false,
        freezeTableName: true
})
Pokemon.belongsTo(Trainer, {as: "trainer", foreignKey: "trainerId"})
Trainer.hasMany(Pokemon, {as: "pokemon", foreignKey: "trainerId"})



export {Trainer, Pokemon}
