import { useQueryClient } from "@tanstack/react-query";

import { PaginationButton } from "./PaginationButton";
import { getPokemonsPagination } from "@/api/pokemonApi";

interface PaginationProps {
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  setPageUrl: (url: string | null) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ nextPageUrl, prevPageUrl, setPageUrl }) => {
  const queryClient = useQueryClient();

  const handleNext = async () => {
    if (nextPageUrl) {
      const nextData = await getPokemonsPagination(nextPageUrl);
      queryClient.setQueryData(["pokemons", nextPageUrl], nextData);
      setPageUrl(nextPageUrl);
    }
  };

  const handlePrev = async () => {
    if (prevPageUrl) {
      const prevData = await getPokemonsPagination(prevPageUrl);
      queryClient.setQueryData(["pokemons", prevPageUrl], prevData);
      setPageUrl(prevPageUrl);
    }
  };

  return (
    <div className="pagination">
      <PaginationButton direction="next" onClick={handleNext} disabled={!nextPageUrl} />
      <PaginationButton direction="prev" onClick={handlePrev} disabled={!prevPageUrl} />
    </div>
  );
};
