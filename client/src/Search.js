
import React from "react";
import "./Search.css"

class Search extends React.Component{
    constructor(props) {
        super(props);
    }

    /**
     * Appelle la fonction update du composant parent
     * @param val
     */
    update(val){
        this.props.update(val)
    }

    render() {
        return (
            <div className="search">

                {/* la barre de recherche */}
                <input
                    type="text"
                    placeholder=" Rechercher  ..."
                    name="search"
                    onKeyUp={(e) => this.update(e.target.value)}
                    id={"search"}
                >
                </input>

                {/* le bouton de recherche (petite loupe) */}
                <button type="submit" id={"searchButton"} onClick={() => this.update(document.getElementById("search").value)}>
                        <img src="https://cdn.discordapp.com/attachments/1081164623044157530/1090553420714348624/search.png"></img>
                </button>
            </div>
        );
    }
}

export default Search;
