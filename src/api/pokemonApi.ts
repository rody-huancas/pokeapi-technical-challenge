import { PokemonInterface, PokemonResultInterface } from "@/config/interfaces";
import api from "@/lib/axios";

import { isAxiosError } from "axios";

export async function getPokemons() {
  try {
    const { data } = await api.get<PokemonResultInterface>("/pokemon");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function getPokemonById(url: string) {
  try {
    const { data } = await api.get<PokemonInterface>(url);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function getPokemonByName(name: string) {
  try {
    const url = `/pokemon/${name}`;
    const { data } = await api.get<PokemonInterface>(url);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function getPokemonsPagination(url: string) {
  try {
    const { data } = await api.get<PokemonResultInterface>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}

export async function getPokemonTypes() {
  try {
    const { data } = await api.get<PokemonResultInterface>("/type");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
}
