/**
 * app.js functions as the input and output modules for the KWIC system
 * Lines are not directly passed to the subcomponents of the KWIC system
 * but are passed to the KWICSManager component instead.
 */
import { KWICSManager } from "./KWICS/KWICSManager.js";

var keywordForm = document.getElementById('keywordForm');
var submitButton = document.getElementById('addKeywordButton');
var resetKeywordButton = document.getElementById('resetKeywordButton');
var newKeywordInput = document.getElementById('newKeywordInput');
var currentKeywordsArea = document.getElementById('currentKeywordsArea');
var resultsArea = document.getElementById('resultsArea');

const keywordList = document.getElementById('keywordList');

var keywords = Array();
var results = Array();

const kwicsManager = new KWICSManager();

// dev
const dev = true;



if(dev){
    const testKeywords = [
        "Software Architecture and Design",
        "aA aaa",   
        "aa Aaa",
        "Aa Aaa",
        "AA aaa",
        "University of Central Oklahoma",
        "univ of central OK"
    ];
    
    const expectedOutput = [
        "aa Aaa",
        "aaa aA",
        "aaa AA",
        "aA aaa",
        "and Design Software Architecture",
        "Aa Aaa",
        "Aaa aa",
        "Aaa Aa",
        "AA aaa",
        "Architecture and Design Software",
        "central OK univ of",
        "Central Oklahoma University of",
        "Design Software Architecture and",
        "of central OK univ",
        "of Central Oklahoma University",
        "Oklahoma University of Central",
        "OK univ of central",
        "Software Architecture and Design",
        "univ of central OK",
        "University of Central Oklahoma"
    ];

    testKeywords.forEach(keyword => {
        readInput(keyword);
        clearKeywordInput();
        updateKeywordsArea();
        updateResultsArea();
    });

    var match = true;
    for(var i = 0; i < results.length; i++){
        if(results[i] !== expectedOutput[i]){
            match = false;
        }
    }

    if(match){
        console.log("Expected and Actual results are the same.");
    }
    else{
        console.log("Expected and Actual results are different. KWICS System failed.");
    }
   

}

keywordForm.addEventListener('keyup', e => {
    if(newKeywordInput.value == ""){
        submitButton.disabled = true;
    }
    else{
        submitButton.disabled = false;
    }
});

keywordForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var keyword = newKeywordInput.value;

    // if newKeywordInput has a value, process
    if (keyword.length > 0) {
        readInput(keyword);
        clearKeywordInput();
        updateKeywordsArea();
        updateResultsArea();

        resetKeywordButton.disabled = false;
        submitButton.disabled = true;
    }
});

resetKeywordButton.addEventListener('click', function (e) {
    // clear keywords and results arrays
    keywords.length = 0;
    results.length = 0;
    
    clearKeywordInput();
    updateKeywordsArea();
    updateResultsArea();
    resetKeywordButton.disabled = true;
});

function readInput(line) {
    keywords.push(line); 
    results = kwicsManager.input(keywords);
}

function clearKeywordInput() {
    newKeywordInput.value = "";
}

function updateKeywordsArea() {
    currentKeywordsArea.innerText = "";
    keywords.forEach(keyword => {
        currentKeywordsArea.append(keyword + "\n");
    });
}

function updateResultsArea() {
    resultsArea.innerText = "";

    results.forEach(result => {
        resultsArea.append(result + "\n");
    })
}


