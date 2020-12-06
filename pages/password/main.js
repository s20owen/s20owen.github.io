//Communicating with the DOM

var answerEl = document.getElementById("pwtext");
var inputval = document.getElementById("pwlen");
var numberEl = document.getElementById("number");
var lowerEl = document.getElementById("lower");
var upperEl = document.getElementById("upper");
var symbolEl = document.getElementById("symbol");
var generateEl = document.getElementById("gen");
var copyEl = document.getElementById("copy").addEventListener("click", myCopy);

const randomFunc = {
    upper : getRandomUpperCase,
    lower : getRandomLowerCase,
    number : getRandomNumber,
    symbol : getRandomSymbol
};

function getRandomUpperCase(){
       return String.fromCharCode(Math.floor(Math.random()*26)+65);
      }

function getRandomLowerCase(){
   return String.fromCharCode(Math.floor(Math.random()*26)+97);
}

function getRandomNumber(){
   return String.fromCharCode(Math.floor(Math.random()*10)+48);
}

function getRandomSymbol(){
    var symbol = "!@#$%^&*(){}[]=<>/,.|~?";
    return symbol[Math.floor(Math.random()*symbol.length)];
}


// function gets the html element id pwlen and stores its value
// nextval returns as string (parseInt) + 1 to add a value to it.
// then set the html value of the var.
function AddNumber() {
    
    //var inputval = document.getElementById("pwlen");
    var currval = inputval.value;
    
    var nextval = parseInt(currval) + 1;
    inputval.value = nextval;
}

// Subtract button removes 1 from the value and checks to see if the value is 0 and won't let it go negative
function SubNumber()
{
    //var inputval = document.getElementById("pwlen");
    var currval = inputval.value;
    
    if (currval == 0){
        // text value is zero log console
        console.log("zero");
    }
    else {
    var nextval = parseInt(currval) - 1;
    //console.log(nextval);
    inputval.value = nextval;
    }
    
}


// function for copy button
//document.getElementById("copy").addEventListener("click", myCopy);

function myCopy() {
    // copy to clipboard
    //var copyText = document.getElementById("pwtext");
    
    // select the text
    answerEl.select();
    answerEl.setSelectionRange(0, 99999); // for mobile devices
    document.execCommand("copy");
    
    //alert//
    alert("Copied the text: " + answerEl.value);
    
}

//generate event
generateEl.addEventListener('click', () =>{
    const length = +inputval.value;
    const hasUpper = upperEl.checked;
    const hasLower = lowerEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;
    
    
answerEl.value = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);

});

//Generate Password Function
function generatePassword(upper, lower, number, symbol, length){
    let generatedPassword = "";

    const typesCount = upper + lower + number + symbol;

    //console.log(typesCount);

    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if(typesCount === 0) {
        return '';
    }

    for(let i=0; i<length; i+=typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

