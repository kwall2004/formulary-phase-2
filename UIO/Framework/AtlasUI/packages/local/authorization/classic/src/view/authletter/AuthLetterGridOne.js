/**
 * Developer: Tremaine Grant
 * Description: This view used for the grid in the authorization letter section.
 */
Ext.define('Atlas.authorization.view.authletter.AuthLetterGridOne', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    viewModel:{
        type: 'common-shared-editgridmodel',
        data:{
            //note: this needs to move to controller with user permissions
            userpermissions: {
                create: true,
                update: true,
                save: true
            }
        },
        stores:{
            authletters:{
                fields: ['letterType',
                    'letterName',
                    'createDate',
                    'createBy',
                    'approveDate',
                    'approveBy',
                    'sentDate',
                    'sentDateP',
                    'sentUser'],
                data:[
                    {letterType: 'Transition',
                        letterName: 'TransitionLetter.p',
                        createDate: 'TransitionLetter.aspx',
                        createBy: 'Freetext1,Freetext2,Freetext3,Freetext4,freeText5' ,
                        approveDate: 'Letter',
                        approveBy: '0',
                        sentDate:' ',
                        sentDateP: 'Plan',
                        sentUser: 'blah'}
                ]
            }
        }
    },
    bind:{
        store: '{authletters}'
    },
    xtype: 'AuthLetterGridOne',
    columns:[
        {text:'LetterType', dataIndex:'letterType'},
        {text:'Letter Name', dataIndex:'letterName'},
        {text:'CreateDate', dataIndex:'createDate'},
        {text:'CreateBy', dataIndex:'createBy'},
        {text:'ApproveDate', dataIndex:'approveDate'},
        {text:'ApproveBy', dataIndex:'approveBy'},
        {text:'SentDate', dataIndex:'sentDate'},
        {text:'Sent Date(Planet P...)', dataIndex:'sentDateP'},
        {text:'SentUser', dataIndex:'sentUser'}
    ],

    dockedItems: [{
        dock:'bottom',
        items:[{
            title:'Denial/Appeal Letters',
            items:[{
                xtype:'button',
                text: 'Denial'
            },{
                xtype:'button',
                text: 'Member Appeal'
            },{
                xtype:'button',
                text: 'Provider Appeal'
            }]
        },{
            title:'Other Letters',
            items:[{
                xtype:'button',
                text: 'Medicare Approval'
            },{
                xtype:'button',
                text: 'Medicare Case Notification'
            },{
                xtype:'button',
                text: 'Medicare Additional Info Request Appeal'
            },{
                xtype:'button',
                text:'Intervention'
            }]
        }]    
    }]
});
