import {Router} from "express";
import {Trainer} from "./PokemonTrainer.js";
import bcrypt from "bcrypt";
const trainer = Router()


trainer.post('/trainers', async (req, res) => {
    const newTrainer = {
        login: req.body.login,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        age: req.body.age,
        password: await bcrypt.hash(req.body.password, 5)
    };
    await Trainer.create(newTrainer);
    res.send(`Successfully created trainer with name: ${newTrainer.firstname} ${newTrainer.lastname}`);
});


trainer.get('/trainers', async (req, res) => {
    res.send( await Trainer.findAll());
});



trainer.get('/trainers/:id', async (req, res) => {
    const trainer = await Trainer.findByPk(req.params.id);
    if (!trainer) return res.status(404).send('The trainer with the given ID was not found.');
    res.send(trainer);
});


trainer.put('/trainers/:id', async (req, res) => {
    const trainer = await Trainer.findByPk(parseInt(req.params.id));
    if (!trainer) return res.status(404).send('The trainer with the given ID was not found.');
    trainer.set({ firstname: req.body.firstname});
    trainer.set({ lastname: req.body.lastname});
    trainer.set({ login: req.body.login});
    trainer.set({ age: req.body.age});
    trainer.set({ password: await bcrypt.hash(req.body.password, 5)});
    await trainer.save()
    res.send(`Successfully updated trainer with name: ${trainer.firstname} ${trainer.lastname}`);
});

trainer.patch('/trainers/:id', async (req, res) => {
    const trainer = await Trainer.findByPk(parseInt(req.params.id));
    if (!trainer) return res.status(404).send('The trainer with the given ID was not found.');
    trainer.set({ firstname: req.body.firstname});
    trainer.set({ lastname: req.body.lastname});
    trainer.set({ login: req.body.login});
    trainer.set({ age: req.body.age});
    trainer.set({ password: await bcrypt.hash(req.body.password, 5)});
    await trainer.save()
    res.send(`Successfully updated trainer with name: ${trainer.firstname} ${trainer.lastname}`);
});


trainer.delete('/trainers/:id', async (req, res) => {
    await Trainer.destroy({where: {id: req.params.id}});
    res.send(`Successfully deleted trainer`);
});

export default trainer