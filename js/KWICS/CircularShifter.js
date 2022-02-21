
/**
 * Performs the Circular Shifts of the input keyword strings
 */
export class CircularShifter{
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
     * Gets the unshifted keyword lines, performs the shifting process, and 
     * updates the KWICSManager's outputLines array
     */
    process(){
        this.readLines();
        this.shiftLines();
        this.pass();
        
        // clear the arrays
        this.#inputLines.length = 0;
        this.#outputLines.length = 0;
    }
    
    /**
     * Gets the unshifted keyword lines from KWICSManager
     */
    readLines(){
        this.#inputLines = [...this.#manager.getLines()];
    }

    /**
     * Coordinates the shifting of each keyword line
     */
    shiftLines(){
        this.#inputLines.forEach(line => {
            this.shiftLine(line); 
        });
    }

    /**
     * Performs the actual shifting of the supplied keyword line
     * @param {string} line 
     */
    shiftLine(line){
        // get the words in the line
        var words = line.split(' ');
        
        if(words.length > 1){
            for( var i = 0; i < words.length; i++){
                // shift first word to end
                var firstWord = words.shift();
                words.push(firstWord);

                var newLine = words.join(" ");
                // push to outputlines
                this.#outputLines.push(newLine);
            }  
        }
        // if line is a single word, push it to outputlines
        else{
            this.#outputLines.push(line);
        }
    }

    /**
     * Passes the shifted keyword lines to the KWICSManager
     */
    pass(){
        this.#manager.setLines(this.#outputLines);
    }
}