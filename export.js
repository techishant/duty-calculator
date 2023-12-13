
function exportAsPDF(duty) {
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
        body: getRows(duty),
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
    doc.text(`Rupees ${getWord(duty.amt)} only.`, 20, 450)

    let currentDateAndTime = new Date();
    let out = `${currentDateAndTime.getDate()}-${currentDateAndTime.getMonth() + 1}-${currentDateAndTime.getFullYear()} | ${currentDateAndTime.getHours()}:${currentDateAndTime.getMinutes()}:${currentDateAndTime.getSeconds()}`;

    doc.line(10, 470, 585, 470);
    doc.text(out, 20, 481);

    // doc.addPage(); For a future project
    doc.line(10, 470, 585, 470);

    doc.save();
}

function getRows(duty) {
    let rows = []

    rows.push([`Names `, duty.name]);
    rows.push([`CI Value ${duty.curr}`, duty.ci]);
    rows.push(["Exchange Rate", duty.r]);
    rows.push(["Freight", duty.fr]);
    rows.push(["BCD(%)", `${duty.bcd_rate}%`]);
    rows.push(["INR Value", duty.inr]);
    rows.push(["Insurance", duty.insurance]);
    rows.push(["Total", duty.total]);
    rows.push(["BCD", duty.bcd]);
    rows.push(["SW", duty.sw]);
    rows.push(["GST", duty.gstAmt]);
    rows.push(["Duty Payable Amount", duty.amt]);
    return rows;
}


const exportBtn = document.getElementById("genPDFbtn");
exportBtn.addEventListener('click', () => exportAsPDF(duty1));