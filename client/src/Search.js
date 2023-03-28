
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
        return (
            <div className="search">
                <input
                    type="text"
                    placeholder=" Rechercher  ..."
                    name="search"
                    onKeyUp={(e) => this.update(e.target.value)}
                    id={"search"}
                />
            </div>
        );
    }
}

export default Search;
