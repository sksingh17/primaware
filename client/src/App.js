import React, { Component } from "react";
import "./App.css";
import Table from "./component/Table";
import CountryDetailService from "./service/CountryDetailService";
import { IoMdMenu } from 'react-icons/io';

class App extends Component {
  constructor() {
    super();
    this.detailService = new CountryDetailService();
  }
  state = {
    fieldsToShow: [
      { displayName: "Capital Name", key: "capital_name" },
      { displayName: "latitude/Longitude", key: "capital_coordinates" },
      { displayName: "Population", key: "population" },
      { displayName: "Birth Rate", key: "birth_rate" },
      { displayName: "Death Rate", key: "death_rate" },
      { displayName: "Urban Population(%)", key: "urban_population" },
      { displayName: "Density", key: "density" },
      { displayName: "FIFA Ranking", key: "fifa" },
      { displayName: "Forest area(%)", key: "forest_area_percent" },
      { displayName: "GDP Total", key: "gdp_total" },
      { displayName: "Big Mac Index", key: "bigmac_index" },
      { displayName: "Corruption Index", key: "corruption_index" },
      { displayName: "Happiness Index", key: "happiness_index" },
      { displayName: "Literacy Rate", key: "literacy_rate" },
      { displayName: "Human Development Index", key: "hdi" },
      { displayName: "Tax Revenue(% of GDP)", key: "tax_revenue" }
    ],
    initialYear: 2015,
    countryList: []
  };

  updateData(param) {
    let newCountryList = [...this.state.countryList];
    this.state.fieldsToShow.forEach(element => {
      if (
        element.key == "capital_name" ||
        element.key == "capital_coordinates"
      ) {
        newCountryList[param.index][element.key] = param.data[0][element.key];
      } else {
        newCountryList[param.index][element.key] = param.data[0][element.key][0]
          ? param.data[0][element.key][0].data
          : undefined;
      }
    });
    this.setState({
      countryList: newCountryList
    });
  }

  updateCountrySelected(index, country) {
    let cList = [...this.state.countryList];
    let countryNorm;
    if (index < this.state.countryList.length) {
      cList[index].countryCode = country.code;
      cList[index].countryName = country.name;
      countryNorm = cList[index];
      this.setState({
        countryList: cList
      });
    } else {
      countryNorm = {
        countryCode: country.code,
        countryName: country.name,
        year: this.state.initialYear
      };
      cList.push(countryNorm);
      this.setState({
        countryList: cList,
        initialYear: 2015
      });
    }
    if (this.state.fieldsToShow.length > 0) {
      this.detailService.search({
        index: index,
        country: countryNorm,
        fieldsToShow: this.state.fieldsToShow
      });
    }
  }

  updateActiveYear(index, value) {
    if (index < this.state.countryList.length) {
      let cList = [...this.state.countryList];
      cList[index].year = value;
      this.setState({
        countryList: cList
      });
      if (this.state.fieldsToShow.length > 0) {
        this.detailService.search({
          index: index,
          country: cList[index],
          fieldsToShow: this.state.fieldsToShow
        });
      }
    } else {
      this.setState({
        initialYear: value
      });
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <header className="row heading-panel sticky-top">
          <h1 className="m-2  text-left text-light">Primaware</h1>
          <div className='filter-icon-container'><IoMdMenu fill={'#ddd'} height={'5'} width={'5'} /></div>
        </header>
        <section className="row content">
          <Table
            initialYear={this.state.initialYear}
            updateActiveYear={this.updateActiveYear.bind(this)}
            updateCountrySelected={this.updateCountrySelected.bind(this)}
            fieldsToShow={this.state.fieldsToShow}
            countryList={this.state.countryList}
          />
        </section>
      </div>
    );
  }

  componentDidMount() {
    this.countryDetailSubscription = this.detailService
      .getResults()
      .subscribe(res => {
        // console.log(`Response from server - ${JSON.stringify(res)}`);
        if (res != null) {
          this.updateData(res);
        }
      });
  }

  componentWillUnmount() {
    if (this.countryDetailSubscription != null) {
      this.countryDetailSubscription.unsubscribe();
    }
  }
}

export default App;
