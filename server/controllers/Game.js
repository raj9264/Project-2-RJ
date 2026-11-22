//replaced pretty much every "Domo" with "Game"
const models = require('../models');
const Game = models.Game;


const addGame = async (req, res) => {
    if(!req.body.title || !req.body.age || req.body) {
        return res.status(400).json({ error: 'error!! (placeholder)' });
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
            return res.status(400).json({ error: 'error!!! (placeholder)' });
    }
};

const getGames = async (req, res) => {
    try{
        const query = {owner: req.session.account._id};
        const games = await Game.find(query).select('name age').lean().exec();

        return res.json({games});
    } catch (err) {
        console.log(err);
        return res.status(500).json({error: 'error!!!! (placeholder)'});
    }
};

module.exports = {
    addGame,
    getGames,
};
