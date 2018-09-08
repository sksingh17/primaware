import React, { Component } from "react";
import "./App.css";
import Table from "./component/Table";
class App extends Component {
  state = {
    fieldsToShow: ["Capital Name", "Population"],
    initialYear: 2015,
    countryList: [
      {
        countryCode: "us",
        countryName: "USA",
        year: 2014
      }
    ]
  };

  updateActiveYear(index, value) {
    if (index < this.state.countryList.length) {
      let cList = [...this.state.countryList];
      cList[index].year = value;
      this.setState({
        countryList: cList
      });
    } else {
      this.setState({
        initialYear: value
      });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <header className="row bg-dark">
          <h1 className="m-2  text-left text-light display-4">Primaware</h1>
        </header>
        <section className="row">
          <Table
            initialYear={this.state.initialYear}
            updateActiveYear={this.updateActiveYear.bind(this)}
            fieldsToShow={this.state.fieldsToShow}
            countryList={this.state.countryList}
          />
        </section>
      </div>
    );
  }
}

export default App;
