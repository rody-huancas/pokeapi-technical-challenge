import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import { useStoreApi } from "@/store/store";

import { Pagination } from "@/components/home/PaginationPokemon";
import { ModalAlert } from "@/components/ModalAlert";
import { CardPokemon } from "@/components/home/CardPokemon";
import { LoaderPokemon } from "@/components/LoaderPokemon";
import { getPokemons, getPokemonsPagination } from "@/api/pokemonApi";

export const HomePage = () => {
  const search = useStoreApi((state) => state.search);
  const setSearch = useStoreApi((state) => state.setSearch);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const { data: pokemonData, isLoading: pokemonLoading } = useQuery({
    queryKey: ["pokemons", pageUrl],
    queryFn: () => (pageUrl ? getPokemonsPagination(pageUrl) : getPokemons()),
    retry: false,
  });

  const filteredResults = pokemonData?.results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setSearch("");
  };

  useEffect(() => {
    if (initialLoad && !pokemonLoading && filteredResults && filteredResults.length === 0) {
      setIsModalOpen(true);
      setInitialLoad(false);
    }
  }, [initialLoad, pokemonLoading, filteredResults]);

  useEffect(() => {
    setInitialLoad(true);
  }, [search]);

  if (pokemonLoading && !pokemonData) return <LoaderPokemon />;

  return (
    <section className="pokemons">
      <div className="pokemons__container">
        {filteredResults && filteredResults.length > 0 && (
          filteredResults.map((pokemon) => (
            <CardPokemon key={pokemon.url} pokemonResult={pokemon} />
          ))
        )}
      </div>

      <Pagination
        nextPageUrl={pokemonData?.next || null}
        prevPageUrl={pokemonData?.previous || null}
        setPageUrl={setPageUrl}
      />

      <ModalAlert
        isOpen={isModalOpen}
        onClose={closeModal}
        title="¡Error!"
        message="No se encontraron Pokemones que coincidan con la búsqueda."
      />
    </section>
  );
};
