
export class Alphabetizer{
    #manager;
    #inputLines;
    #outputLines;

    /**
     * 
     * @param {KWICSManager} manager 
     */
    constructor(manager){
        this.#manager = manager;
        this.#inputLines = Array();
        this.#outputLines = Array();
    }

    process(){
        this.readLines();
        if(this.#inputLines.length > 1){
            this.alphabetize();
        }
        else{
            this.#outputLines = this.#inputLines;
        }
        
        this.pass();
        this.#inputLines.length = 0;
        this.#outputLines.length = 0;
    }

    readLines(){
        this.#inputLines = [...this.#manager.getLines()];
    }

    alphabetize(){
        this.#outputLines = this.#inputLines.sort(function(a,b){
            const values = [0,0];

            var index = 0;
            while(values[0] == values[1]){
                if(index == a.length - 1 || index == b.length - 1){
                    return 0;
                }
                values[0] = a.charCodeAt(index);
                values[1] = b.charCodeAt(index);
                index++;
            }
            
            for(var i = 0; i < 2; ++i){
                if(values[i] >= 97){
                    values[i] = (values[i] - 97) * 2;
                }
                else{
                    values[i] = ((values[i] - 65) * 2) + 1;
                }
            }
            
            return values[0] - values[1];
        });
    }

    pass(){
        this.#manager.setLines([...this.#outputLines]);
    }
}