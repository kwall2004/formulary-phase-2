/**
 * Created by s6627 on 11/17/2016.
 */
Ext.define('Atlas.casemanagement.model.BarrierTypeAHeadModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {
            name: 'Detail', type: 'string',mapping:'name'
        },
        {
            name: 'Code', type: 'string',mapping:'value'
        }
    ],
    proxy: {
        extraParams: {
            pagination: false
        },
        url: 'member/{0}/mtmgoalbarrierslist'
    }
});