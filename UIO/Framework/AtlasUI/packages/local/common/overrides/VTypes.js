Ext.define('Atlas.common.VTypes', {
    override: 'Ext.form.field.VTypes',

    daterange: function (val, field) {
        var date = field.parseDate(val);
        if (!date) {
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = field.up('form').down('#' + field.startDateField);
            start.setMaxValue(date);
            console.log('in func daterange the  startdate is ' + start.setMaxValue(date));
            start.validate();
            this.dateRangeMax = date;
        }
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = field.up('form').down('#' + field.endDateField);

            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
         */
        return true;
    },

    daterangeText: 'Start date must be less than end or termination date',

    atlasAlphaNum: function (val, field) {
        return this.atlasAlphaNumRe.test(val);
    },

    atlasAlphaNumRe: /^[a-z\d\s]+$/i,
    atlasAlphaNumText: 'Must contain only alphanumeric and space characters.',
    atlasAlphaNumMask: /^[a-z\d\s]+$/i,


    atlasAlphaNumDash: function (val, field) {
        return this.atlasAlphaNumDashRe.test(val);
    },

    atlasAlphaNumDashRe: /^[a-z\d\s\-\(\)\/]+$/i,
    atlasAlphaNumDashText: 'Must contain only alphanumeric, dash and space characters.',
    atlasAlphaNumDashMask: /^[a-z\d\s\-\(\)\/]+$/i,


    year: function (val, field) {
        return this.yearRe.test(val);
    },

    yearRe: /^[1-9][0-9]{3}$/i,
    yearText: 'Must contain a 4 digit year.',
    yearMask: /[\d]/i,

    numeric: function (val, field) {
        return this.numericRe.test(val);
    },

    numericRe: /^[\d]+$/i,
    numericText: 'Must contain a numeric value.',
    numericMask: /[\d]/i,

    percent: function (val, field) {
        return this.percentRe.test(val);
    },

    percentRe: /^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/i,
    percentText: 'Must contain a percentage value.',
    percentMask: /[.0-9]/i,

    posnegpercent: function (val, field) {
        return this.posnegpercentRe.test(val);
    },

    posnegpercentRe: /^(-)?(\d{1,3}(\.\d{1,2})?)$/i,
    posnegpercentText: 'Must contain a positive or negative percentage value.',
    posnegpercentMask: /[\-.0-9]/i,

    ninetyninepercent: function (val, field) {
        return this.ninetyninepercentRe.test(val);
    },

    ninetyninepercentRe: /^(99(\.0{1,2})?|9[0-8](\.\d{1,2})?|[1-8]?\d(\.\d{1,2})?)$/i,
    ninetyninepercentText: 'Must contain a percentage value.',
    ninetyninepercentMask: /[.0-9]/i,

    multiplier: function (val, field) {
        return this.multiplierRe.test(val);
    },

    multiplierRe: /^(99(\.0{1})?|9[0-8](\.\d{1})?|[1-8]?\d(\.\d{1})?)$/i,
    multiplierText: 'Must contain a multiplier value.',
    multiplierMask: /[.0-9]/i,

    currency: function (val, field) {
        return this.currencyRe.test(val);
    },

    currencyRe: /^-?0*(?:\d+(?!,)(?:\.\d{1,2})?|(?:\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?))$/i,

    currencyText: 'Must contain a currency value.',
    currencyMask: /[,.0-9]/i,

    password: function (val, field) {
        if (field.initialPassField) {
            var pwd = field.up('form').down('#' + field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },

    passwordText: 'Passwords do not match',

    fieldValueMatch: function (val, field) {
        //Ignore if not configured
        if (!field.matchField) {
            return true;
        }

        var altField = field.up('form').getForm().findField(field.matchField)

        // don't validate unless both fields have a value
        if (!(field.getValue().length > 0 && altField.getValue().length > 0)) {
            return true;
        }

        // make sure they don't match
        return field.getValue() === altField.getValue();
    },
    fieldValueMatchText: 'Field values does not match',

    merlinLoginPasswordRe: (/^(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%&*^?]).{8,14}$/),

    loginPassword: function (val, field) {
        return this.merlinLoginPasswordRe.test(val);
    },
    loginPasswordText: 'Password must be between 8 and 14 characters.</br>Password must contain a combination of letters and numbers.</br>Password must contain at least one CAPITALIZED letter.</br>Password must contain one special character (!@#$%&*^?).'
});

