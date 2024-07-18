import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useStoreApi } from "@/store/store";
import { ResultPokemon } from "@/config/interfaces";
import { getPokemonById } from "@/api/pokemonApi";

type CardPokemonProps = {
  pokemonResult: ResultPokemon;
};

export const CardPokemon: React.FC<CardPokemonProps> = ({ pokemonResult }) => {
  const navigate = useNavigate();
  const selectedTypes = useStoreApi((state) => state.selectedTypes);

  const { data, isLoading } = useQuery({
    queryKey: ["getPokemon", pokemonResult.url],
    queryFn: () => getPokemonById(pokemonResult.url),
  });

  if (isLoading) return <div>Cargando...</div>;

  if (data) {
    const pokemonTypes = data.types.map((type) => type.type.name);
    const hasSelectedTypes =
      selectedTypes.length === 0 ||
      selectedTypes.some((type) => pokemonTypes.includes(type));

    if (!hasSelectedTypes) return null;

    const primaryType = pokemonTypes[0];

    return (
      <div
        className={`card__pokemon ${primaryType}`}
        onClick={() => navigate(`/pokemon/${pokemonResult.name}`)}
      >
        <div className="card__body">
          <h2 className="card__title">{pokemonResult.name}</h2>
          <img
            className="card__img"
            src={data.sprites.other?.["official-artwork"].front_default}
            alt={pokemonResult.name}
          />
        </div>
        <p>Types: {pokemonTypes.join(", ")}</p>
      </div>
    );
  }

  return <div>Error al obtener los datos</div>;
};
