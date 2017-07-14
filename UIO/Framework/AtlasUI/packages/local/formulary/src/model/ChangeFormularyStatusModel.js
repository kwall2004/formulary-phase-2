/**
 * Created by mkorivi on 10/13/2016.
 */
Ext.define('Atlas.formulary.model.ChangeFormularyStatusModel', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: "pResult" , type: "number"},
        { name: "pMessage", type: "string"}
    ],

    proxy: {
        extraParams: {
            pcFormID : '',
            pcFormVsn : '',
            pStatusToBe : '',
            pcEffDate : ''

        },

        updateUrl: 'formulary/{0}/changeformularystatus'
    }
});