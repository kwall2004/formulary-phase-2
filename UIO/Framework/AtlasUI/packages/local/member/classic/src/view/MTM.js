/**
 * Created by p3946 on 9/6/2016.
 */
Ext.define('Atlas.member.view.MTM', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-mtm',
    title: 'MTM',
    controller:'mtmcontroller',
    viewModel:{
        stores:{
            mtmcasestore:{
                // model:'Atlas.member.model.MemberMTMModel',
                // remoteSort: true,
                // autoLoad:false
                type:'member-membermtm'
            },
            contactlogstore:{
                // model:'Atlas.home.model.ContactLogAlert',
                session:true,
                // remoteSort:true,
                // remoteFilter:true
                type:'home-contactlogalert'
            },
            mtmcasecontactlogstore:{
                // model: 'Atlas.common.model.ContactLog',
                // session:true,
                // remoteSort:true,
                // remoteFilter:true
                type:'common-contactLog'
            }
        }
    },
    items:[{
        xtype:'gridpanel',
        flex:1,
    bind: {
        store: '{mtmcasestore}'
    },
    reference: 'caseTable',
    columns: [
        {

            text:'',flex:0.5,
            xtype:'actioncolumn',hideable:false,sortable:false,
            items: [{
                xtype:'button',
                iconCls: 'x-fa fa-file-text-o',  // Use a URL in the icon config
                tooltip: 'Display Case Details',
                handler:'btnDisplayCase'
            }]
        },
        {
            text: 'Case ID',flex:1,
            dataIndex: 'MTMId'
        },
        {
            text: 'Case Description',flex:1,
            dataIndex: 'description'
        },
        {
            text: 'Case Mgr.',flex:1,
            dataIndex: 'caseManager'
        },
        {
            text: 'Status',flex:1,
            dataIndex: 'MTMStatus'
        },
        {

            text:'',flex:0.5,
            xtype:'actioncolumn',hideable:false,sortable:false,
            items: [{
                xtype:'button',
                iconCls: 'x-fa fa-mobile-phone',  // Use a URL in the icon config
                tooltip: 'MTM Case Contact Log',
                handler:'btnMTMCase'
            }]
        },
        {
            text: 'Days Open',flex:1,
            dataIndex: 'DaysOpen'
        },
        {
            text: 'Enroll Date',flex:1,
            dataIndex: 'EnrollDate',format:'m/d/Y',xtype: 'datecolumn'
        },
        {
            text: 'Followup Date',flex:1,
            dataIndex: 'followupDate',format:'m/d/Y',xtype: 'datecolumn'
        },
        {
            text: 'Last Contact Date',flex:1,
            dataIndex: 'lastContactDate',format:'m/d/Y',xtype: 'datecolumn'
        },
        {
            text: 'Goal For Next Contact',flex:1,
            dataIndex: 'goalForNextContact'
        },
        {
            text: 'MRx ID',flex:1,
            dataIndex: 'RecipientId'
        },
        {
            text: 'Member Name',flex:1,
            dataIndex: 'MemberName'
        },
        {
            text: 'Carrier',flex:1,
            dataIndex: 'CarrierName'
        },
        {
            text: 'Account',flex:1,
            dataIndex: 'AccountName'
        },
        {
            text: 'LOB',flex:1,
            dataIndex: 'LOBName'
        },
        {
            text: 'Effective Date',flex:1,
            dataIndex: 'effDate',format:'m/d/Y',xtype: 'datecolumn'
        },
        {
            text: 'Term Date',flex:1,
            dataIndex: 'termDate',hidden:true,format:'m/d/Y',xtype: 'datecolumn'
        },
        {
            text: 'Referral source',flex:1,
            dataIndex: 'ReferralSource',hidden:true
        },
        {
            text: 'Enroll source',flex:1,
            dataIndex: 'EnrollSource',hidden:true
        },
        {
            text: 'Enroll Reason',flex:1,
            dataIndex: 'EnrollReason',hidden:true
        }
    ],

    plugins: [{
        ptype: 'gridexporter'
    }]}],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    xtype: 'button', text: 'Export to Excel', handler:'btnExportClick',
                    iconCls: 'fa fa-file-excel-o'
                },
                {
                    xtype: 'button',
                    text: 'View All Contact Log',
                    iconCls: 'fa fa-files-o',
                    handler:'getAllContactLog'
                }
            ]
        },
        {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            bind: {
                store: '{mtmcasestore}'
            },
            pageSize: 25,
            displayInfo:true
        }
    ]
});