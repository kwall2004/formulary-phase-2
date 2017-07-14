/**
 * Created by s6627 on 11/17/2016.
 */
Ext.define('Atlas.casemanagement.model.BarriersModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'BarrierDescription', type: 'string'},
        {name: 'BarrierCode', type: 'int'}
        ],
    proxy: {
        url: 'member/{0}/goalbarriers',
        extraParams: {
            pGoalId: ''
        }
    }
})