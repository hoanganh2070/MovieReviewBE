import {Controller, Get, Param, UseInterceptors} from "@nestjs/common";
import { MovieService } from "./movie.service";
import { Movie } from "./movie";
import {CacheInterceptor} from "@nestjs/cache-manager";

@Controller('/api/movie')
export class MovieController {
  private movieService: MovieService;

  private topRatedMovies: Movie[];
  private trendingList: Movie[];
  private ImagesList : string[];
  private upcomingList: Movie[];


  constructor( movieService: MovieService) {
    this.movieService = movieService;
  }

  @Get('/toprated')
  @UseInterceptors(CacheInterceptor)
  async getTopratedMovies(): Promise<object> {
    this.topRatedMovies = [];
    let movies = await this.movieService.getTopRatedMovies();
    let list = movies['results'];
    for (let data of list) {
      this.topRatedMovies.push(new Movie(data));
    }
    return this.topRatedMovies;
  }


  @Get('/trending')
  @UseInterceptors(CacheInterceptor)
  async getPopularMovies(): Promise<object> {

    this.trendingList = [];
    let movies = await this.movieService.getTrending();
    let list = movies['results'];
    for (let data of list) {
      this.trendingList.push(new Movie(data));
    }
    return this.trendingList;
  }

  @Get("/demo")
  async demo(): Promise<object[]> {
    let moviesid =[14, 14277, 389,238, 278];
    let movieList = [];
    for (let id of moviesid) {
     let movie = await this.movieService.getMovieById(id);
     movieList.push(movie);
    }
    return movieList;

  }

  @Get('/upcoming')
  @UseInterceptors(CacheInterceptor)
  async getUpcomingMovies(): Promise<object> {
    this.upcomingList = [];
    let movies = await this.movieService.getUpComingMovies();
    let list = movies['results'];
    for (let data of list) {
      this.upcomingList.push(new Movie(data));
    }
    return this.upcomingList;
  }


  @Get('/:id')
  async getMovieById(@Param('id') id: number): Promise<object> {
    try{
    let movie = await this.movieService.getMovieById(id);
      movie = new Movie(movie);
      return movie;
    }
    catch (e) {
      throw new Error("Movie not found");
    }

  }

  @Get('/:id/video')
  async getVideoUrl(@Param('id') id: number): Promise<string> {
    let url = "https://www.youtube.com/embed/" + await this.movieService.getMovieVideos(id);
    return `{"url": "${url}"}`;
  }


  @Get('/:id/credits')
  async getMovieCredits(@Param('id') id : number) : Promise<object> {
      const start = Date.now();
      let credits = this.movieService.getMovieCredits(id);
      const end =  Date.now();
      console.log(`Execution time: ${end - start} ms`);
      return credits;
  }


  @Get('/:id/images')
  async getMovieImages(@Param('id') id : number) : Promise<object> {
     this.ImagesList = [];
    let credits = await this.movieService.getMovieImages(id);
    for (let url of credits['backdrops']) {
      this.ImagesList.push("https://www.themoviedb.org/t/p/w533_and_h300_bestv2" + url['file_path']);
    }

    return this.ImagesList;
  }






}
