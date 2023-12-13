class Duty{
    constructor(){
        this.name = null;
        this.freight = null;

        this.gst = null;
        
        this.r = null;
        this.ci = null;

        this.inr = null;
        this.fr = null;
        this.insurance= null;
        this.total = null;
        this.bcd = null;
        this.sw = null;
        this.gstAmt = null;
        this.amt = null;
    }

    // input

    inputCI$R(ci,r){
        this.ci = ci;
        this.r = r;
    }

    inputGST(gst){
        this.gst = gst;
    }

    calculateINRvalue(){
        this.inr = this.ci *this.r;
    }
    calculateFrValue(){
        this.fr = Math.round(20/100.0 * this.inr);
    }
    calculateFrValue(freight){
        this.fr = freight;
    }
    calculateInsurance(){
        this.insurance = Math.round(1.125 / 100 * this.inr);
    }
    calculateTotal(){
        this.total = Math.round(this.inr + this.fr + this.insurance);
    }
    calculateBCDandSW(){
        this.bcd = Math.round(this.bcd_rate / 100.0 * this.total);
        this.sw = Math.round(10 / 100 * this.bcd);
    }

    calculateGstAndAmount(){
        this.gstAmt = Math.round(this.gst / 100.0 * (this.bcd + this.sw + this.total));
        this.amt = Math.round(this.bcd + this.sw + this.gstAmt);
    }

    getFr(){
        return Math.round(20/100.0 * this.inr);
    }



}

