

export default function GameCard({ videogame }) {

  return (
    <div className='videogame-card'>
      <h2>{videogame.title}</h2>
      <h3>{videogame.category}</h3>
      <p>{videogame.description}</p>
      <img src={videogame.image} alt={videogame.title} />
      <p>Release Date: {new Date(videogame.releaseDate).toLocaleDateString()}</p>
      <p>Rating: {videogame.rating}</p>
      <p>Descrizione: {videogame.desciption}</p>
      <p>Prezzo: {videogame.price} €</p>
    </div>
  );
}