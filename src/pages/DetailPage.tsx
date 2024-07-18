import { getPokemonByName } from "@/api/pokemonApi";
import { LoaderPokemon } from "@/components/LoaderPokemon";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const DetailPage = () => {
  const params = useParams();
  const name = params.name!;

  const { data, isLoading } = useQuery({
    queryKey: ["pokemonDetail", name],
    queryFn: () => getPokemonByName(name),
  });

  if (isLoading) return <LoaderPokemon />;

  if (data)
    return (
      <div>
        <h2>{name}</h2>

        <img src={data.sprites.front_default} alt={name} />

        <p>Height: {data.height} decimeters</p>
        <p>Weight: {data.weight} hectograms</p>
      </div>
    );
};
