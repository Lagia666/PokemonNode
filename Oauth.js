import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {Router} from 'express'
import {Trainer} from "./PokemonTrainer.js";


const OauthRouter = Router()

const acceptedScopes = ['USER', 'ADMIN']
const authorisationCode = 'OAUTH_TEST_APP_ACCEPTED'
const acceptedClientId = 'OAUTH_TEST_APP'
const acceptedClientSecret = 'OAUTH_TEST_APP_SECRET'

OauthRouter.get('/authorize', (req, res) => {
    const queryParams = req.query

    if (queryParams.Trainer.id !== acceptedClientId) {
        return res.status(401).send({error: 'Application is not authorized'})
    }
    if (!queryParams.redirect_utl ) {
        return res.status(400).send({error: 'No redirect URL provided'})
    }
    if (!acceptedScopes.includes(queryParams.scopes)) {
        return res.status(400).send({error: 'No user scopes provided'})
    }
    return res.redirect(`${queryParams.redirect_url}?autorization_codes${authorisationCode}` )
})

OauthRouter.post('/oauth/token', async (req, res) => {
    const queryParams = req.query
    const { login, password, scopes} = req.body

    if (queryParams.client.id !== acceptedClientId || queryParams.client.secret !== acceptedClientSecret){
        return res.status(401).send({error: 'Application is not authorized'})
    }
    if (!queryParams.code) {
        return res.status(400).send({error: 'No authorization code provided'})
    }

    const trainer = await Trainer.findOne({
        where: {
            login,
        },
    })
    if (!user) {
        return res.status(404).send({error: 'User not found'})
    }
    if (!bcrypt.compareSync(password, Trainer.password)){
        return res.status(401).send({error: 'login or password is wrong'})
    }
    const accesToken = jwt.sign({
        id: Trainer.id,
        scopes
        },
        'ServerInternalPrivateKey',
        {expiresIn: '10m' },
        )
    return res.status(200).send({accesToken, tokenType: 'Bearer', expiresIn: '10m'})
})


const chackAuthorization = async (req, res, next) => {
    const authorization = req.headers['authorization']

    if(!authorization){
        return res.status(401).send({error: 'You are not connected'})
    }
    const bearerToken = authorization.split('')
    if(bearerToken.length !==2 || bearerToken[0 !== 'Bearer']){
        return res.status(401).send({error: 'Invalidtoken type'})
    }
    try {
        res.locals.requestor = await jwt.verify(bearerToken[1], 'ServerInternalPrivateKey')
    } catch (err) {
        if(err instanceof jwt.TokenExpiredError) {
            return res.redirect('/')
        }
        return res.status(500).send(err)
    }
    next()
}

const isUserAdmin = async( req, res, next) => {
    const trainer = await Trainer.findById(res.locals.requestor.id)
    if (!trainer){
        return res.status(404).send('User not found')
    }
    if (!Trainer.hasScope(trainer, 'ADMIN')) {
        return res.status(403).send({error: 'You dont have the privilege to do this action'})
    }
    next()
}

export {OauthRouter, chackAuthorization, isUserAdmin}
