
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

// buttons
const newDutyBtn = document.getElementById("newDutyBtn");

// LISTS
const BillsListPanel = document.getElementById("BillsList");

// The Bill List
let billsList = Array(1).fill(new Duty());
// storing the index of current duty selected and to be shown
let currentDuty = 0;

// Arrays of Some constants
const BCD_Rates_List = [10, 15, 20, 25];
const duty_name_list = ["HARDWARE", "NON-HARDWARE", "OTHERS"];

// Create new duty
newDutyBtn.addEventListener('click', () => {
    billsList.push(new Duty());
    currentDuty = billsList.length - 1;
    resetForm();
    calculateValues();
});

// Handling Inputs
CIvalue.addEventListener('input', whenCI_Rate_or_exchangeRateUpdates);
rateValue.addEventListener('input', whenCI_Rate_or_exchangeRateUpdates);
freightValue.addEventListener('input', updateFreight);
// GST val is a radio button pair. So, gst val is getElementsByName
for (let i = 0; i < GSTval.length; i++) {
    GSTval[i].addEventListener('input', calculateValues);
}

// Some dropdowns
select_BCD_rate.addEventListener('change', calculateValues);
dutyNameSelector.addEventListener('change', calculateValues);

// Adding options to our dropDowns
let opt;

// duty name options
for (let i = 0; i < duty_name_list.length; i++) {
    opt = document.createElement("option");
    opt.value = duty_name_list[i];
    opt.innerText = `${duty_name_list[i]}`;
    dutyNameSelector.appendChild(opt);
}

// BCD Rates options
opt = null;
for (i = 0; i < BCD_Rates_List.length; i++) {
    opt = document.createElement("option");
    opt.value = BCD_Rates_List[i];
    opt.innerText = `${BCD_Rates_List[i]}%`;
    select_BCD_rate.appendChild(opt);
}

// Change Currency
curr.addEventListener('click', function () {
    if (curr.innerText == "(EUR)") curr.innerText = "(USD)";
    else curr.innerText = "(EUR)";
    calculateValues();
});

// some conditions storing variables
let isFRupdated = false;
let isCI_rate_or_exchangeRate_Update = false;

/**
 * to update Freight
 * Note: Freight is automatically \
 * calculated as well as can be changed by user
 */
function updateFreight() {
    isFRupdated = true;
    calculateValues();
}

/**
 * perform Some action when CI_Rate_or_exchangeRateUpdates
 */
function whenCI_Rate_or_exchangeRateUpdates() {
    isCI_rate_or_exchangeRate_Update = true;
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


    if (isCI_rate_or_exchangeRate_Update) {
        billsList[currentDuty].calculateFrValue();
        freightValue.value = billsList[currentDuty].getFr();
        isCI_rate_or_exchangeRate_Update = false;
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
    updateList();
}


/**
 * update the output panels with the outputs 
 * corresponding to the current selected duty
 */
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

/**
 * to update the form(all the inputs)
 * corresponding to the current selected duty
 */
function flipForm() {
    console.log("Flip Index: " + currentDuty);
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

/**
 * completely resets the form(inputs)
 * to inital state
 * used when creating a new duty
 */
function resetForm() {
    curr.innerText = "(USD)";
    dutyNameSelector.value = "HARDWARE";
    CIvalue.value = 100;
    rateValue.value = 85;
    select_BCD_rate.value = 10;
    // console.log(select_BCD_rate.value);
    GSTval[1].checked = true;
    calculateValues();
    freightValue.value = billsList[currentDuty].getFr()
    // Flip output would automatically reset the
    // outputs panel to default values as it will re-calculate
    // all the values.
    flipOutputs();
}

/**
 * to change current duty
 */
function changeCurrentDuty(newDutyIndex) {
    currentDuty = newDutyIndex;
    updateList();
    flipForm();
    flipOutputs();
    // calculateValues();
}


/**
 * Updates the list Panel
 */
function updateList() {
    // console.log(billsList);
    let item;
    BillsListPanel.innerHTML = "";
    for (let j = 0; j < billsList.length; j++) {
        item = document.createElement("li");
        item.classList.remove("selected");
        item.classList = (currentDuty === j) ? "selected" : "";
        item.innerHTML = `
        <div class="info-panel">
        <span class="name">${billsList[j].name}</span>
        <span>SW: ${billsList[j].sw}</span>
        <span>GST: ${billsList[j].gstAmt}</span>
        <span>Duty Payable Amount: ${billsList[j].amt}</span>
        </div>

        <span class="action-panel">
            <button onclick="deleteDuty(${j})">Delete</button>
        </span>`;

        item.getElementsByClassName('info-panel')[0].addEventListener("click", () => {
            if (currentDuty != j) {
                // console.log(j);
                changeCurrentDuty(j);
            }
        });
        BillsListPanel.append(item);
    }
}


function deleteElement(target) {
    if (target == 0 && billsList.length == 1) {
        resetForm();
        return;
    }
    for (let i = target; i < billsList.length - 1; i++) {
        billsList[i] = billsList[i + 1];
    }
    billsList = billsList.slice(0, billsList.length - 1);
    console.log("Bills: " + billsList + "  |  " + target);
    if (target == 0) changeCurrentDuty(target + 1);
    else if (target == billsList.length) changeCurrentDuty(target - 1);
    else changeCurrentDuty(target);
}


function deleteDuty(index) {
    if(confirm("Delete Permanently? "))
    deleteElement(index);
}
