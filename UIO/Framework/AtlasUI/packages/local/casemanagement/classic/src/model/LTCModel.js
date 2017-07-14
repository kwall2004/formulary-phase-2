/**
 * Created by s6627 on 11/22/2016.
 */
Ext.define('Atlas.casemanagement.model.LTCModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'systemID', type: 'string'},
        {name: 'MTMId', type: 'int'},
        {name: 'LTCEnrolledNew', type: 'int'},
        {name: 'LTCEntrollEndDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'LTCEntrollStartDate',type: 'date', dateFormat: 'Y-m-d'}
    ],
    proxy: {

        url: 'member/{0}/mtmcasedetails'
    }
})