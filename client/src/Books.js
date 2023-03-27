
import React from "react";
import "./Book.css"
import {NavLink} from "react-router-dom";

class Books extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <NavLink to={"/book/" + this.props.isbn} className={"book"}>
                <img src={this.props.img} alt="image du livre"/>
                <h3>{this.props.titre}</h3>
                <div>{"isbn13: " + this.props.isbn}</div>
            </NavLink>

        )
    }
}


export default Books;












