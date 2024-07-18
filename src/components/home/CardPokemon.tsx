import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemonById } from "@/api/pokemonApi";
import { ResultPokemon } from "@/config/interfaces";
import { useNavigate } from "react-router-dom";

type CardPokemonProps = {
  pokemonResult: ResultPokemon;
  types: string[]; // Tipos de Pokémon seleccionados
};

export const CardPokemon: React.FC<CardPokemonProps> = ({
  pokemonResult,
  types,
}) => {
  const navigate = useNavigate();

  const { name, url } = pokemonResult;

  const { data, isLoading } = useQuery({
    queryKey: ["getPokemon", url],
    queryFn: () => getPokemonById(url),
  });

  if (isLoading) return <div>Loading...</div>;

  if (data) {
    const pokemonTypes = data.types.map((type) => type.type.name);

    // Verificar si el Pokémon tiene al menos uno de los tipos seleccionados
    const hasSelectedTypes =
      types.length === 0 || types.some((type) => pokemonTypes.includes(type));

    // Si no tiene ninguno de los tipos seleccionados, no renderizar
    if (!hasSelectedTypes) return null;

    return (
      <div
        className="pokemon-card"
        onClick={() => navigate(`/pokemon/${name}`)}
      >
        <h2>{name}</h2>
        <img src={data.sprites.front_default} alt={name} />
        <p>Height: {data.height}</p>
        <p>Weight: {data.weight}</p>
        <p>Base Experience: {data.base_experience}</p>
        <p>Types: {pokemonTypes.join(", ")}</p>
      </div>
    );
  }

  return <div>Error fetching Pokémon data</div>;
};
