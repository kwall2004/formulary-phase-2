Ext.define('Atlas.benefitplan.view.tenantsearch.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.tenantsearch-grid',
    reference: 'tenantsearchGrid',
    id:'tenantSearchPanelGridId',
    title: 'Tenant Search Results',

    defaults: {
        sortable: true,
        filter: {
            type: 'string'
        }
    },
    viewConfig: {
        loadMask: false
    },
    bind: {
        store: '{tenantsearch}'
    },
    listeners: {
        itemdblclick: 'onGridItemClick'
    },
    columns: [
        {
            text: 'Tenant Family ID',
            dataIndex: 'TenantFamSK',
            hidden: true
        },
        {
        text: 'Tenant Family',
        dataIndex: 'TenantFamName',
        flex: 1
    }, {
        text: 'Tenant',
        dataIndex: 'TenantName',
        flex: 1
    }, {
        text: 'Account',
        dataIndex: 'AcctName',
        flex: 1
    }, {
        text: 'Group',
        dataIndex: 'GrpName',
        flex: 1

    }, {
        text: 'Population Group',
        dataIndex: 'PopGrpName',
        flex: 1
    }]
});
