/**
 * Created by mkorivi on 11/10/2016.
 */
Ext.define('Atlas.casemanagement.view.EligibilityHistory', {
    extend: 'Ext.panel.Panel',
    xtype: 'eligibilityhistory',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    width: '100%',
    height: '100%',
    items: [
        {
            xtype:'grid',
            frame: true,
            title: 'Eligibility History',
            scrollable: true,
            flex: 5,
            columns:{
                items:[
                    { text: 'Recipient ID', dataIndex: 'recipientID',flex:1,hidden:true },
                    { text: 'From Date', dataIndex: 'sDate', xtype: 'datecolumn',
                        renderer: function(value, field){
                        return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                    },flex:1 },
                    { text: 'Thru Date', dataIndex: 'eDate' , xtype: 'datecolumn',
                        renderer: function(value, field){
                        return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                    },flex:1 },
                    { text: 'Term. Reason', dataIndex: 'termreason'  ,flex:1 },
                    { text: 'County Code', dataIndex: 'countyCode' ,flex:1 },
                    { text: 'Program Code', dataIndex: 'programCode' ,flex:1 },
                    { text: 'LOB', dataIndex: 'lobID',flex:1 },
                    { text: 'planId', dataIndex: 'pcpID' ,flex:1 },
                    { text: 'Coverage Code', dataIndex: 'coverageCode' ,flex:1, hidden:true },
                    { text: 'Level of Care', dataIndex: 'levelOfCare' ,flex:1 , hidden:true },
                    { text: 'Code', dataIndex: 'Code' ,flex:1, hidden:true  },
                    { text: 'planId', dataIndex: 'mssInd' ,flex:1 , hidden:true },
                    { text: 'MSS Ind', dataIndex: 'pcpID' ,flex:1 , hidden:true },
                    { text: 'Notify Date', dataIndex: 'notifyDate' ,flex:1 , hidden:true },
                    { text: 'Other Insurance Code', dataIndex: 'otherInsuranceCode' ,flex:1 , hidden:true },
                    { text: 'Scope', dataIndex: 'scope' ,flex:1 , hidden:true },
                    { text: 'Reason Desc.', dataIndex: 'reasonDesc' ,flex:1 , hidden:true },
                    { text: 'System ID', dataIndex: 'systemid' ,flex:1 , hidden:true }

                ]
            },

            bind: '{StoreEligibilityHistory}',
            dockedItems: [{
                dock:'bottom',
                xtype: 'pagingtoolbar',
                bind:{
                    store: '{StoreEligibilityHistory}'
                },
                pageSize:24
            }]
        },/*Grid*/
        {
            xtype:'grid',
            frame: true,
            title: 'PCP History',
            scrollable: true,
            flex: 5,
            columns:{
                items:[
                    { text: 'Recipient ID', dataIndex: 'recipientID',flex:1,hidden:true },
                    { text: 'Provider ID', dataIndex: 'pcpID' ,flex:1 },
                    { text: 'PCP Name', dataIndex: 'pcpName' ,flex:1 },
                    { text: 'From Date', dataIndex: 'sDate', xtype: 'datecolumn',renderer: function(value, field){
                        return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                    },flex:1 },
                    { text: 'Thru Date', dataIndex: 'eDate' , xtype: 'datecolumn',renderer: function(value, field){
                        return   Atlas.common.utility.Utilities.formatDate(value, 'm/d/Y');
                    },flex:1 },
                    { text: 'Term. Reason', dataIndex: 'termreason' ,flex:1 },
                    { text: 'Cap', dataIndex: 'capitated' ,flex:1 },
                    { text: 'Src.', dataIndex: 'sourceCode',flex:1 },
                    { text: 'System ID', dataIndex: 'systemid',flex:1,hidden:true },
                    { text: 'LOB', dataIndex: 'lobID',flex:1 },
                    { text: 'HFS ID', dataIndex: 'idhfsSiteID',flex:1 },
                    { text: 'Clinic Name', dataIndex: 'clinicName',flex:1 }
                ]
            },

            bind: '{StorePCPHistory}',
            dockedItems: [{
                dock:'bottom',
                xtype: 'pagingtoolbar',
                bind:{
                    store: '{StorePCPHistory}'
                },
                pageSize:24
            }]
        }/*Grid*/
        ]
});
