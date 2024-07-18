import { useStoreApi } from "@/store/store";
import { useState } from "react";

export const Header = () => {
  const setSearch = useStoreApi((state) => state.setSearch);

  const [inputSearchTerm, setInputSearchTerm] = useState<string>("");
  const handleSearch = () => {
    setSearch(inputSearchTerm);
  };

  return (
    <header className="header">
      <input
        type="text"
        placeholder="Buscar Pokemón"
        className="header__input"
        value={inputSearchTerm}
        onChange={(e) => setInputSearchTerm(e.target.value)}
        onKeyDown={(e) => { e.key === "Enter" && handleSearch() }}
      />
      <button className="header__button" onClick={handleSearch}>
        Buscar
      </button>
    </header>
  );
};
