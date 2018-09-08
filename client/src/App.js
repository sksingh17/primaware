import React, { Component } from "react";
import "./App.css";
import Table from "./component/Table";
class App extends Component {
  state = {
    fieldsToShow: ["Capital Name", "Population"],
    countryList:[
      {
        countryCode:'us',
        countryName:'USA',
        year:'2014'
      }
    ]
  };

  render() {
    return (
      <div className="container-fluid">
        <header className="row bg-dark">
          <h1 className="m-2  text-left text-light display-4">Primaware</h1>
        </header>
        <section className="row">
          <Table fieldsToShow={this.state.fieldsToShow} countryList={this.state.countryList} />
        </section>
      </div>
    );
  }
}

export default App;
