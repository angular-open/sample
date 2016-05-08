import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Router} from "@angular/router-deprecated";
import 'rxjs/Rx';

@Injectable()
export class HttpServices {
    private apiUrl = 'http://localhost:9080/api/';
    private headers: Headers;
 
    constructor(private http: Http, private router: Router) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    PostHttp(data: string, url: string) {
        var self = this;
        return self.http.post(self.apiUrl + url, data, {
            headers: self.headers
        }).catch(self.ErrorHandler);
    }
    
    GetHttp(url: string) {
        var self = this;
        var ddurl = "http://localhost:9080/" + url;
        self.http.get(ddurl)
      .map(res => res.json())
      // Subscribe to the observable to get the parsed people object and attach it to the
      // component
      .subscribe(people => console.log(people));
        return self.http.get(self.apiUrl + url).catch(self.ErrorHandler);
    }

    private ErrorHandler(error: Response) {
        console.log(error.json());
        return Observable.throw(error.json() || null);
    }
}