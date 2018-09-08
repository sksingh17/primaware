import React from "react";
import "./Table.css";
import YearMenu from "./YearMenu";
export default props => {
  let headColumn = [];
  headColumn.push(<td key={0} />);
  let yearddlist = [];
  for (let i = 1990; i <= 2016; ++i) {
    yearddlist.push(<div class="dropdown-item">{i}</div>);
  }
  for (let i = 0; i <= props.countryList.length; ++i) {
    let name = "Country";
    let year = props.initialYear;
    if (props.countryList.length !== i) {
      name = props.countryList[i].countryName;
      year = props.countryList[i].year;
    }
    headColumn.push(
      <td key={i+1}>
        <div>
          <input type="text" placeholder={name} />
        </div>
        <div className="dropdown mt-2">
          <button
            type="button"
            className="text-left btn btn-info dropdown-toggle btn-block"
            data-toggle="dropdown"
          >
            {year}
          </button>
          <YearMenu
            updateActiveYear={value => {
              props.updateActiveYear(i, value);
            }}
            activeYear={year}
          />
        </div>
        <div className="h-20 w-50" />{" "}
      </td>
    );
  }

  let bodyRow = props.fieldsToShow.map(element => {
    let bodyColumn = [];
    bodyColumn.push(<td key={0}>{element}</td>);
    props.countryList.forEach((cElement, index) => {
      bodyColumn.push(<td key={index+1}>{cElement[element]}</td>);
    });
    bodyColumn.push(<td key={-1} />);

    return <tr key={element}>{bodyColumn}</tr>;
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
