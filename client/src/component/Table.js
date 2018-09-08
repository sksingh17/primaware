import React from "react";
import "./Table.css";

export default props => {
  let headColumn = [];
  headColumn.push(<td />);
  let yearddlist=[];
  for (let i = 1990; i <= 2016; ++i) {
    yearddlist.push(<div class="dropdown-item">{i}</div>);
  }
  props.countryList.forEach((element, index) => {
    headColumn.push(
      <td>
        <div>
          <input type="text" placeholder={element.countryName} />
        </div>
        <div class="dropdown mt-2">
          <button
            type="button"
            class="text-left btn btn-info dropdown-toggle btn-block"
            data-toggle="dropdown"
          >
            {element.year || 2015}
          </button>
          <div class="dropdown-menu">{yearddlist}</div>
        </div>
        <div className="h-20 w-50" />{" "}
      </td>
    );
  });
  headColumn.push(
    <td>
      <div>
        <input type="text" placeholder="Country" />
      </div>
      <div class="dropdown mt-2">
        <button
          type="button"
          class="text-left btn btn-info dropdown-toggle btn-block"
          data-toggle="dropdown"
        >
          2015
        </button>
        <div class="dropdown-menu">{yearddlist}</div>
      </div>
      <div className="h-20 w-50" />
    </td>
  );

  let bodyRow = props.fieldsToShow.map(element => {
    let bodyColumn = [];
    bodyColumn.push(<td>{element}</td>);
    props.countryList.forEach((cElement, index) => {
      bodyColumn.push(<td>{cElement[element]}</td>);
    });
    bodyColumn.push(<td />);

    return <tr>{bodyColumn}</tr>;
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
