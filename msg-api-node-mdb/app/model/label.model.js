class Label {
    constructor(applCode, labelLocale, labelKey, labelValue) {
        this.applCode = applCode.toLowerCase();
        this.labelKey = labelKey.toLowerCase();
        this.labelLocale = labelLocale;
        if ( labelValue !== undefined ) 
        	this.labelValue = labelValue;
    }
}
module.exports = Label;