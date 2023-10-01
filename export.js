
function exportAsPDF() {
    const doc = new window.jspdf.jsPDF({
        unit: "pt",
        orientation: "p",
        lineHeight: 1.3
    });

    doc.setFontSize(28);
    doc.setFont(undefined, 'bold');
    doc.text("DHL Duty", 20, 50);
    doc.line(10, 58, 585, 58);
    doc.setFont(undefined, 'normal');

    doc.setFontSize(14);
    doc.autoTable({
        startY: 100,
        body: getRows(),
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.2,
        },
        bodyStyles: {
            fillColor: [255, 255, 255],
            textColor: 0,
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255],
        },
        columnStyles: {
            0: {
                fontStyle: 'bold',
            }
        },

        didDrawPage: function (data) {
        }
    });


    doc.setFontSize(12);
    doc.text(`Rupees ${getWord(amt)} only.`, 20, 450)

    let currentDateAndTime = new Date();
    let out = `${currentDateAndTime.getDate()}-${currentDateAndTime.getMonth()}-${currentDateAndTime.getFullYear()} | ${currentDateAndTime.getHours()}:${currentDateAndTime.getMinutes()}:${currentDateAndTime.getSeconds()}`;

    doc.line(10, 470, 585, 470);
    doc.text(out, 20, 481);

    doc.save();
}

function getRows() {
    let rows = []

    rows.push([`CI Value ${curr.innerText}`, ci]);
    rows.push(["Exchange Rate", r]);
    rows.push(["Freight", fr]);
    rows.push(["BCD(%)", `${BCD_rate}%`]);
    rows.push(["INR Value", inr]);
    rows.push(["Insurance", insurance]);
    rows.push(["Total", total]);
    rows.push(["BCD", BCD]);
    rows.push(["SW", SW]);
    rows.push(["GST", gstAmt]);
    rows.push(["Duty Payable Amount", amt]);
    return rows;
}


const exportBtn = document.getElementById("genPDFbtn");
exportBtn.addEventListener('click', exportAsPDF);