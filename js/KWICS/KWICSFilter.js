
export class KWICSFilter{
    #nextFilter;
    inputLines;
    outputLines;
  
    constructor(){
        this.#nextFilter = null;
        this.inputLines = Array();
        this.outputLines = Array();
    }

    setNextFilter(nextFilter){
        this.#nextFilter = nextFilter;
    }

    getNextFilter(){
        return this.#nextFilter;
    }

    process(){
        throw new Error("this is an abstract method. Check your calls")
    }
    #readLines(){
        throw new Error("this is an abstract method. Check your calls")
    }
    #pass(){
        throw new Error("this is an abstract method. Check your calls")
    }
}