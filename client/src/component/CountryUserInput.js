import React, { Component } from "react";
import "./CountryUserInput.css";
import YearMenu from "./YearMenu";
import CountrySelectMenu from "./CountrySelectMenu";

export default class CountryUserInput extends Component {
  state = {
    value: this.props.name,
    displayMenu: false,
    csList: [
      { name: "Australia", code: "au" },
      { name: "Bhutan", code: "bt" },
      { name: "Argentina", code: "ar" },
      { name: "USA", code: "en" },
      { name: "Spain", code: "es" },
      { name: "Chine", code: "zh" }
    ]
  };

  static getDerivedStateFromProps(props, state) {
      state.value = props.name;
  }

  render() {
    return (
      <section>
        <div className="input-drop">
          <input
            type="text"
            placeholder={this.props.name}
            value={
              this.state.value.toUpperCase() == "COUNTRY"
                ? ''
                : this.state.value
            }
            onChange={e => {
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
}
