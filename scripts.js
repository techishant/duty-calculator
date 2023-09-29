// INPUT
const CIvalue = document.getElementById('CIvalue');
const rateValue = document.getElementById('rateValue');
const freightValue = document.getElementById('freightValue');
const select_BCD_rate = document.getElementById("BCDrate");
const GSTval = document.getElementsByName('GSToption');

//OUTPUT
const INRvalue = document.getElementById('INRvalue');
const freightFinalValue = document.getElementById('FreightFinalValue');
const insuranceValue = document.getElementById('insuranceValue');
const totalValue = document.getElementById('totalValue');
const BCDvalue = document.getElementById("BCDvalue");
const SWvalue = document.getElementById("SWvalue");
const amtValue = document.getElementById("amtValue");
const gstAmtValue = document.getElementById("gstAmtVal");

// EUR Or USD
const currLabel = document.getElementById('curr');


let ci, r, fr, BCD_rate;
let inr = 0;
let FR = 0;
let insurance = 0;
let total = 0;

let BCD = 0;
let SW = 0;
let amt = 0;
let gst = 0;
let gstAmt  = 0;


var BCD_Rates_List = [10, 15, 20, 25];

CIvalue.addEventListener('input', updateCI_rate);
rateValue.addEventListener('input', updateCI_rate);
freightValue.addEventListener('input', updateFreight);
for(i = 0; i<GSTval.length; i++){
    GSTval[i].addEventListener('input', calculateValues);
}
select_BCD_rate.addEventListener('change', calculateValues);

// Adding those options to DOM throgh JS
let opt;
for(i = 0; i<BCD_Rates_List.length; i++){
    opt = document.createElement("option")
    opt.value = BCD_Rates_List[i];
    opt.innerText = `${BCD_Rates_List[i]}%`;
    select_BCD_rate.appendChild(opt);
}

// Fixing EUR and USD
curr.addEventListener('click', function(){
    if(curr.innerText == "(EUR)") curr.innerText = "(USD)";
    else  curr.innerText = "(EUR)";
});

let isFRupdated = false;
let isupdateCI_rate = false;
function updateFreight(){
    // fr = freightValue.value
    isFRupdated = true;
    calculateValues();
}

function updateCI_rate(){
    isupdateCI_rate = true;
    calculateValues();
}

calculateValues();



function calculateValues(){
    // intializing
    r = parseFloat(rateValue.value);
    ci = parseFloat(CIvalue.value);

    inr = Math.round(ci * r);

    if(isupdateCI_rate){
        freightValue.value = Math.round(20/100.0 * inr);
        isupdateCI_rate = false;    
    }

    if(isFRupdated == false){
        freightValue.value = Math.round(20/100.0 * inr);
        isFRupdated = true;
    }
    fr = parseFloat(freightValue.value);
    

    BCD_rate = parseFloat(select_BCD_rate.value);
    insurance = Math.round(1.125/100 * inr);

    total = Math.round(inr + fr + insurance);

    BCD = Math.round(BCD_rate/100.0 * total);
    SW = Math.round(10/100 * BCD);

    for(i = 0; i<GSTval.length; i++){
        if(GSTval[i].checked) {
            gst = parseFloat(GSTval[i].value);
            break;
        }
    }

    gstAmt = Math.round(gst/100.0 * (BCD+SW+total));
    amt = Math.round(BCD + SW + gstAmt);



    INRvalue.innerText = `₹${inr}`;
    freightFinalValue.innerText = `₹${fr}`;
    insuranceValue.innerText = `₹${insurance}`;
    totalValue.innerText = `₹${total}`;
    BCDvalue.innerText = `₹${BCD}`;
    SWvalue.innerText = `₹${SW}`;
    amtValue.innerText = `₹${amt}`;
    gstAmtValue.innerText = `₹${gstAmt}`;

}

