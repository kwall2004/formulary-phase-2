/**
 * Created by s6627 on 11/15/2016.
 */
Ext.define('Atlas.casemanagement.model.ProblemAndRecordsModel', {
    extend: 'Atlas.common.model.Base',
    fields: [
        {name: 'MTMId', type: 'int'},
        {name: 'systemID', type: 'string'},
        {name: 'ProblemId', type: 'int'},
        {name: 'Problem', type: 'string'},
        {name: 'ProblemDesc',type: 'string'},
        {name: 'problemDescr', type: 'string'},
        {name: 'ProblemStatus', type: 'string'},
        {name: 'ProblemStatusDesc', type: 'string'},
        {name: 'followupDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'Goal',type: 'string'},
        {name: 'GoalDesc', type: 'string'},
        {name: 'GoalId', type: 'int'},
        {name: 'GoalProgress', type: 'string'},
        {name: 'GoalProgressDesc', type: 'string'},
        {name: 'GoalType', type: 'string'},
        {name: 'closedDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'closedReason', type: 'int'},
        {name: 'GoalStatus', type: 'string'},
        {name: 'GoalBarriers', type: 'string'},
        {name: 'GoalStatusDesc', type: 'string'},
        {name: 'GoalResult', type: 'string'},
        {name: 'GoalstartDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'problemStartDate',  type: 'date', dateFormat: 'Y-m-d'},
        {name: 'actionTaken', type: 'string'},
        {name: 'problemClosedDate', type: 'date', dateFormat: 'Y-m-d'},
        {name: 'problemClosedReason',type: 'string'},
        {name: 'GoalCount', type: 'int'}
        ],
    proxy: {
        url: 'member/{0}/mtmproblemandgoals',
        extraParams: {
            ipiMTMId: ''
        }
    }
})