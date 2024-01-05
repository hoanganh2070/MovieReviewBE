export class MovieDto{
    public id : number;
    public title : string;
    public poster_path : string;

    constructor(data : object) {
        this.id = data['id'];
        this.title = data['title'];
        this.poster_path = 'https://www.themoviedb.org/t/p/w220_and_h330_face' + data['poster_path'];
    }
}