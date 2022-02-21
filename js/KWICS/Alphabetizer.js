
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

    /**
     * Gets the shifted lines from KWICSManager and alphabetizes them.
     * Updates the KWICSManager's outputLines array
     */
    process(){
        this.readLines();
        // only alphabetize if there is more than one inputLine
        if(this.#inputLines.length > 1){
            this.alphabetize();
        }
        // if there is only one inputLine, set outputLines and pass
        else{
            this.#outputLines = this.#inputLines;
        }
        
        this.pass();
        this.#inputLines.length = 0;
        this.#outputLines.length = 0;
    }

    /**
     * gets the shifted lines from KWICSManager
     */
    readLines(){
        this.#inputLines = [...this.#manager.getLines()];
    }

/**
 * alphabetizes the shifted inputLines in ascending order. 
 * Lowercase characters are sorted before uppercase characters
 * (eg: a < A)
 */
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

    /**
     * sets KWICSManager's outputLines array
     */
    pass(){
        this.#manager.setLines([...this.#outputLines]);
    }
}