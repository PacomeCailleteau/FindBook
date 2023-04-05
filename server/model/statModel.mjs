
export class statModel {
    search
    //nb_results correspond au nombre de résultats de la recherche sur google trends depuis 1 mois
    nb_results
    constructor(stat) {
        // On récupère la recherche
        try {
            this.search = stat.search_parameters.q;
        } catch (e) {
            this.search = ""
        }
        // On récupère le nombre de résultats
        try {
            const res2 = stat.interest_over_time.timeline_data
            const res3 = res2.map((item) => {
                return item.values[0].value
            })
            // on fait la somme des valeurs de res3
            this.nb_results = res3.reduce((partialSum, a) => partialSum + parseInt(a), 0);

            // on passe dans le catch si un des attributs n'existe pas
            // si l'un des attributs n'existe pas, on met nb_results à 0 car ça veut dire que personne n'a fait la recherche
        } catch (e) {
            this.nb_results = 0
        }
    }
}
