
export class Movie{
  private id: number;
  private title: string;
  private original_title: string;
  private overview: string;
  private poster_path: string;
  private release_date: string;
  private vote_average: number;
  private backdrop_path: string;
  private video : number;

  constructor(data : object) {
    this.id = data['id'];
    this.title = data['title'];
    this.original_title = data['original_title'];
    this.overview = data['overview'];
    this.backdrop_path ='https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/'+data['backdrop_path'];
    this.poster_path = 'https://www.themoviedb.org/t/p/w220_and_h330_face' + data['poster_path'];
    this.release_date = data['release_date'];
    this.vote_average = parseFloat((Number(data['vote_average'] / 2.0).toFixed(2)));

  }
}