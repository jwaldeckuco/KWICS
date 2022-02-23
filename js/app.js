/**
 * app.js functions as the input and output modules for the KWIC system
 * Lines are not directly passed to the subcomponents of the KWIC system
 * but are passed to the KWICSManager component instead.
 */
import { KWICSManager } from "./KWICS/KWICSManager.js";
import { Tester } from "./tester/tester.js"

var keywordForm = document.getElementById('keywordForm');
var submitButton = document.getElementById('addKeywordButton');
var resetKeywordButton = document.getElementById('resetKeywordButton');
var newKeywordInput = document.getElementById('newKeywordInput');
var currentKeywordsArea = document.getElementById('currentKeywordsArea');
var resultsArea = document.getElementById('resultsArea');

const keywordList = document.getElementById('keywordList');

var keywords = Array();
var results = Array();

// dev
const dev = true;
const tester = new Tester();

if(dev){
    tester.test();
}

const kwicsManager = new KWICSManager();

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
        // getOutput();
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


