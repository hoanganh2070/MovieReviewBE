import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards, UseInterceptors} from "@nestjs/common";
import {MovieService} from "./movie.service";
import {Movie} from "./movie";
import {CacheInterceptor} from "@nestjs/cache-manager";
import {getColorFromURL} from "color-thief-node";
import {AuthGuard} from "@nestjs/passport";
import {UserService} from "../user/user.service";
import {WatchListDto} from "./watchlistdto";
import {Rate} from "./rate";

@Controller('/api/movie')
export class MovieController {
  private userService : UserService;
  private movieService: MovieService;
  private topRatedMovies: Movie[];
  private trendingList: Movie[];
  private ImagesList : string[];
  private upcomingList: Movie[];


  constructor(movieService: MovieService,userService : UserService) {
    this.movieService = movieService;
    this.userService = userService;
  }


   //get top rated movies endpoint
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

   //get trending movies endpoint
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


    //get upcoming movies endpoint
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

  @Post('/watchlist')
  @UseGuards(AuthGuard('jwt'))
  async addMovieToWatchList(@Body() movie : any,@Req()  req: any) : Promise<void> {
    let user = await this.userService.getAccount(req.user);
    const moviedto = new WatchListDto(movie['movieId'],movie['movieName'],movie['moviePoster'],user);
    await this.movieService.addMovieToWatchlist(moviedto);
    return JSON.parse('{"message":"movie added successfully"}');
  }

  @Post('/watchlist/exist')
  @UseGuards(AuthGuard('jwt'))
    async checkMovieInWatchList(@Body() movieId : any,@Req()  req: any) : Promise<object> {
        let user = await this.userService.getAccount(req.user);
        let exist = await this.movieService.checkIfMovieIsInWatchlist(movieId['Id'],user.getId());
        return JSON.parse('{"exist":'+exist+'}');
    }

    @Delete('/watchlist/delete')
    @UseGuards(AuthGuard('jwt'))
    async deleteMovieFromWatchList(@Body() movieId : any,@Req()  req: any) : Promise<void> {
      let user = await this.userService.getAccount(req.user);
       await this.movieService.removeMovieFromWatchlist(movieId['Id'],user.getId());
       console.log("movie deleted");
    }

  @Post('/rate')
  @UseGuards(AuthGuard('jwt'))
  async rateMovie(@Body() movie : any,@Req()  req: any) : Promise<void> {
    let user = await this.userService.getAccount(req.user);
    const check = await this.movieService.getMovieRate(movie['movieId'],user.getId());
    if (check == null){
      const rate = new Rate(movie['movieId'],movie['rate'],user);
      await this.movieService.RateMovie(rate);
      return ;
    }
    await this.movieService.UpdateMovie(check,movie['rate']);
    return JSON.parse('{"message":"movie rated successfully"}');
  }

  @Post('/rate/get')
  @UseGuards(AuthGuard('jwt'))
  async getrateMovie(@Body() movie : any,@Req()  req: any) : Promise<Rate> {
    let user = await this.userService.getAccount(req.user);
    const check = await this.movieService.getMovieRate(movie['movieId'],user.getId());
    return check;
  }

    //get movie by id endpoint
  @Get('/:id')
  async getMovieById(@Param('id') id: number): Promise<object> {
    try{
    let movie = await this.movieService.getMovieById(id);
      movie = new Movie(movie);
      movie['backdrop_path'] = await getColorFromURL(movie['poster_path']);
      let url = "https://www.youtube.com/embed/" + await this.movieService.getMovieVideos(id);
      return {"movie":movie,"url":url};
    }
    catch (e) {
      console.log(e);
      throw new Error("Movie not found");
    }
  }





       //get movie's credits endpoint
  @Get('/:id/credits')
  async getMovieCredits(@Param('id') id : number) : Promise<object> {
      const start = Date.now();
      let credits = this.movieService.getMovieCredits(id);
      const end =  Date.now();
      console.log(`Execution time: ${end - start} ms`);
      return credits;
  }

       //get movie's images endpoint
  @Get('/:id/images')
  async getMovieImages(@Param('id') id : number) : Promise<object> {
     this.ImagesList = [];
    let credits = await this.movieService.getMovieImages(id);
    for (let url of credits['backdrops']) {
      this.ImagesList.push("https://www.themoviedb.org/t/p/w533_and_h300_bestv2" + url['file_path']);
    }
    return this.ImagesList;
  }

   //search movies by name endpoint
  @Get('/search/:query')
    async searchMovie(@Param('query') query : string) : Promise<object> {
        let movies = await this.movieService.searchMovie(query);
        let list = movies['results'];
        let searchList : Movie[] = [];
        for (let data of list) {
          if (data['poster_path'] != null)
               searchList.push(new Movie(data));
        }
        return searchList;
    }












}
