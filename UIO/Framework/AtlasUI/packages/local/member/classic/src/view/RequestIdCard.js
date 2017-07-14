Ext.define('Atlas.member.view.RequestIdCard', {
    extend: 'Ext.panel.Panel',
    xtype: 'member-requestidcard',

    title: 'Request ID Card',
    // frame: true,
    controller:'requestidcard',scrollable:true,
    viewModel:
    {
        stores: {
            requestidcardstore: {
                model: 'Atlas.member.model.RequestIDCardModel',
                remoteFilter: true

            },
            memberInfoStore: {
                model: 'Atlas.member.model.MemberMaster',
                remoteSort: true,
                remoteFilter: true
            },
            cardtypestore:
            {
               queryMode:'local',
                model:{
                fields:['name','value'],
                data:[
                    {"name":"New Card","value":"New Card"},
                    {"name":"Additional Card","value":"Additional Card"}
                ]}},
            memberplanstore: {
                model: 'Atlas.member.model.MemberPlanGroups',
                session: true,
                remoteSort: true,
                remoteFilter: true
            }
        }
    },

    dockedItems:[
        {
            xtype: 'toolbar',
            dock:'bottom',
            items:[
                '->',
                {xtype:'button',text:'Request Id Card',iconCls:'fa fa-newspaper-o',itemId:'ReqIDCard',disabled:true,handler:'onRequestCardClick'}
            ]
        },
        {
            xtype: 'toolbar',
            dock:'top',
            items:[

                {xtype:'combobox',fieldLabel:'Card Type',queryMode:'local',displayField:'name',valueField:'value',itemId:'cardType',store:['New Card', 'Additional Card'],labelWidth:50,allowBlank:false
                },
                {xtype:'membertypeahead',fieldLabel:'Member',itemId:'recipientId',listeners: {
                    select: 'onMemberSelection'},labelWidth:53,allowBlank:false},
                {xtype:'combobox',fieldLabel:'Plan',itemId:'plangroupId',queryMode: 'local',
                   /* listeners: {
                    select: 'onPlanSelection'},*/
                    labelWidth:45,bind:{store:'{memberplanstore}'},displayField: 'planGroupName',
                    valueField: 'planGroupId',allowBlank:false,emptyText:'Select Plan Group'},
                '->',
                {xtype:'button',text:'Add',iconCls:'fa fa-plus-circle',handler:'onAddClick',disabled:true,itemId:'addBtn'},
                {xtype:'button',text:'Remove',iconCls:'fa fa-minus-circle',disabled:true,itemId:'removeBtn',handler:'onRemoveClick'}
            ]
        }],
     items:[
         {
             xtype:'gridpanel',
             height:'100%',
             width:'100%',
             frame:true,scrollable:true,
             selModel: {
                 selType: 'rowmodel', // rowmodel is the default selection model
                 mode: 'MULTI' // Allows selection of multiple rows
             },
             itemId:'reqIdGrid',
             bind: {
                 store: '{requestidcardstore}'
             },
             columns:[
                 {text :'MeridianRx ID',dataIndex:'recipientID',flex:1},
                 {text:'Card Type',itemId:'cardTypeId', dataIndex: 'CardType',flex:1},
                 {text:'Member Id',dataIndex:'memberId',itemId:'memId',flex:1},
                 {text:'First Name',dataIndex:'firstname',flex:1},
                 {text:'Last Name',dataIndex:'lastname',flex:1},
                 {text:'Middle Name',dataIndex:'middlename',flex:1},
                 {text:'Street',dataIndex:'Home_Address1',flex:1},
                 {text:'City',dataIndex:'Home_City',flex:1},
                 {text:'State',dataIndex:'Home_State',flex:1},
                 {text:'Zip',dataIndex:'home_zipCode',flex:1},
                 {text:'Carrier',dataIndex:'CarrierName',flex:1}
             ]
         }]
});
