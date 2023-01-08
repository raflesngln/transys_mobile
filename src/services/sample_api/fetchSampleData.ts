import axios from "axios";
import { useState, useEffect } from 'react';
import { useInfiniteQuery } from "@tanstack/react-query";
import {BASE_URL} from '@services/variableKEY'

const fetchDogs = async ({ limit, page }:any) => {
  const pencarian='';//(props.search==null)?"":props.search;
  const token='wertfhgjhfdsdfdg';
  let configParams = {
    headers: {'Authorization': 'Bearer '+token,'Content-Type':'application/json'},
    params: {
      page:'props.page',
      per_page:'props.perpage',
      sortby:'props.sortby',
      sortbytype:'props.sortbytype',
      search:pencarian
    },
  }

  const respon = await axios.get(`https://api.thedogapi.com/v1/breeds?limit=${limit}&page=${page}`,configParams);
  return respon?.data;
};


const fetchPokemon = async ({
  pageParam = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=10"
}) => {
  const request = await fetch(pageParam);
  const { results, next } = await request.json();
  return { response: results, nextPage: next };
};

// const fetchDogsInfinity = async ({
//   pageParam = `https://api.thedogapi.com/v1/breeds?limit=${limit}&page=${page}`
// }) => {
//   const request = await fetch(pageParam);
//   const { results, next } = await request.json();
//   return { response: results, nextPage: next };
// };

function fetchDogsInfinity() {
  const getDogs = async ({ pageParam = 0 }) => {
    const res = await (
      await fetch(
        `https://api.thedogapi.com/v1/breeds?limit=10&page=${pageParam}`
      )
    ).json();

    return {
      data: res,
      nextPage: pageParam + 1,
    };
  };

  return useInfiniteQuery(["dogs"], getDogs, {
    getNextPageParam: (lastPage:any) => {
      if (lastPage.data.length < 10) return undefined;

      return lastPage.nextPage;
    },
  });
}

const fetchDogSingle = async ({ id}:any) => {
  const pencarian=''; 
  const token='wertfhgjhfdsdfdg';
  let configParams = {
    headers: {'Authorization': 'Bearer '+token,'Content-Type':'application/json'},
    params: {
      page:'props.page',
      per_page:'props.perpage',
      sortby:'props.sortby',
      sortbytype:'props.sortbytype',
      search:pencarian
    },
  }

  const respon = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`,configParams);
  return respon?.data;
};


export{
  fetchDogs,
  fetchPokemon,
  fetchDogsInfinity,
  fetchDogSingle
}