
function exportAsPDF(duty_list) {
    const doc = new window.jspdf.jsPDF({
        unit: "pt",
        orientation: "p",
        lineHeight: 1.3
    });

    for(let i = 0; i<duty_list.length; i++){
        doc.setFontSize(28);
        doc.setFont(undefined, 'bold');
        doc.text("DHL Duty", 20, 50);
        doc.line(10, 58, 585, 58);
        doc.setFont(undefined, 'normal');
    
        doc.setFontSize(14);
        doc.autoTable({
            startY: 100,
            body: getRows(duty_list[i]),
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
        doc.text(`Rupees ${getWord(duty_list[i].amt)} only.`, 20, 450)
    
        let currentDateAndTime = new Date();
        let out = `${currentDateAndTime.getDate()}-${currentDateAndTime.getMonth() + 1}-${currentDateAndTime.getFullYear()} | ${currentDateAndTime.getHours()}:${currentDateAndTime.getMinutes()}:${currentDateAndTime.getSeconds()}`;
    
        doc.line(10, 470, 585, 470);
        doc.text(out, 20, 481);
        doc.addPage();
    }
    createTotalPage(doc, duty_list);
    doc.save();

}

function createTotalPage(doc, duty_list){
    doc.setFontSize(28);
        doc.setFont(undefined, 'bold');
        doc.text("DHL Duty", 20, 50);
        doc.line(10, 58, 585, 58);
        doc.setFont(undefined, 'normal');
    
        doc.setFontSize(14);
        doc.autoTable({
            startY: 100,
            body: getRowsForTotal(duty_list, doc),
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
    
        let currentDateAndTime = new Date();
        let out = `${currentDateAndTime.getDate()}-${currentDateAndTime.getMonth() + 1}-${currentDateAndTime.getFullYear()} | ${currentDateAndTime.getHours()}:${currentDateAndTime.getMinutes()}:${currentDateAndTime.getSeconds()}`;
    
        doc.line(10, 470, 585, 470);
        doc.text(out, 20, 481);
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

function getRowsForTotal(duty_list, doc) {
    let rows = []
    let t_bcd = 0;
    let t_sw = 0;
    let t_gst = 0;
    let t_amt = 0;
    for(let i = 0; i<duty_list.length; i++){
        t_bcd+=duty_list[i].bcd;
        t_sw+=duty_list[i].sw;
        t_gst+=duty_list[i].gstAmt;
        t_amt+=duty_list[i].amt;
    }
    rows.push([`Total BCD `, t_bcd]);
    rows.push([`Total SW `,t_sw]);
    rows.push(["Total GST", t_gst]);
    rows.push(["Total Amount", t_amt]);

    doc.text(`Rupees ${getWord(t_amt)} only.`, 20, 450)
    return rows;
    
}

const exportBtn = document.getElementById("genPDFbtn");
exportBtn.addEventListener('click', () => exportAsPDF(billsList));