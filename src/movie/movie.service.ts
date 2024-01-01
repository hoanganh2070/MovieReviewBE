import { Injectable, OnModuleInit } from "@nestjs/common";
import * as process from "process";
import axios from "axios";
import {WatchlistRepository} from "./watchlist.repository";
import {WatchList} from "./watchlist";
import {RateRepository} from "./rate.repository";
import {Rate} from "./rate";

@Injectable()
export class MovieService implements OnModuleInit{

  private static ACCESS_TOKEN : string;
  private watchlistRepository: WatchlistRepository;
  private rateRepository: RateRepository;


  //Init your access token here
  onModuleInit(): void {
    MovieService.ACCESS_TOKEN = process.env.TOKEN;
  }

  constructor(wathlistRepository: WatchlistRepository,rateRepository: RateRepository) {
    this.watchlistRepository = wathlistRepository;
    this.rateRepository = rateRepository;
  }

  //Get the top rated movies
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

    //Get the trending movies
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


    //Get the movie by id
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

    //Get the movie's videos
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
    //Get the movie's credits
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



    //Get the movie's images
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

        //Get the upcoming movies
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

     //Search movie by title
  async searchMovie(query : string) : Promise<object> {
    return axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
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


  async  addMovieToWatchlist(movie : WatchList) : Promise<void> {
      await this.watchlistRepository.save(movie);
  }

  async getMoviesFromWatchlist(movieId : number,accountId : number) : Promise<WatchList> {
    const movie = await this.watchlistRepository
        .createQueryBuilder("watchlist")
        .leftJoinAndSelect("watchlist.account", "account")
        .where("watchlist.movieId = :movieId", {movieId})
        .andWhere("account.id = :accountId", {accountId})
        .getOne();
    return movie;
  }

  async checkIfMovieIsInWatchlist(movieId : number,accountId : number) : Promise<boolean> {
       const movie = await this.getMoviesFromWatchlist(movieId,accountId)
       return movie != null;

  }

  async removeMovieFromWatchlist(movieId : number,accountId : number) : Promise<void> {
   let movie =  await this.getMoviesFromWatchlist(movieId,accountId);
   await this.watchlistRepository.remove(movie);

  }
  async  RateMovie(movie : Rate) : Promise<void> {
    await this.rateRepository.save(movie);
  }

  async UpdateMovie(movie: Rate, point: number): Promise<void> {
    await this.rateRepository
        .createQueryBuilder("rate")
        .leftJoinAndSelect("rate.account", "account")
        .update(Rate)
        .set({ rate: point })
        .where('movieId = :movieId', { movieId: movie.movieId })
        .andWhere('accountId = :accountId', { accountId: movie.account.id })
        .execute();
  }

    async getMovieRate(movieId : number,accountId : number) : Promise<Rate> {
        const movie = await this.rateRepository
            .createQueryBuilder("rate")
            .leftJoinAndSelect("rate.account", "account")
            .where("rate.movieId = :movieId", {movieId})
            .andWhere("account.id = :accountId", {accountId})
            .getOne();
        return movie;
    }

    async getWatchlist(accountId : number) : Promise<Array<WatchList>> {
        const movies = await this.watchlistRepository
            .createQueryBuilder("watchlist")
            .leftJoin("watchlist.account", "account")
            .where("account.id = :accountId", { accountId })
            .addSelect(["watchlist.id", "watchlist.movieId", "watchlist.movieName", "watchlist.moviePoster"])
            .getMany();
        return movies;

    }



}
