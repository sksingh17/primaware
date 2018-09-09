import React, { Component } from "react";
import "./CountryUserInput.css";
import YearMenu from "./YearMenu";
import CountrySelectMenu from "./CountrySelectMenu";
import CountrySearchService from "../service/CountrySearchService";

export default class CountryUserInput extends Component {
  constructor(props) {
    super(props);
    this.searchService = new CountrySearchService();
  }

  state = {
    value: this.props.name,
    displayMenu: false,
    csList: []
  };

  static getDerivedStateFromProps(props, state) {
    if (props.name != state.prevPropName) {
      return {
        value: props.name,
        prevPropName: props.name
      };
    }
    return {
      value: state.value
    };
  }

  render() {
    return (
      <section>
        <div className="input-drop">
          <input
            type="text"
            placeholder={this.props.name}
            value={
              this.state.value.toUpperCase() == "COUNTRY NAME / CODE"
                ? ""
                : this.state.value
            }
            onChange={e => {
              this.searchService.search(e.target.value || "");
              this.setState({
                value: e.target.value
              });
            }}
            onKeyUp={() => {
              this.setState({ displayMenu: true });
            }}
          />
          <CountrySelectMenu
            displayMenu={this.state.displayMenu}
            csList={this.state.csList}
            updateCountrySelected={country => {
              this.setState({ displayMenu: false });
              this.props.updateCountrySelected(country);
            }}
          />
        </div>
        <div className="dropdown mt-2">
          <button
            type="button"
            className="text-left btn btn-info dropdown-toggle btn-block"
            data-toggle="dropdown"
          >
            {this.props.year}
          </button>
          <YearMenu
            updateActiveYear={value => {
              this.props.updateActiveYear(value);
            }}
            activeYear={this.props.year}
          />
        </div>
      </section>
    );
  }

  componentDidMount() {
    this.countryListSubscription = this.searchService
      .getResults()
      .subscribe(res => {
        //console.log(`Response from server - ${JSON.stringify(res)}`);
        this.setState({
          csList: res
        });
      });
  }

  componentWillUnmount() {
    if (this.countryListSubscription != null) {
      this.countryListSubscription.unsubscribe();
    }
  }
}
