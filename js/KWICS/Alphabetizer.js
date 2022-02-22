import { KWICSFilter } from "./KWICSFilter.js";

/**
 * @extends KWICSFilter
 */
export class Alphabetizer extends KWICSFilter{
    /**
     * @param {KWICSFilter} nextFilter
     */
    constructor(){
        super();
    }

    /**
     * Takes the shifted lines from the last filter and alphabetizes them.
     * @param {string[]} inputLines
     */
    process(inputLines){
        this.outputLines.length = 0;
        this.#readLines(inputLines);
        // only alphabetize if there is more than one inputLine
        if(this.inputLines.length > 1){
            this.#alphabetize();
        }
        // if there is only one inputLine, set outputLines and pass
        else{
            this.outputLines = this.inputLines;
        }
        
        this.#pass();
    }

    /**
     * @param { string[]} inputLines
     */
    #readLines(inputLines){
        this.inputLines = [...inputLines];
    }

    /**
     * alphabetizes the shifted inputLines in ascending order. 
     * Lowercase characters are sorted before uppercase characters
     * (eg: a < A)
     */
    #alphabetize(){
        this.outputLines = this.inputLines.sort(function(a,b){
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
     * passes alphabetized output to nextFilter
     */
    #pass(){
        super.getNextFilter().process([...this.outputLines]);
    }
}