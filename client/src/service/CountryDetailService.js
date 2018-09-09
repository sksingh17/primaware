import Rx from "rxjs/Rx";
import config from "../config.js";

export default class CountryDetailService {
  constructor() {
    this.detail$ = new Rx.Subject();
  }

  search(param) {
    this.detail$.next(param);
  }

  doSearch(param) {
    // console.log(`Param - ${JSON.stringify(param)}`);
    let url = `${
      config.dev.serverApiUrl
    }/detail/country/${param.country.countryCode.toLowerCase()}?years=${
      param.country.year
    }`;
    let data_list = param.fieldsToShow.map(element => element.key);
    url = url + `&q=${data_list.join(",")}`;
    let promise = fetch(url)
      .then(response => response.json())
      .then(res => {
        if (res.type == "error") {
          return null;
        }
        return {
          index: param.index,
          country: param.country,
          data: res
        };
      });
    return Rx.Observable.fromPromise(promise);
  }

  getResults() {
    return this.detail$.mergeMap(value => this.doSearch(value)).catch(error => {
      console.error(error);
      return Rx.Observable.of([]);
    });
  }
}
