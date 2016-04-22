import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import {Router, Location} from "angular2/router";
import 'rxjs/Rx';

@Injectable()
export class HttpServices {
    private apiUrl = 'http://localhost:9080/api/';
    private headers: Headers;
 
    constructor(private http: Http, private router: Router, private location: Location) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    PostHttp(data: string, url: string) {
        var self = this;
        return self.http.post(self.apiUrl + url, data, {
            headers: self.headers
        }).catch(self.ErrorHandler);
    }

    private ErrorHandler(error: Response) {
        console.log(error.json());
        return Observable.throw(error.json() || null);
    }
}