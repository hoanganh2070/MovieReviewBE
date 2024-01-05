export class StaffDto{
    public name : string;
    public profile_path : string;

    constructor(data : object) {
        this.name = data['name'];
        this.profile_path = "https://www.themoviedb.org/t/p/w138_and_h175_face/" + data['profile_path'];
    }
}