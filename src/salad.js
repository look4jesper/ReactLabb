class Salad {
    constructor() {
        this.foundation = [];
        this.proteins = [];
        this.extras = [];
        this.dressing = [];
    }

    addFoundation(ingredient) {
        if(this.foundation.length === 1){
            return;
        } 
        for (var prop in ingredient){
            if(prop === 'foundation'){
                this.foundation.push(ingredient);
                return;
            }
        }
    }

    removeFoundation() {
        this.foundation.pop();
    }

    addProtein(ingredient) {
        for (var prop in ingredient){
            if(prop === 'protein'){
                this.proteins.push(ingredient);
                return;
            }
        }
    }

    removeProtein(ingredient) {
        if (this.protein.includes(ingredient)) {
            this.proteins.splice(this.proteins.indexOf(ingredient), 1);
        }
    }

    addExtra(ingredient) {
        for (var prop in ingredient){
            if(prop === 'extra'){
                this.extras.push(ingredient);
                return;
            }
        }
    }

    removeExtra(ingredient) {
        if (this.extras.includes(ingredient)) {
            this.extras.splice(this.extras.indexOf(ingredient), 1);
        }
    }

    addDressing(ingredient) {
        if(this.dressing.length === 1){
            return;
        } 
        for (var prop in ingredient){
            if(prop === 'dressing'){
                this.dressing.push(ingredient);
                return;
            }
        }
    }

    removeDressing() {
        this.dressing.pop();
    }

    price() {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.price;
        return (this.foundation.reduce(reducer, 0) + this.proteins.reduce(reducer, 0) + this.extras.reduce(reducer, 0) + this.dressing.reduce(reducer, 0)); 
    }

    toString() {
        let extrasStrings = [];
        let proteinStrings = [];
        this.proteins.forEach(e => proteinStrings.push(e.name));
        this.extras.forEach(e => extrasStrings.push(e.name));
        return ('Bas: ' + this.foundation[0].name + ', Protein: ' + proteinStrings + ', Tillbehör: ' + extrasStrings + ', Dressing: ' + this.dressing[0].name)
    }
}

export default Salad;