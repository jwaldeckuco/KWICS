
import { KWICSFilter } from "./KWICSFilter.js";
/**
 * Performs the Circular Shifts of the input keyword strings
 * @extends KWICSFilter
 */
export class CircularShifter extends KWICSFilter{

    /**
     * @param {KWICSFilter} nextFilter
     */
    constructor(nextFilter){
        super();
        super.nextFilter = nextFilter
    }

    /**
     * Gets the unshifted keyword lines, performs the shifting process, and 
     * updates the KWICSManager's outputLines array
     * @param {string[]} inputLines
     */
    process(inputLines){
        this.outputLines.length = 0;
        this.#readLines(inputLines);
        this.#shiftLines();
        this.#pass();
    }
    
    /**
     * Reads incoming input lines
     * @param {string[]}
     */
    #readLines(inputLines){
        this.inputLines = inputLines;
    }

    /**
     * Coordinates the shifting of each keyword line
     */
    #shiftLines(){
        this.inputLines.forEach(line => {
            this.#shiftLine(line);
        });
    }

    /**
     * Performs the actual shifting of the supplied keyword line
     * @param {string} line 
     */
    #shiftLine(line){
        // get the words in the line
        var words = line.split(' ');
        
        if(words.length > 1){
            for( var i = 0; i < words.length; i++){
                // shift first word to end
                var firstWord = words.shift();
                words.push(firstWord);

                var newLine = words.join(" ");
                // push to outputlines
                this.outputLines.push(newLine);
            }  
        }
        // if line is a single word, push it to outputlines
        else{
            this.outputLines.push(line);
        }
    }

    /**
     * Passes the shifted keyword lines to the KWICSManager
     */
    #pass(){
        super.getNextFilter().process(this.outputLines);
    }
}