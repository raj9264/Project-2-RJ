const React = require('react');
const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const GameForm = (props) => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = e.target.querySelector('#gameTitle').value;
        const hours = e.target.querySelector('#gameHours').value;
        const status = e.target.querySelector('#gameStatus').value;

        if (!title || hours === '') {
            props.setError('Please fill in all required fields.');
            return;
        }

        const response = await fetch('/addGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                hours: Number(hours),
                status,
            }),
        });

        const data = await response.json();

        if (data.error) {
            props.setError(data.error);
            return;
        }

        e.target.reset();
        props.setError('');
        props.triggerReload();
    };

    return (
        <section className="gameForm">
            <h2>Add a Game</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="gameTitle">Game Title</label>
                <input id="gameTitle" type="text" placeholder="Enter game title" />

                <label htmlFor="gameHours">Hours Played</label>
                <input id="gameHours" type="number" min="0" step="1" placeholder="0" />

                <label htmlFor="gameStatus">Status</label>
                <select id="gameStatus">
                    <option value="Backlog">Backlog</option>
                    <option value="Playing">Playing</option>
                    <option value="Completed">Completed</option>
                </select>

                <button type="submit">Add Game</button>
            </form>
        </section>
    );
};

const GameCard = (props) => {
    const game = props.game;

    return (
        <article className="gameCard">
            <h3>{game.title}</h3>
            <p>{game.hours} hours played</p>
            <p>Status: {game.status}</p>
        </article>
    );
};

const GameList = (props) => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const loadGames = async () => {
            const response = await fetch('/getGames');
            const data = await response.json();

            if (response.ok) {
                setGames(data.games);
            }
        };

        loadGames();
    }, [props.reloadGames]);

    if (games.length === 0) {
        return <p className="emptyGames">No games in your library yet.</p>;
    }

    return (
        <div className="gameList">
            {games.map((game) => (
                <GameCard key={game._id} game={game} />
            ))}
        </div>
    );
};

const App = () => {
    const [reloadGames, setReloadGames] = useState(false);
    const [error, setError] = useState('');

    return (
        <main className="gameLibrary">
            <header className="libraryHeader">
                <p>PROJECT 2</p>
                <h1>My Game Library</h1>
                <p>Keep track of the games you play.</p>
            </header>

            {error && <p className="errorMessage">{error}</p>}

            <GameForm
                setError={setError}
                triggerReload={() => setReloadGames(!reloadGames)}
            />

            <section className="librarySection">
                <h2>Your Games</h2>
                <GameList reloadGames={reloadGames} />
            </section>
        </main>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;