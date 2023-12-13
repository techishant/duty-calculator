
// INPUT
const CIvalue = document.getElementById('CIvalue');
const rateValue = document.getElementById('rateValue');
const freightValue = document.getElementById('freightValue');
const select_BCD_rate = document.getElementById("BCDrate");
const GSTval = document.getElementsByName('GSToption');
const DutyName = document.getElementById('dutyName');

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

const duty1 = new Duty();

let ci, r, fr, BCD_rate;
let inr = 0;
let FR = 0;
let insurance = 0;
let total = 0;

let BCD = 0;
let SW = 0;
let amt = 0;
let gst = 0;
let gstAmt = 0;


var BCD_Rates_List = [10, 15, 20, 25];

CIvalue.addEventListener('input', updateCI_rate);
rateValue.addEventListener('input', updateCI_rate);
freightValue.addEventListener('input', updateFreight);
DutyName.addEventListener('input', calculateValues);
for (i = 0; i < GSTval.length; i++) {
    GSTval[i].addEventListener('input', calculateValues);
}
select_BCD_rate.addEventListener('change', calculateValues);

// Adding those options to DOM throgh JS
let opt;
for (i = 0; i < BCD_Rates_List.length; i++) {
    opt = document.createElement("option")
    opt.value = BCD_Rates_List[i];
    opt.innerText = `${BCD_Rates_List[i]}%`;
    select_BCD_rate.appendChild(opt);
}

// Fixing EUR and USD
curr.addEventListener('click', function () {
    if (curr.innerText == "(EUR)") curr.innerText = "(USD)";
    else curr.innerText = "(EUR)";
    calculateValues();
});

let isFRupdated = false;
let isupdateCI_rate = false;
function updateFreight() {
    // fr = freightValue.value
    isFRupdated = true;
    calculateValues();
}

function updateCI_rate() {
    isupdateCI_rate = true;
    calculateValues();
}

calculateValues();

function calculateValues(){

    duty1.curr = curr.innerText;

    duty1.name = DutyName.value;
    duty1.inputCI$R(CIvalue.value, rateValue.value);
    /**
     * this.inr = this.ci * this.r
     */
    duty1.calculateINRvalue();


    if (isupdateCI_rate) {
        duty1.calculateFrValue();
        freightValue.value =  duty1.getFr();
        isupdateCI_rate = false;
    }
    
    if (isFRupdated == false) {
        duty1.calculateFrValue();
        freightValue.value = duty1.getFr();
        isFRupdated = true;
    }

    duty1.calculateFrValue(parseFloat(freightValue.value));

    duty1.calculateInsurance();
    duty1.bcd_rate = parseFloat(select_BCD_rate.value);

    duty1.calculateTotal();

    duty1.calculateBCDandSW();

    for (i = 0; i < GSTval.length; i++) {
        if (GSTval[i].checked) {
            duty1.gst = parseFloat(GSTval[i].value);
            break;
        }
    }

    duty1.calculateGstAndAmount();

    flipForm();
}


function flipForm(){
    INRvalue.innerText = `₹${duty1.inr}`;
    freightFinalValue.innerText = `₹${duty1.fr}`;
    insuranceValue.innerText = `₹${duty1.insurance}`;
    totalValue.innerText = `₹${duty1.total}`;
    BCDvalue.innerText = `₹${duty1.bcd}`;
    SWvalue.innerText = `₹${duty1.sw}`;
    amtValue.innerText = `₹${duty1.amt}`;
    gstAmtValue.innerText = `₹${duty1.gstAmt}`;
}

