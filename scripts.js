
// INPUT
const CIvalue = document.getElementById('CIvalue');
const rateValue = document.getElementById('rateValue');
const freightValue = document.getElementById('freightValue');
const select_BCD_rate = document.getElementById("BCDrate");
const GSTval = document.getElementsByName('GSToption');
const dutyNameSelector = document.getElementById('dutyNameSelector');

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

const newDutyBtn = document.getElementById("newDutyBtn");

// LISTS
const BillsListPanel = document.getElementById("BillsList");

let billsList = Array(1).fill(new Duty());
let currentDuty = 0;

var BCD_Rates_List = [10, 15, 20, 25];
const duty_name_list = ["HARDWARE", "NON-HARDWARE", "OTHERS"];

newDutyBtn.addEventListener('click', () => {
    billsList.push(new Duty());
    currentDuty++;
    resetForm();
    calculateValues();
});


CIvalue.addEventListener('input', updateCI_rate);
rateValue.addEventListener('input', updateCI_rate);
freightValue.addEventListener('input', updateFreight);
for (i = 0; i < GSTval.length; i++) {
    GSTval[i].addEventListener('input', calculateValues);
}
select_BCD_rate.addEventListener('change', calculateValues);
dutyNameSelector.addEventListener('change', calculateValues);

let opt;
for (i = 0; i < duty_name_list.length; i++) {
    opt = document.createElement("option")
    opt.value = duty_name_list[i];
    opt.innerText = `${duty_name_list[i]}   `;
    dutyNameSelector.appendChild(opt);
}

// Adding those options to DOM throgh JS
opt;
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

function calculateValues() {
    billsList[currentDuty].curr = curr.innerText;

    billsList[currentDuty].name = dutyNameSelector.value;
    billsList[currentDuty].inputCI$R(parseFloat(CIvalue.value), parseFloat(rateValue.value));
    /**
     * this.inr = this.ci * this.r
     */
    billsList[currentDuty].calculateINRvalue();


    if (isupdateCI_rate) {
        billsList[currentDuty].calculateFrValue();
        freightValue.value = billsList[currentDuty].getFr();
        isupdateCI_rate = false;
    }

    if (isFRupdated == false) {
        billsList[currentDuty].calculateFrValue();
        freightValue.value = billsList[currentDuty].getFr();
        isFRupdated = true;
    }

    billsList[currentDuty].calculateFrValue(parseFloat(freightValue.value));

    billsList[currentDuty].calculateInsurance();
    billsList[currentDuty].bcd_rate = parseFloat(select_BCD_rate.value);

    billsList[currentDuty].calculateTotal();

    billsList[currentDuty].calculateBCDandSW();

    for (i = 0; i < GSTval.length; i++) {
        if (GSTval[i].checked) {
            billsList[currentDuty].gst = parseFloat(GSTval[i].value);
            break;
        }
    }

    billsList[currentDuty].calculateGstAndAmount();

    flipOutputs();
    updateList()
}


function flipOutputs() {
    INRvalue.innerText = `₹${billsList[currentDuty].inr}`;
    freightFinalValue.innerText = `₹${billsList[currentDuty].fr}`;
    insuranceValue.innerText = `₹${billsList[currentDuty].insurance}`;
    totalValue.innerText = `₹${billsList[currentDuty].total}`;
    BCDvalue.innerText = `₹${billsList[currentDuty].bcd}`;
    SWvalue.innerText = `₹${billsList[currentDuty].sw}`;
    amtValue.innerText = `₹${billsList[currentDuty].amt}`;
    gstAmtValue.innerText = `₹${billsList[currentDuty].gstAmt}`;
}

function flipForm() {
    dutyNameSelector.value = billsList[currentDuty].name;
    CIvalue.value = billsList[currentDuty].ci;
    curr.innerText = billsList[currentDuty].curr;
    rateValue.value = billsList[currentDuty].r;
    freightValue.value = billsList[currentDuty].fr;
    BCDvalue.value = billsList[currentDuty].bcd;
    if (billsList[currentDuty].gst == 12) {
        GSTval[0].checked = true;
    } else {
        GSTval[0].checked = false;
    }

}

function resetForm() {
    curr.innerText = "(USD)";
    dutyNameSelector.value = "HARDWARE";
    CIvalue.value = 100;
    rateValue.value = 85;
    BCDvalue.value = "10%";
    GSTval[1].checked = true;
    calculateValues();
    freightValue.value = billsList[currentDuty].getFr()
    flipOutputs();
}

function changeCurrentDuty(newDutyIndex) {
    currentDuty = newDutyIndex;
    updateList();
    flipForm();
    flipOutputs();
    // calculateValues();
}


function updateList() {
    console.log(billsList);
    let item;
    BillsListPanel.innerHTML = "";
    for (let j = 0; j < billsList.length; j++) {
        item = document.createElement("li");
        item.classList.remove("selected");
        item.classList = (currentDuty === j) ? "selected" : "";
        item.innerHTML = `<span class="name">${billsList[j].name}</span>
        <span>SW: ${billsList[j].sw}</span>
        <span>GST: ${billsList[j].gstAmt}</span>
        <span>Duty Payable Amount: ${billsList[j].amt}</span>

        <span class="action-panel">
            <button>Delete</button>
            <button>Edit</button>
        </span>`;

        item.addEventListener("click", () => {
            console.log(j)
            changeCurrentDuty(j);
        });
        BillsListPanel.append(item);
    }
}
