import Rx from "rxjs/Rx";
import config from "../config.js";
export default class CountrySearchService {
  constructor() {
    this.search$ = new Rx.Subject();
  }

  search(value) {
    this.search$.next(value);
  }

  doSearch(value) {
    let url = `${config.dev.serverApiUrl}/search/country`;
    if (value != null && value.length > 0) {
      url = url + `?q_start=${value}`;
    }
    let promise = fetch(url).then(response => response.json());
    return Rx.Observable.fromPromise(promise);
  }

  getResults() {
    return this.search$
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(value => this.doSearch(value))
      .catch(error => {
        console.error(error);
        return Rx.Observable.of([]);
      });
  }
}
