
import React from "react";
import "./Search.css"

class Search extends React.Component{
    constructor(props) {
        super(props);
    }

    update(val){
        this.props.update(val)
    }

    render() {
        //event.target.elements.title.value
        return (
            <div className="search">
                <input
                    type="text"
                    placeholder=" Rechercher  ..."
                    name="search"
                    onKeyUp={() => this.update("cc")}
                    id={"search"}
                />
            </div>
        );
    }
}

export default Search;
