
import { KWICSFilter } from "./KWICSFilter.js";
import { CircularShifter } from "./CircularShifter.js";
import { Alphabetizer } from "./Alphabetizer.js";

/**
 * KWICSManager functions as the InputManager and OutputManager components
 * in the KWIC System. It also acts as a TransportComponent for the 
 * system. More filters can be added easily by instantiating them and then
 * calling their process() method in the process method below.
 */
export class KWICSManager extends KWICSFilter{
    // filters
    #shifter;
    #alphabetizer;

    constructor(){
        super();
        this.#shifter = new CircularShifter();
        this.#alphabetizer = new Alphabetizer();

        this.#shifter.setNextFilter(this.#alphabetizer);
        this.#alphabetizer.setNextFilter(this);
    }

    input(lines){
        super.inputLines = lines;
        super.outputLines = [...lines];

        this.#shifter.process([...this.outputLines]);

        return [...this.outputLines];
    }

    /**
     * Takes an array of strings and coordinates the processing of
     * subcomponents (shifter and alphabetizer)
     * @param {string[]} lines 
     */
    process(lines){
        this.outputLines = [...lines];
    }

    pass(){

    }

    /**
     * returns a string array representing the last filter's
     * end product... wordy, but that's what it does
     * @returns {string[]}
     */
    getLines(){
        return this.outputLines;
    }

    /**
     * Stores the result of the calling filter's operation. Essentially
     * a connector.
     * @param {string[]} lines 
     */
    setLines(lines){
        this.outputLines = [...lines];
    }

    /**
     * Returns an array of the sorted keyword strings
     * @returns {string[]}
     */
    getOutput(){
        var output = [...this.outputLines];
        this.outputLines.length = 0;

        return output;
    }

}