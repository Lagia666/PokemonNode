import {Router} from "express";
import {Pokemon, Trainer} from "./Pokemontrainer.js";
const pokemon = Router()


pokemon.post('/pokemons', async (req, res) => {
    const newPokemon = {
        species: req.body.species,
        name: req.body.name,
        level: req.body.level,
        gender: req.body.gender,
        height: req.body.height,
        weight: req.body.weight,
        shiny: req.body.shiny,
        trainerId: req.body.trainerId
    };
    const myPokemon = await Pokemon.create(newPokemon);
    res.send(`Successfully created pokemon with name: ${newPokemon.firstname} ${newPokemon.lastname}`);
});


pokemon.get('/pokemons', async (req, res) => {
    res.send( await Pokemon.findAll());
});



pokemon.get('/pokemons/:id', async (req, res) => {
    const pokemon = await pokemon.findByPk(req.params.id);
    if (!pokemon) return res.status(404).send('The pokemon with the given ID was not found.');
    res.send(pokemon);
});


pokemon.put('/pokemons/:id', async (req, res) => {
    const pokemon = await Pokemon.findByPk(parseInt(req.params.id));
    if (!pokemon) return res.status(404).send('The pokemon with the given ID was not found.');
    pokemon.set({ species: req.body.species});
    pokemon.set({ name: req.body.name});
    pokemon.set({ level: req.body.level});
    pokemon.set({ gender: req.body.gender});
    pokemon.set({ height: req.body.height});
    pokemon.set({ weight: req.body.weight});
    pokemon.set({ shiny: req.body.shiny});
    await pokemon.save()
    res.send(`Successfully updated pokemon`);
});

pokemon.patch('/pokemons/:id', async (req, res) => {
    const pokemon = await pokemon.findByPk(parseInt(req.params.id));
    if (!pokemon) return res.status(404).send('The pokemon with the given ID was not found.');
    pokemon.set({ species: req.body.species});
    pokemon.set({ name: req.body.name});
    pokemon.set({ level: req.body.level});
    pokemon.set({ gender: req.body.gender});
    pokemon.set({ height: req.body.height});
    pokemon.set({ weight: req.body.weight});
    pokemon.set({ shiny: req.body.shiny});
    await pokemon.save()
    res.send(`Successfully updated pokemon`);
});


pokemon.delete('/pokemons/:id', async (req, res) => {
    await Pokemon.destroy({where: {id: req.params.id}});
    res.send(`Successfully deleted pokemon`);
});

export default pokemon