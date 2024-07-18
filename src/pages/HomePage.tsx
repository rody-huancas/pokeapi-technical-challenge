import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPokemons, getPokemonsPagination, getPokemonTypes } from "@/api/pokemonApi";
import { LoaderPokemon } from "@/components/LoaderPokemon";
import { CardPokemon } from "@/components/home/CardPokemon";

export const HomePage = () => {
  const [pageUrl, setPageUrl] = useState<string | null>(null);
  const [inputSearchTerm, setInputSearchTerm] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]); // Estado para los tipos seleccionados
  const queryClient = useQueryClient();

  // Consulta para obtener la lista de Pokémon
  const { data: pokemonData, isLoading: pokemonLoading } = useQuery({
    queryKey: ["pokemons", pageUrl],
    queryFn: () => (pageUrl ? getPokemonsPagination(pageUrl) : getPokemons()),
    retry: false,
  });

  // Consulta para obtener la lista de tipos de Pokémon
  const { data: typesData, isLoading: typesLoading } = useQuery({
    queryKey: ["pokemonTypes"],
    queryFn: getPokemonTypes,
  });

  // Filtrar resultados de Pokémon según el término de búsqueda y tipos seleccionados
  const filteredResults = pokemonData?.results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejador para actualizar el término de búsqueda
  const handleSearch = () => {
    setSearchTerm(inputSearchTerm);
  };

  // Manejador para avanzar a la siguiente página de Pokémon
  const handleNext = async () => {
    if (pokemonData?.next) {
      const nextData = await getPokemonsPagination(pokemonData.next);
      queryClient.setQueryData(["pokemons", pokemonData.next], nextData);
      setPageUrl(pokemonData.next);
    }
  };

  // Manejador para retroceder a la página anterior de Pokémon
  const handlePrev = async () => {
    if (pokemonData?.previous) {
      const prevData = await getPokemonsPagination(pokemonData.previous);
      queryClient.setQueryData(["pokemons", pokemonData.previous], prevData);
      setPageUrl(pokemonData.previous);
    }
  };

  if (pokemonLoading && !pokemonData) return <LoaderPokemon />;
  if (typesLoading && !typesData) return <div>Loading types...</div>;

  return (
    <section className="pokemons">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Pokémon"
          value={inputSearchTerm}
          onChange={(e) => setInputSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Mostrar tipos disponibles para filtrar */}
      <div className="filter-types">
        {typesData && typesData.results.map((type) => (
          <label key={type.name}>
            <input
              type="checkbox"
              value={type.name}
              checked={selectedTypes.includes(type.name)}
              onChange={(e) => {
                const typeName = e.target.value;
                if (e.target.checked) {
                  setSelectedTypes((prevTypes) => [...prevTypes, typeName]);
                } else {
                  setSelectedTypes((prevTypes) =>
                    prevTypes.filter((type) => type !== typeName)
                  );
                }
              }}
            />
            {type.name}
          </label>
        ))}
      </div>

      {/* Mostrar resultados filtrados de Pokémon */}
      <div className="pokemons__container">
        {filteredResults && filteredResults?.length > 0 ? (
          filteredResults.map((pokemon) => (
            <CardPokemon
              key={pokemon.url}
              pokemonResult={pokemon}
              types={selectedTypes}
            />
          ))
        ) : (
          <p>No Pokémon found</p>
        )}
      </div>

      {/* Botones de paginación */}
      <div>
        <button onClick={handlePrev} disabled={!pokemonData?.previous}>
          Prev
        </button>
        <button onClick={handleNext} disabled={!pokemonData?.next}>
          Next
        </button>
      </div>
    </section>
  );
};
