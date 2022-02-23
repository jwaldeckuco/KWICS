
import { Test } from "./Test.js";
import { FilterTest } from "./filterTest/filterTest.js";

// export class Test{
//     constructor(testTitle){
//         this.testTitle = testTitle;
//         this.passed = false;
//         this.tests = Array();
//         this.failedTests = Array();
//     }

//     addSubtest(subtest){
//         this.tests.push(subtest);
//     }

//     setupTest(){
//         throw new Error("Test.setupTest should not be called directly");
//     }

//     test(){
//         this.tests.forEach(subtest => {
//             if(!subtest.test()){
//                 this.failedTests.push(subtest.testTitle);
//             }
//         });

//         this.printResults();

//         if(this.failedTests.length > 0){
//             return false;
//         }
//         else{
//             return true;
//         }
//     }

//     printResults(){
//         if(this.failedTests.length > 0){
//             console.log(this.testTitle + " failed.  Failed tests: ");
//             this.failedTests.forEach(subtest => {
//                 console.log(subtest);
//             });

//         }
//         else{
//             console.log(this.testTitle + " passed ");
//         }
//     }
// }

export class Tester extends Test{
    constructor(){
        super("Main Test");

        super.addSubtest(new FilterTest());
        super.addSubtest(new ManagerTest());
        super.addSubtest(new ShifterTest());
        super.addSubtest(new AlphabetizerTest());
    }
}


export class ManagerTest extends Test{
    constructor(){
        super("Manager Test");
    }
}

export class ShifterTest extends Test{
    constructor(){
        super("Shifter Test");
    }
}

export class AlphabetizerTest extends Test{
    constructor(){
        super("Alphabetizer Test");
    
    }
}