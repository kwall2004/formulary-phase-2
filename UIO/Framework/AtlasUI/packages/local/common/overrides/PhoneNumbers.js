// Vtype for phone number validation
Ext.apply(Ext.form.VTypes, {
    'phoneText': 'Not a valid phone number. Must be in the format (123) 456-7890.',
    'phoneMask': /[\-\+0-9\(\)\s\.Ext]/,
    'phoneRe': /^(\({1}[0-9]{3}\){1}\s{1})([0-9]{3}[-]{1}[0-9]{4})$|^(((\+44)? ?(\(0\))? ?)|(0))( ?[0-9]{3,4}){3}$|^Ext. [0-9]+$/,
    'phone': function (v) {
        return this.phoneRe.test(v);
    }
});

// Function to format a phone number
Ext.apply(Ext.util.Format, {
    phoneNumber: function(value) {
       //
        if (value)
        {
            var phoneNumber = value.replace(/\./g, '').replace(/-/g, '').replace(/[^0-9]/g, '');
            if (phoneNumber!='' && phoneNumber.length == 10) {
                return '(' + phoneNumber.substr(0, 3) + ') ' + phoneNumber.substr(3, 3) + '-' + phoneNumber.substr(6, 4);
            }
            else {
                return value;
            }
        }
         else {
            return value;
        }
    }
});

Ext.namespace('Ext.ux.plugin');

// Plugin to format a phone number on value change
Ext.define('Ext.ux.plugin.FormatPhoneNumber', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.phonenumberformatter',
    init: function(c) {
        c.on('change', this.onChange, this);
    },
    onChange: function(c) {
        c.setValue(Ext.util.Format.phoneNumber(c.getValue()));
    }
});