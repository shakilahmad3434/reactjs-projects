import React, { useState, useEffect } from "react";
import PokemonCard from "./components/PokemonCard";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=6"
  );
  const [loading, setLoading] = useState(false);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await fetch(nextUrl);
      const data = await response.json();

      // Fetch additional details for each Pokémon
      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );

      setPokemonList([...pokemonList, ...detailedPokemon]);
      setNextUrl(data.next);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Pokédex</h1>
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
        {pokemonList.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </div>
      {nextUrl && (
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#2196F3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={fetchPokemon}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load more Pokémon"}
        </button>
      )}
    </div>
  );
};

export default App;
