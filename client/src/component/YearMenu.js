import React from "react";
import "./YearMenu.css";

export default props => {
  let yearddlist = [];
  for (let i = 2018; i >= 1990; --i) {
    if (props.activeYear == i) {
      yearddlist.push(<div key={i} className="dropdown-item active">{i}</div>);
    } else {
      yearddlist.push(<div key={i} onClick={(e)=>{props.updateActiveYear(e.target.innerHTML)}} className="dropdown-item">{i}</div>);
    }
  }

  return <div className="dropdown-menu">{yearddlist}</div>;
};
