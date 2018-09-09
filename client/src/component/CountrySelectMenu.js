import React from "react";
import "./CountrySelectMenu.css";

export default props => {
  let csRow = props.csList.map(element => {
    return (
      <tr
        className="input-drop-item border-bottom"
        key={element.code}
        onClick={e => {
          props.updateCountrySelected(element);
        }}
      >
        <td>{element.name}</td>
        <td>{element.code.toLowerCase()}</td>
      </tr>
    );
  });
  if (csRow == null || csRow.length == 0) {
    return null;
  }

  return (
    <div
      className={
        "input-drop-menu " + (props.displayMenu ? "d-block" : "d-none")
      }
    >
      <table>
        <thead>
          <tr className="border-bottom">
            <td>Name</td>
            <td>Code</td>
          </tr>
        </thead>
        <tbody>{csRow}</tbody>
      </table>
    </div>
  );
};
