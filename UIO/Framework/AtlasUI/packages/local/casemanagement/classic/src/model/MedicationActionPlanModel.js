/**
 * Created by s6627 on 11/19/2016.
 */
Ext.define('Atlas.casemanagement.model.MedicationActionPlanModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'parentSystemId', type: 'string'},
        {name: 'plan', type: 'string'},
        {name: 'action', type: 'string'},
        {name:'actionText',mapping:'action'},
        {name: 'systemID', type: 'string'},
        {name: 'lastModified',type: 'date', dateFormat: 'Y-m-d'}
    ],
    proxy: {
        url: 'member/{0}/mtmactionplan',
        extraParams: {
            pWhere: ''
        },
        reader: {
            type    : 'json',
            rootProperty    : 'data'
        }
    }
})