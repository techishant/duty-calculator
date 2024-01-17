class Duty {
  /**
   * initializing the calculators
   */

  static exw;
  static r; // exchange rate
  static totalWeight;
  static totalFreight;
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
    this.total = null; // Assessable Value
    this.bcd = null;
    this.sw = null;
    this.gstAmt = null;
    this.amt = null;
    this.bcd_rate = null;
    this.ass_value = null;
  }

  static inputConstants(exR, exwrate, tw, tf) {
    this.r = exR;
    this.exw = exwrate;
    this.totalWeight = tw;
    this.totalFreight = tf;
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
  static inputTotalFreight(tf) {
    this.totalFreight = tf;
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
    this.misc = round2((Duty.exw / Duty.totalWeight) * this.weight);
  }

  calculateINRvalue() {
    this.inr = this.ci * Duty.r;
  }
  calculateFrValue() {
    // this.fr = Math.round(20/100.0 * this.inr);
    this.fr = round2((Duty.totalFreight / Duty.totalWeight) * this.weight);
  }
  calculateFrValue(freight) {
    if (freight != undefined) {
      this.fr = freight;
    }
  }
  calculateInsurance() {
    this.insurance = round2((1.125 / 100) * this.ci);
  }
  calculateTotal() {
    this.total = round2(
      (this.ci + this.misc + this.fr + this.insurance) * Duty.r
    );
  }
  calculateBCDandSW() {
    this.bcd = round2((this.bcd_rate / 100.0) * this.total);
    this.sw = round2((10 / 100) * this.bcd);
  }

  calculateGstAndAmount() {
    this.gstAmt = round2(
      (this.gst / 100.0) * (this.bcd + this.sw + this.total)
    );
    this.amt = Math.round(this.bcd + this.sw + this.gstAmt);
  }

  getFr() {
    // return Math.round(20/100.0 * this.inr);
    return round2((Duty.totalFreight / Duty.totalWeight) * this.weight);
  }
}

