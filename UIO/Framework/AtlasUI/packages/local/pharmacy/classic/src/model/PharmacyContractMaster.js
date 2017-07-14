/**
 * Created by rsalekin on 11/21/2016.
 */
Ext.define('Atlas.pharmacy.model.PharmacyContractMaster', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {
            name: 'effDate', convert: function (value) {
            if (value && Ext.isString(value)) {
                var date = new Date(Date.parse(value, 'Y-m-d'));
                if (!date) {
                    return null;
                }
                else {
                    return date;
                }
            }
        }
        },
        { name: 'termDate', convert: function (value) {
            if (value && Ext.isString(value)) {
                var date = new Date(Date.parse(value, 'Y-m-d'));
                if (!date) {
                    return null;
                }
                else
                {
                    return date;
                }
            }
        }},
        { name: 'renewalDate', convert: function (value) {
            if (value && Ext.isString(value)) {
                var date = new Date(Date.parse(value, 'Y-m-d'));
                if (!date) {
                    return null;
                }
                else
                {
                    return date;
                }
            }
        }}
        ],
    proxy: {
        extraParams: {
            pKeyValue: '',
            pKeyType: '',
            pFieldList: ''
        },
        url: 'pharmacy/{0}/pharmacycontractmasterdata'
    }
});
