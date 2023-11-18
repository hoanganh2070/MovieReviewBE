import { Injectable, OnModuleInit } from "@nestjs/common";
import * as process from "process";
import axios from "axios";

@Injectable()
export class MovieService implements OnModuleInit{

  private static ACCESS_TOKEN : string;

  onModuleInit(): any {
    MovieService.ACCESS_TOKEN = process.env.TOKEN;
  }
  async getTopRatedMovies(): Promise<object> {
    return axios.get(
      "https://api.themoviedb.org/3/movie/top_rated",
      {
        headers: {
          accept: "application/json",
          Authorization: MovieService.ACCESS_TOKEN
        }
      }
    ).then((response) => {
      return response.data;
    });
  }

  async getTrending(): Promise<object> {
    return axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      {
        headers: {
          accept: "application/json",
          Authorization: MovieService.ACCESS_TOKEN
        }
      }
    ).then((response) => {
      return response.data;
    });
  }
  async getMovieById(id: number): Promise<object> {
    const url = "https://api.themoviedb.org/3/movie/" + id;
    return axios.get(
      url,
      {
        headers: {
          accept: "application/json",
          Authorization: MovieService.ACCESS_TOKEN
        }
      }
    ).then((response) => {
      return response.data;
    });
  }
  async getMovieVideos(id : number): Promise<string> {
    const url = "https://api.themoviedb.org/3/movie/" + id + "/videos";
    return axios.get(
      url,
      {
        headers: {
          accept: "application/json",
          Authorization: MovieService.ACCESS_TOKEN
        }
      }
    ).then((response) => {
      for(let object of response.data['results']){
        if(object['type'] == 'Trailer'){
          return object['key'];
        }
      }
    });

  }
  async getMovieCredits(id : number): Promise<object> {
    const url = "https://api.themoviedb.org/3/movie/ "+ id + "/credits";
    return axios.get(
      url,
      {
        headers: {
          accept: "application/json",
          Authorization: MovieService.ACCESS_TOKEN
        }
      }
    ).then((response) => {
      return response.data;
    });

  }


  async getMovieImages(id : number): Promise<object> {
    const url = "https://api.themoviedb.org/3/movie/ "+ id + "/images";
    return axios.get(
      url,
      {
        headers: {
          accept: "application/json",
          Authorization: MovieService.ACCESS_TOKEN
        }
      }
    ).then((response) => {
      return response.data;
    });

  }

  async getUpComingMovies(): Promise<object> {
    return axios.get(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      {
        headers: {
          accept: "application/json",
          Authorization: MovieService.ACCESS_TOKEN
        }
      }
    ).then((response) => {
      return response.data;
    });
  }


}
