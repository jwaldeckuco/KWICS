

export class Test{
    constructor(testTitle){
        this.testTitle = testTitle;
        this.passed = false;
        this.tests = Array();
        this.failedTests = Array();
    }

    addSubtest(subtest){
        this.tests.push(subtest);
    }

    setupTest(){
        throw new Error("Test.setupTest should not be called directly");
    }

    test(){
        this.tests.forEach(subtest => {
            if(!subtest.test()){
                this.failedTests.push(subtest.testTitle);
            }
        });

        this.printResults();

        if(this.failedTests.length > 0){
            return false;
        }
        else{
            return true;
        }
    }

    addFailedSubtest(testTitle){
        this.failedTests.push(testTitle);
    }

    printResults(){
        if(this.failedTests.length > 0){
            console.log(this.testTitle + " failed.  Failed tests: ");
            this.failedTests.forEach(subtest => {
                console.log("\t-" + subtest);
            });
            console.log("\n");

        }
        else{
            console.log(this.testTitle + " passed ");
        }
    }
}
