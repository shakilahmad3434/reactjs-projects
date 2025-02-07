import React from "react";

const PokemonCard = ({ pokemon }) => {
  const { name, id, sprites, types } = pokemon;

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-[200px] m-[10px] p-[15px] border rounded text-center shadow-md hover:shodow-xl"
    >
      <img
        src={sprites.front_default}
        alt={name}
        style={{ width: "100px", height: "100px" }}
      />
      <p style={{ fontSize: "14px", color: "#666" }}>#{id.toString().padStart(3, "0")}</p>
      <h3 style={{ margin: "10px 0", fontSize: "18px", color: "#333" }}>{name}</h3>
      <div>
        {types.map((type, index) => (
          <span
            key={index}
            style={{
              display: "inline-block",
              margin: "2px",
              padding: "5px 10px",
              fontSize: "12px",
              color: "#fff",
              backgroundColor: getTypeColor(type.type.name),
              borderRadius: "5px",
            }}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

// Helper function to determine type color
const getTypeColor = (type) => {
  const colors = {
    fire: "#F08030",
    water: "#6890F0",
    grass: "#78C850",
    electric: "#F8D030",
    bug: "#A8B820",
    flying: "#A890F0",
    poison: "#A040A0",
    normal: "#A8A878",
    ground: "#E0C068",
    psychic: "#F85888",
    rock: "#B8A038",
    steel: "#B8B8D0",
    ice: "#98D8D8",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    fairy: "#EE99AC",
  };
  return colors[type] || "#777";
};

export default PokemonCard;
