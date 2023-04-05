
export class statModel {
    search
    //nb_results correspond au nombre de résultats de la recherche sur google trends depuis 1 mois
    nb_results
    constructor(stat) {
        this.search = stat.search_parameters.q;
        try {
            const res2 = stat.interest_over_time.timeline_data
            const res3 = res2.map((item) => {
                return item.values[0].value
            })
            this.nb_results = res3.reduce((partialSum, a) => partialSum + parseInt(a), 0);
        } catch (e) {
            this.nb_results = 0
        }
    }
}
