
import { CircularShifter } from "./CircularShifter.js";
import { Alphabetizer } from "./Alphabetizer.js";

/**
 * KWICSManager functions as the InputManager and OutputManager components
 * in the KWIC System. It also acts as a TransportComponent for the 
 * system. More filters can be added easily by instantiating them and then
 * calling their process() method in the process method below.
 */
export class KWICSManager{
    #shifter;
    #alphabetizer;
    #inputLines;
    #outputLines;

    constructor(){
        this.#shifter = new CircularShifter(this);
        this.#alphabetizer = new Alphabetizer(this);
        this.#inputLines = Array();
        this.#outputLines = Array();  
    }

    /**
     * Takes an array of strings and coordinates the processing of
     * subcomponents (shifter and alphabetizer)
     * @param {string[]} lines 
     */
    process(lines){
        this.#inputLines = lines;
        this.#outputLines = [...lines];

        this.#shifter.process();
        this.#alphabetizer.process();   
    }

    /**
     * returns a string array representing the last filter's
     * end product... wordy, but that's what it does
     * @returns {string[]}
     */
    getLines(){
        return this.#outputLines;
    }

    /**
     * Stores the result of the calling filter's operation. Essentially
     * a connector.
     * @param {string[]} lines 
     */
    setLines(lines){
        this.#outputLines = [...lines];
    }

    /**
     * Returns an array of the sorted keyword strings
     * @returns {string[]}
     */
    getOutput(){
        var output = [...this.#outputLines];
        this.#outputLines.length = 0;

        return output;
    }

}