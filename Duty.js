class Duty {
  /**
   * initializing the calculators
   */

  static exw;
  static r; // exchange rate
  static totalWeight;
  constructor() {
    this.name = null;
    this.freight = null;

    this.curr = "USD";

    this.gst = null;

    // this.r = null;
    this.ci = null;

    this.weight = null;

    this.misc = null;
    this.inr = null;
    this.fr = null;
    this.insurance = null;
    this.total = null;
    this.bcd = null;
    this.sw = null;
    this.gstAmt = null;
    this.amt = null;
    this.bcd_rate = null;
    this.ass_value = null;
  }

  static inputConstants(exR, exwrate, tw) {
    this.r = exR;
    this.exw = exwrate;
    this.totalWeight = tw;
  }

  static inputExchangeRate(exR) {
    this.r = exR;
  }

  static inputExwRate(exwrate) {
    this.exw = exwrate;
  }

  static inputTotalWeight(tw) {
    this.totalWeight = tw;
  }

  // input
  inputCI$R(ci, r) {
    this.ci = ci;
    this.r = r;
  }

  inputWeight(w) {
    this.weight = w;
  }

  inputGST(gst) {
    this.gst = gst;
  }

  calculateMiscValue() {
    this.misc = Math.round((Duty.exw / Duty.totalWeight) * this.weight);
  }

  calculateINRvalue() {
    this.inr = this.ci * Duty.r;
  }
  calculateFrValue() {
    console.log("He got called");
    // this.fr = Math.round(20/100.0 * this.inr);
    this.fr = Math.round((900 / Duty.totalWeight) * this.weight);
  }
  calculateFrValue(freight) {
    if (freight != undefined) {
      console.log("I got called", freight);
      this.fr = freight;
    }
  }
  calculateInsurance() {
    this.insurance = Math.round((1.125 / 100) * this.ci);
  }
  calculateTotal() {
    this.total = Math.round(
      (this.ci + this.misc + this.fr + this.insurance) * Duty.r
    );
  }
  calculateBCDandSW() {
    this.bcd = Math.round((this.bcd_rate / 100.0) * this.total);
    this.sw = Math.round((10 / 100) * this.bcd);
  }

  calculateGstAndAmount() {
    this.gstAmt = Math.round(
      (this.gst / 100.0) * (this.bcd + this.sw + this.total)
    );
    this.amt = Math.round(this.bcd + this.sw + this.gstAmt);
  }

  getFr() {
    // console.log(this.weight, Duty.totalWeight)
    // return Math.round(20/100.0 * this.inr);
    return Math.round((900 / Duty.totalWeight) * this.weight);
  }
}
