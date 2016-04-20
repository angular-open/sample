import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class HttpServices {
    private apiUrl = 'http://localhost:9080/api/';
    private headers: Headers;

    constructor(private http: Http) {
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
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}