
var Calculator = function() {
    this.lastResult = null;
    this.storedNumber = null;

    this.reinitialize = function() {
        this.lastResult = null;
    };

    this.getResult = function(){
        return this.lastResult;
    };

    this.storeNumber = function(number) {
        verifyNumber(number);
        this.storedNumber = number;
    }

    this.getStoredNumber = function() {
        return this.storedNumber;
    }

    this.add = function() {
        var result = 0;
        if (this.lastResult != null) {
            result = this.lastResult;
        }
        for(var i = 0; i < arguments.length; i++) {
            verifyNumber(arguments[i]);
            result += arguments[i];
        }
        this.lastResult = result;
        return this;
    };

    this.substract = function() {
        var startingIndex = 0;
        if(this.lastResult === null & arguments.length >= 1) {
            verifyNumber(arguments[0]);
            result = arguments[0];
            startingIndex = 1;
        }
        else if (this.lastResult != null) {
            result = this.lastResult;
        }
        else {
            result = 0;
        }

        for(var i = startingIndex; i < arguments.length; i++) {
            verifyNumber(arguments[i]);
            result -= arguments[i];
        }

        this.lastResult = result;
        return this;
    };

    this.multiply = function() {
        var result = 1;
        if(this.lastResult != null) {
            result = this.lastResult;
        }
        for(var i = 0; i < arguments.length; i++) {
            verifyNumber(arguments[i]);
            result *= arguments[i];
        }
        this.lastResult = result;
        return this;
    };

    this.divide = function() {
        var startingIndex = 0;
        if(this.lastResult === null & arguments.length >= 1) {
            verifyNumber(arguments[0]);
            result = arguments[0];
            startingIndex = 1;
        }
        else if (this.lastResult != null) {
            result = this.lastResult;
        }
        else {
            result = 0;
        }

        for(var i = startingIndex; i < arguments.length; i++) {
            verifyNumber(arguments[i]);
            result /= arguments[i];
        }
        this.lastResult = result;
        return this;
    };

    this.factorial = function(number) {
        if(shouldUseLastResult(this.lastResult, number)){
            number = this.lastResult;
        }
        if(number < 0) {
            throw "Number passed to factoriel should be positive";
        }
        this.lastResult = doFactorial(number);
        return this;
        
    }

    this.sin = function(angle) {
        
        if(shouldUseLastResult(this.lastResult, angle)) {
           angle = this.lastResult;
        }
        else {
            verifyNumber(angle);
        }

        return Math.sin(angle);
        
    }

    this.cos = function(angle) {
        if(shouldUseLastResult(this.lastResult, angle)) {
            angle = this.lastResult;
        }
        else {
            verifyNumber(angle);
        }

        return Math.cos(angle);
    }

    this.tan = function(angle) {
        if(shouldUseLastResult(this.lastResult, angle)) {
            angle = this.lastResult;
        }
        else {
            verifyNumber(angle);
        }

        return Math.tan(angle);
    }

    function verifyNumber(input) {
        if(typeof(input) != "number") {
            throw "Input to calculator operations should be numbers";
        }
    }

    function shouldUseLastResult(lastResult, input) {
        return lastResult != null & (input === null || typeof(input) === "undefined")
    }

    function doFactorial(number) {
        if(number === 0 || number === 1) {
            return 1;
        }
        else {
            return number * doFactorial(number - 1);
        }
    }

    function sin(angle) {
        return Math.sin(angle);
    }

}

function getRandomInteger() {
    return Math.floor(Math.random() * 100); 
}

var a = getRandomInteger();
var b = getRandomInteger();
var c = getRandomInteger();
var d = getRandomInteger();
var e = getRandomInteger();
var calculator = new Calculator();

console.log("Executing ", a , " + ",  b, " + ",  c, " + ", d, " + ", e);
console.log("Result : ", calculator.add(a, b, c, d, e).getResult());

console.log("Executing substract ", b, " from last result");
console.log("Result: ", calculator.substract(b).getResult());

console.log("Reinitialize calculator and execute multiplication: ", b, " * ", d)
calculator.reinitialize();
console.log("Result: ", calculator.multiply(b, d).getResult());

console.log("Divide last result by : ", d);
console.log("Result: ", calculator.divide(d).getResult()); 

console.log("Now let do some crazy Chaining: ", a, "+", b, "-", c, "*", d, "/" ,e, " :D ")
console.log("Note: Operations are executed in order i.e not by operations priority")
calculator.reinitialize();
console.log("Result: ", calculator.add(a,b).substract(c).multiply(d).divide(e).getResult())

console.log("Now execute this: sin(", b, "!)")
calculator.reinitialize();
console.log("Result: ", calculator.factorial(b).sin());

calculator.reinitialize();
console.log("Now save number: ", c);
calculator.storeNumber(c);

console.log("Do some additions: 7 + 7");
calculator.add(7, 7);
console.log("Result: ", calculator.getResult());
console.log("Now multiply the result by the saved number. ");
console.log("Result: ", calculator.multiply(calculator.getStoredNumber()).getResult());


