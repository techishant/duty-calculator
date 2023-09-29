
const words = ["Zero", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ",
        "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "];
const tens = ["Ten ", "Twenty ", "Thirty ", "Fourty ", "Fifty ", "Sixty ", "Seventy ", "Eighty ", "Ninety ", "Hundred "];

function out_1to19(inp){
    let output = "";
    if (inp == 10){
                output = output.concat(tens[0]);
        }else if(inp >10 && inp <20){
            output = output.concat(words[inp-1]);
        }else{
            output = output.concat(words[inp]);
        }
    return output;
}

function out_20to99(inp){
    let output = "";
    for (i=1; i<tens.length; i++){
        let inpModTens = inp%((i+1)*10);
        if (inpModTens <10 && parseInt((inp/((i+1)*10))) == 1){
            output = output.concat(tens[i]);
            if (inpModTens !=0){
                output = output.concat(words[inpModTens]);
            }
            break;
        }
    }
    return output;
} 

    function out_100to999(inp){
    let output = "";
    output = output.concat(words[parseInt(inp/100)]);
    output = output.concat("Hundred ");
    if (inp %100  < 20){
        output = output.concat(out_1to19(inp%100));
    }else{
        output = output.concat(out_20to99(inp%100));
    }
    return output;
}

function out_1000to99999(inp){
    let output = "";
    output = output.concat( ((parseInt(inp/1000))<20)? out_1to19(parseInt(inp/1000)): out_20to99(parseInt(inp/1000)) );
    output = output.concat("Thousand ");
    if (inp%1000 != 0)
    output = output.concat( ((inp%1000)<20)? out_1to19(inp%1000): ((inp%1000) < 100)? out_20to99(inp%1000): out_100to999(inp%1000) );
    console.log(output);
    return output;
}

function out_100000to9999999(inp){
    let output = "";
    output = output.concat(  ((parseInt(inp/100000))<20)? out_1to19(parseInt(inp/100000)): out_20to99(parseInt(inp/100000))  );
    output = output.concat("Lakh ");
    if (inp%100000 != 0)
    output = output.concat(  (inp<1000000)? out_1000to99999(inp%100000): out_1000to99999(inp%100000)  );
    
    return output;
}

function out_10000000to999999999(inp){
    let output = "";
    output = output.concat(  ((parseInt(inp/10000000))<20)? out_1to19(parseInt(inp/10000000)): out_20to99(parseInt(inp/10000000))  );
    output = output.concat("Crore ");
    if (inp%100000 != 0)
    output = output.concat(  (inp<100000000)? out_100000to9999999(inp%10000000): out_100000to9999999(inp%10000000)  );
    return output;
}


function getWord(inp){
    
    
    let output = "";
    // 1 to 19
    if (inp < 20){
        output = output.concat(out_1to19(inp));
    }else
    // 20 to 99
    if (inp < 100){
        output = output.concat(out_20to99(inp));
    }else 
    // 100 to 999
    if(inp <1000){
        output = output.concat(out_100to999(inp));
    }else
    // 1000 to 99999
    if (inp < 100000){
        output = out_1000to99999(inp);
    }
    else if (inp < 10000000){
        output = out_100000to9999999(inp);
    }
    else{
        output = out_10000000to999999999(inp);
    }
    
    return output.trim();
}