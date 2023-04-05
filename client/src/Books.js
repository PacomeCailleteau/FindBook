
import React from "react";
import "./Books.css"
import {NavLink} from "react-router-dom";

class Books extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <NavLink to={"/book"} state={{isbn: this.props.isbn}} className={"book"}>
                <img src={this.props.img} alt="image du livre"/>
                <h3>{this.props.titre}</h3>
                <div>{"isbn13: " + this.props.isbn}</div>
            </NavLink>
        )
    }
}


export default Books;












