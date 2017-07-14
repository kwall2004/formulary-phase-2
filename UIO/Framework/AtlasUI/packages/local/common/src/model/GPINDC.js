/**
 * Created by s6627 on 11/4/2016.
 */
Ext.define('Atlas.common.model.GPINDC', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'brandName',type: 'string'},
        {name: 'descAbbr',type: 'string'},
        {name: 'ProtectedClassDrug',type: 'bool'},
        {name: 'NDC',type: 'string'},
        {name: 'GPIName',type: 'string'},
        {name: 'productName',type: 'string'},
        {name: 'GPICode',type: 'string'},
        {name: 'GPI10', type: 'string',
            calculate: function (data) {
                return data.GPICode.substr(0, 10);
            }
        }
    ],
    proxy: {
        // url: 'pharmacy/services/rx/pharmacymasterdata/',
        url: 'formulary/rx/gpindcmasterext'
    }
});
