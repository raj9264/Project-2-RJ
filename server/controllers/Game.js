//replaced pretty much every "Domo" with "Game"
const models = require('../models');
const Game = models.Game;


const addGame = async (req, res) => {
    console.log(req.body);
    if(!req.body.title || !req.body.status || req.body.hours === undefined) {
        return res.status(400).json({ error: 'Fill in all fields' });
    }

    const gameData = {
        title: req.body.title,
        hours: req.body.hours,
        status: req.body.status,
        rating: req.body.rating || null,
        owner: req.session.account._id,
    };

    try {
        const newGame = new Game(gameData);
        await newGame.save();

        return res.status(201).json({ game: newGame });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'Could not add game' });
    }
};

const getGames = async (req, res) => {
    try{
        const query = {owner: req.session.account._id};
        const games = await Game.find(query).lean().exec();

        return res.json({games});
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'Could not retrieve games'});
    }
};

module.exports = {
    addGame,
    getGames,
};
