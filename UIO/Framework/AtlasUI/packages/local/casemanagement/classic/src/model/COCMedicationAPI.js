/**
 * Created by mkorivi on 11/16/2016.
 */
Ext.define('Atlas.casemanagement.model.COCMedicationAPI', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'seqNum', type: 'string'},
        {name: 'dataSource', type: 'string'},
        {name: 'medType', type: 'string'},
        {name: 'medName', type: 'string'},
        {name: 'medDosage', type: 'string'},
        {name: 'medFilled', type: 'string'},
        {name: 'knowName',  type: 'string'},
        {name: 'knowFrequency', type: 'string'},
        {name: 'knowReason', type: 'string'},
        {name: 'cont', type: 'string'},
        {name: 'samples', type: 'string'},
        {name: 'medArea', type: 'string'},
        {name: 'startDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'endDate',type: 'date', dateFormat: 'Y-m-d'}

    ],

    proxy: {
        url: 'vendor/hp/cmmedicationsapi',
        extraParams: {
            "pDeviceId": "",
            "pTokenId": "",
            "pSort": "",
            "userState": "MI",
            "pMode" :"mrx"

        }

    }

})
