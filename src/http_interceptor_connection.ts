import {Connection, ReadyState, Request, XHRBackend, Response} from "@angular/http";
import {Observable, Observer, Subscription} from "rxjs";
export class HttpInterceptorConnection implements Connection {
  readyState: ReadyState;
  request: Request;
  response: Observable<Response>;
  subscription: Subscription;

  constructor(requestObservable: Observable<Request>, xhrBackend: XHRBackend) {
    this.response = new Observable<Response>(
      (responseObserver: Observer<Response>) => {
        this.subscription = requestObservable.subscribe(req => {
            this.request = req;
            let xhrConnection = xhrBackend.createConnection(req);
            xhrConnection.response.subscribe(response => responseObserver.next(response), error => responseObserver.error(error), () => responseObserver.complete());
          },
          error => console.error(error));
      }
    );
  }
}
