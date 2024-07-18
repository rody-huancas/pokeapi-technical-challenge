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
      <section className="detail">
        <div className="detail__header">
          <h2 className="detail__title">{name}</h2>
          <div className="detail__number">N° {data.id}</div>
        </div>

        <div className="detail__content">
          <div className="detail__image">
            <img
              className="detail__image-src"
              src={data.sprites.other?.["official-artwork"].front_default}
              alt={name}
            />
          </div>

          <div className="detail__info">
            <div className="detail__row">
              <div className="detail__label">Altura:</div>
              <div className="detail__value">{data.height / 10} metros</div>
            </div>
            <div className="detail__row">
              <div className="detail__label">Peso:</div>
              <div className="detail__value">{data.weight / 10} kilogramos</div>
            </div>
            <div className="detail__row">
              <div className="detail__label">Habilidades:</div>
              <div className="detail__value">
                {data.abilities
                  .map((ability) => ability.ability.name)
                  .join(", ")}
              </div>
            </div>
            <div className="detail__row">
              <div className="detail__label">Tipos:</div>
              <div className="detail__value">
                {data.types.map((type) => type.type.name).join(", ")}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
};
