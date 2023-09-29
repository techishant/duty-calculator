const themeSelector = document.getElementById("themeSelector");


let acc_col_arr = ["#6a1b9a", "#c62828", "#283593", "#2e7d32", "#00796b", "#0097a7", "#ad1457"]
document.body.style.setProperty('--acc-color', localStorage.getItem("acc-color"));                                           

let tempDiv;

for(i = 0; i<acc_col_arr.length; i++){
    tempDiv = document.createElement("span");
    tempDiv.style.background = `${acc_col_arr[i]}`
    tempDiv.addEventListener("click", function(){
        document.body.style.setProperty('--acc-color', this.style.background);
        localStorage.setItem("acc-color", this.style.background);
    })
    themeSelector.appendChild(tempDiv);
}