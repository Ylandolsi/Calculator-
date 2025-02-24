let AC = document.querySelector(".ac");
console.log(AC);
AC.addEventListener("click", function() {
  document.querySelector(".display p").textContent = "";
}) ; 

let numbers = document.querySelectorAll(".buttons button");
numbers.forEach(number => {
    if (number.classList.contains("ac") || 
        number.classList.contains("equal")  )    return;

    if ( number.classList.contains("arrow" ) ){

        number.addEventListener("click", function() {
            if (document.querySelector(".display p").textContent == "Start Now !" ) return ; 
            let displayText = document.querySelector(".display p").textContent;
            document.querySelector(".display p").textContent = displayText.slice(0, -1);
        });
        return ; 
    }

    number.addEventListener("click", function(){
        let num = number.querySelector("p").textContent; 
        if (document.querySelector(".display p").textContent == "Start Now !" ) {
            document.querySelector(".display p").textContent = "";
        }
        document.querySelector(".display p").textContent += num;
    });
}); 

function isOperator(c) {
    return c == "+" || c == "-" || c == "x" || c == "/" || c == "%";
}
function isHighestPriority(c) {
    return c == "x" || c == "/" || c == "%";
}

let equal = document.querySelector(".equal");
equal.addEventListener("click", function(){
    let result = document.querySelector(".display p").textContent;

    let n = result.length;
    let lastPos = 0 ; 
    if ( isOperator(result[0]) || isOperator(result[n-1]) ) {
        document.querySelector(".display p").textContent = "Error !";
        return
    }
    for (let i = 0; i < n; i++) {
        // check for error 
        if ( isOperator(result[i] )  &&  
                ( ( i+1 < n &&isOperator(result[i+1]) ) || ( i - 1 >= 0 && isOperator(result[i-1]) ) )  )     {
            document.querySelector(".display p").textContent = "Error !";
            return;
        }
    }

    let temp = "" ; 
    let lastop =""; 
    let lastnum = 0 ;
    let newstring = "" ;
    for (let i = 0; i < n; i++) {
        if ( isOperator(result[i]) ) {
            if ( isHighestPriority(result[i]) ) {
                if ( lastop != ""){
                    if ( lastop == "x" ) {
                        lastnum *= parseFloat(temp);
                    } else if ( lastop == "/" ) {
                        lastnum /= parseFloat(temp);
                    } else if ( lastop == "%" ) {
                        lastnum %= parseFloat(temp);
                    }
                    temp = String(lastnum) ; 
                }
                else {
                    lastnum = parseFloat(temp);
                }
                lastop = result[i];
                temp = ""
            }
            else {
                if ( lastop != ""){
                    if ( lastop == "x" ) {
                        lastnum *= parseFloat(temp);
                    } else if ( lastop == "/" ) {
                        lastnum /= parseFloat(temp);
                    } else if ( lastop == "%" ) {
                        lastnum %= parseFloat(temp);
                    }
                    temp = String(lastnum) ; 
                    lastop = "" ;
                }
                newstring += temp + result[i] ; 
                lastop = "" ; 
                temp ="" ; 
            }
        } else {
            temp += result[i];
        }
        
    }
    if ( lastop != ""){
        if ( lastop == "x" ) {
            lastnum *= parseFloat(temp);
        } else if ( lastop == "/" ) {
            lastnum /= parseFloat(temp);
        } else if ( lastop == "%" ) {
            lastnum %= parseFloat(temp);
        }
        temp = String(lastnum) ; 
        lastop = "" ;
    }
    newstring += temp ; 
    console.log(newstring);
    lastnum = 0 ;
    temp = "" ; 
    let add = 1; 
    for (let i = 0; i < newstring.length; i++) {
        if ( isOperator(newstring[i]) ) {
            if ( add == 1) {
                lastnum += parseFloat(temp);
            }
            else {
                lastnum -= parseFloat(temp);
            }
            add = (newstring[i] == "+") ? 1 : 0 ;
            temp = "" ;
        } else {
            temp += newstring[i];
        }
    }
    
    if ( add == 1) {
        lastnum += parseFloat(temp);
    }
    else {
        lastnum -= parseFloat(temp);
    }

    document.querySelector(".display p").textContent = lastnum;

}) ; 
