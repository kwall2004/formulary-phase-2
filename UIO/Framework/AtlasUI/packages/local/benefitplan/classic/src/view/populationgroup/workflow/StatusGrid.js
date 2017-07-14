/**
 * Created by j2560 on 11/4/2016.
 */
Ext.define('Atlas.benefitplan.view.populationgroup.workflow.StatusGrid', {
    extend: 'Ext.grid.Panel',
    width: '100%',
    alias: 'widget.bpWorkflowStatusGrid',
    bind: '{workflow}',
    viewConfig: {
        loadMask: false
    },
    columns: [{
        text: 'PBP Name',
        dataIndex: 'PBPName',
        flex: 1
    }, {
        text: 'PBP ID',
        dataIndex: 'PBPID',
        flex: 1
    }, {
        text: 'Tenant',
        dataIndex: 'Tenant',
        flex: 1
    }, {
        text: 'Account',
        dataIndex: 'Account',
        flex: 1
    }, {
        text: 'Group',
        dataIndex: 'Group',
        flex: 2
    }, {
        text: 'Population Group',
        dataIndex: 'PopGrp',
        flex: 2
    }, {
        text: 'Last Action User',
        dataIndex: 'LastUser',
        flex: 1
    }, {
        xtype: 'datecolumn',
        text: 'Last Action Date',
        dataIndex: 'LastDate',
        format: 'n/j/Y',
        flex: 1

    }, {
        text: 'Last Action Timestamp',
        dataIndex: 'LastTime',
        xtype: 'datecolumn',
        format:'g:i:sA',
        flex: 1

    }]
});