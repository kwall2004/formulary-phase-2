/*
 * Last Developer: Srujith Cheruku
 * Date: 11-11-2016
 * Previous Developers: []
 * Origin: Provider - Member Immunizations
 * Description: Store for Member Immunization
 */
Ext.define('Atlas.portals.provider.model.McirDataMaster', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: "serviceDate", type: "date", dateFormat: 'Y-m-d'},
        {name: "cpt4Cd", type: "string"},
        {name: "procDescription", type: "string"}

    ],

    proxy: {
        url: 'member/hp/mcirdatamaster'
    }
});