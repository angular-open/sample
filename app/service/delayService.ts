import {Injectable} from 'angular2/core';

@Injectable()
export class DelayService {
  public Delay(timeout, onDone, index) {
    setTimeout(function () {
      onDone(index);
    }, timeout);
  }
}