
import React from "react";
import {useLocation} from "react-router-dom";

/*
class BookDetail extends React.Component{
    constructor(props) {
        super(props);
        const isbn = this.props.match.params.isbn
        console.log("isbn : " + isbn)
    }

    render() {
        //event.target.elements.title.value
        return (
            <div className="book">
                <img src={"this.props.img"} alt="image du livre"/>
                <h3>{"this.props.titre"}</h3>
                <div>{"isbn13: " + this.isbn}</div>
            </div>
        );
    }
}

export default BookDetail;
*/

function BookDetail (){
    let location=useLocation()
    const find = location.state.isbn
    console.log(find)

    return(
        <div className="book">
            <img src={"this.props.img"} alt="image du livre"/>
            <h3>{"this.props.titre"}</h3>
            <div>{"isbn13: " + find}</div>
        </div>
    )
}




export default BookDetail

