import { getPokemonTypes } from "@/api/pokemonApi";
import { useStoreApi } from "@/store/store";
import { useQuery } from "@tanstack/react-query";

export const Sidebar = () => {
  const selectedTypes = useStoreApi((state) => state.selectedTypes);
  const setSelectedTypes = useStoreApi((state) => state.setSelectedTypes);

  const { data: typesData, isLoading: typesLoading } = useQuery({
    queryKey: ["pokemonTypes"],
    queryFn: getPokemonTypes,
  });

  if (typesLoading) return <div>Cargando...</div>;

  return (
    <aside className="sidebar">
      <h3 className="sidebar__title">Filtros</h3>
      {typesData &&
        typesData.results.map((type) => (
          <label key={type.name} className="sidebar__label">
            <input
              className="sidebar__input"
              type="checkbox"
              value={type.name}
              checked={selectedTypes.includes(type.name)}
              onChange={(e) => {
                const typeName = e.target.value;
                setSelectedTypes((prevTypes) =>
                  e.target.checked
                    ? [...prevTypes, typeName]
                    : prevTypes.filter((type) => type !== typeName)
                );
              }}
            />
            {type.name}
          </label>
        ))}
    </aside>
  );
};
