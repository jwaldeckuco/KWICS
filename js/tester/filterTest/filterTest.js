
import { Test } from "../Test.js";
import { KWICSFilter } from "../../KWICs/KWICSFilter.js";

/**
 * Tests the KWICSFilter class
 */
export class FilterTest extends Test {
    constructor(){
        super("Filter Test");
        super.addSubtest(new ConstructorTest());
        super.addSubtest(new SetGetNextFilterTest());
    }
}

var filter;
var filter2;
var filter3;

/**
 * Tests the KWICSFilter class constructor
 */
class ConstructorTest extends Test{
    constructor(){
        super("Filter Constructor Test");
    }

    test(){
        filter = new KWICSFilter();

        if(filter.getNextFilter() != null){
            this.addFailedSubtest("Constructor nextFilter not null");
        }

        if(filter.inputLines == null || filter.outputLines == null){
            this.addFailedSubtest("Constructor inputLines or outputLines not created")
        }

        if(filter.inputLines.length > 0){
            this.addFailedSubtest("Constructor inputLines not empty");
        }

        if(filter.outputLines.length > 0){
            this.addFailedSubtest("Constructor outputLines not empty");
        }
        
        return this.failedTests.length == 0;
    }
}

/**
 * Tests the KWICSFilter getNextFilter() and setNextFilter() methods
 */
class SetGetNextFilterTest extends Test{
    constructor(){
        super("Filter set/get NextFilter Test");
    }

    test(){
        filter2 = new KWICSFilter();
        filter.setNextFilter(filter2);

        if(filter.getNextFilter() != filter2 || filter.getNextFilter() == filter3){
            this.addFailedSubtest("get or set NextFilter failed");
        }

        return this.failedTests.length == 0;
    }
}