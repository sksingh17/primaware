import React from "react";
import "./Table.css";
import YearMenu from "./YearMenu";
import CountryUserInput from "./CountryUserInput";

export default props => {
  let headColumn = [];
  headColumn.push(<td key={0} />);
  for (let i = 0; i <= props.countryList.length; ++i) {
    let name = "Country Name / Code";
    let year = props.initialYear;
    if (props.countryList.length !== i) {
      name = props.countryList[i].countryName;
      year = props.countryList[i].year;
    }
    headColumn.push(
      <td key={i + 1}>
        <CountryUserInput
          name={name}
          year={year}
          updateCountrySelected={country => {
            props.updateCountrySelected(i, country);
          }}
          updateActiveYear={value => {
            props.updateActiveYear(i, value);
          }}
        />
      </td>
    );
  }

  let bodyRow = props.fieldsToShow.map(element => {
    let bodyColumn = [];
    bodyColumn.push(
      <td className='align-middle' key={0} className="td-enhance">
        {element.displayName}
      </td>
    );
    props.countryList.forEach((cElement, index) => {
      bodyColumn.push(<td key={index + 1}>{cElement[element.key]}</td>);
    });
    bodyColumn.push(<td key={-1} />);

    return <tr key={element.key}>{bodyColumn}</tr>;
  });

  return (
    <table className="m-3 p-2 content-table">
      <thead>
        <tr>{headColumn}</tr>
      </thead>
      <tbody>{bodyRow}</tbody>
    </table>
  );
};
