/**
 * Created by T4317 on 11/4/2016.
 */
Ext.define('Atlas.claims.view.ClaimInterventions', {
    extend: 'Ext.grid.Panel',
    title:' Claim Interventions',
    controller:'claims-claimintervention',
    viewModel:{
        stores:{
            claiminterventions:{
                model:'Atlas.common.model.ClaimInterventions',
                //autoLoad: true,
                remoteSort: true,
                remoteFilter: true
            }
        }
    },

    columns:[{
        text: 'Claim ID',
        dataIndex: 'ClaimID',
        flex:1
    },{
        text: 'Status',
        dataIndex: 'Stat',
        flex:1
    },{
        text: 'Description',
        dataIndex: 'Descr',
        flex:1
    },{
        text: 'Service Date',
        dataIndex: 'SvcDate',
        dateFormat: 'm/d/Y',
        type: 'date',
        renderer: Ext.util.Format.dateRenderer('m/d/Y'),
        flex:1
    },{
        text: 'Pharmacy',
        dataIndex: 'NCPDPID',
        flex:1
    },{
        text: 'MeridianRx ID',
        dataIndex: 'RecipID',
        flex:1
    },{
        text: 'Prescriber',
        dataIndex: 'NPI',
        flex:1
    },{
        text: 'Carrier',
        dataIndex: 'Carrier',
        flex:1
    },{
        text: 'Account',
        dataIndex: 'Account',
        flex:1
    },{
        text: 'LOB',
        dataIndex: 'LOB',
        flex:1
    }],
    dockedItems:[{
        dock:'top',
        xtype:'toolbar',
        items:[{
            text:'Claim',
            handler:'routeToClaims'
        },{
            text:'Member',
            handler:'routeToMember'
        },{
            text:'Prescriber',
            handler:'routeToPrescriber'
        },{
            text:'Pharmacy',
            handler:'routeToPharmacy'
        },{
            text: 'Acknowledge',
            handler:'acknowledge'
        },{
            text: 'Intervention Letter',
            handler:'routeToInterventionLetter'
        }
        ]
    },{
        dock:'bottom',
        xtype:'pagingtoolbar',
        pageSize: 25,
        bind:{
            store:'{claiminterventions}'
        },
        displayInfo:'true'
    }
    ],
    bind:{
        store:'{claiminterventions}'
    }

});