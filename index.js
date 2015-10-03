$(document).ready(function(){
    var calculator = new Calculator();
    var display = "";
    var lastOperation = "";
    
    function showGeoLocation() {
        
    }
    function updateDisplay() {
        return $(".display span").fadeOut('fast', function () {
            $(this).text(display).fadeIn('fast');
        });
    }

    $('.button-value').click(function(){

        var value = $(this).data('value');
        display += value;
        updateDisplay();
    });


    $('.button-operation').click(function(){
      
        if (lastOperation === "+") {
            calculator.add(display);
        } else if (lastOperation === "-") {
            calculator.subtract(display);
        } else if (lastOperation === "/") {
            calculator.divide(display);
        } else if (lastOperation === "x") {
            calculator.multiply(display);
        } else if (lastOperation === "") {
            calculator.value(display);
        }

        display = "";

        lastOperation = $(this).data('operation');
    });

    $('.button-equals').click(function(){
        display = calculator.equals();
        updateDisplay();
        lastOperation = "";
    });

    $('.button-clear').click(function(){
        display = "";
        calculator.clear();
        updateDisplay();
    });


});

