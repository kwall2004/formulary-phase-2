/**
 * Created by s6685 on 1/16/2017.
 */
// Vtype for fax number validation
Ext.apply(Ext.form.VTypes, {
    'faxText': 'Not a valid fax number. Must be in the format 123-456-7890.',
    'faxMask': /[\-\+0-9\(\)\s\.Ext]/,
    'faxRe': /^([0-9]{3}\-{1})([0-9]{3}[-]{1}[0-9]{4})$|^(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}$|^Ext. [0-9]+$/,
    'fax': function (v) {
        return this.faxRe.test(v);
    }
});

// Function to format a fax number
Ext.apply(Ext.util.Format, {
    faxNumber: function(value) {
        var faxNumber = value.replace(/\./g, '').replace(/-/g, '').replace(/[^0-9]/g, '');

        if (faxNumber != '' && faxNumber.length == 10) {
            return faxNumber.substr(0, 3) + '-' + faxNumber.substr(3, 3) + '-' + faxNumber.substr(6, 4);
        } else {
            return value;
        }
    }
});

Ext.namespace('Ext.ux.plugin');

// Plugin to format a fax number on value change
Ext.define('Ext.ux.plugin.FormatFaxNumber', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.faxnumberformatter',
    init: function(c) {
        c.on('change', this.onChange, this);
    },
    onChange: function(c) {
        c.setValue(Ext.util.Format.faxNumber(c.getValue()));
    }
});