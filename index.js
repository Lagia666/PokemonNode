import trainer from "./TrainerManager.js";
import pokemon from "./PokemonManager.js";
import express from "express";
import {OauthRouter} from "./Oauth.js";
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './Swagger.json' assert {type: 'json'}
import bcrypt from "bcrypt";

const app = express()
//Trainer.create({firstname: "Leo", lastname: 'Pokemaniac', age: 23, login: "leopkmn", password: bcrypt.hash("cynthia", 5), role: "ADMIN"})
app.use(express.json())
app.use(trainer)
app.use(pokemon)
app.use(OauthRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(8080, () => { console.log("The server listens on port 8080")})