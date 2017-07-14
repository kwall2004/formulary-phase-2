/**
 * Developer: Tremaine Grant
 * Description: This view used for the grid in the authorization letter queue section.
 */
Ext.define('Atlas.authorization.view.authletter.AuthLetterGridThree', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    xtype: 'AuthLetterGridThree',
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
                fields: ['view',
                    'status',
                    'description',
                    'docType',
                    'submitDate',
                    'faxAttachDate',
                    'delete'],
                data:[
                    {view: 'Transition',
                        status: 'TransitionLetter.p',
                        description: 'TransitionLetter.aspx',
                        submitDate: 'Letter',
                        faxAttachDate: '0',
                        decisionDate:' ',
                        delete: 'Plan'}
                ]
            }
        }
    },
    bind:{
        store: '{authletters}'
    },
    columns:[
        {text:'View', dataIndex:'view'},
        {text:'Status', dataIndex:'status'},
        {text:'Description', dataIndex:'description'},
        {text:'Document Type', dataIndex:'docType'},
        {text:'l', dataIndex:'submitDate'},
        {text:'Decision', dataIndex:'faxAttachDate'},
        {text:'Decision Date', dataIndex:'delete'}
    ],

    dockedItems: [{
        dock:'bottom',
        items:[{
            title:'Faxes and Attachments',
            items:[{
                xtype:'button',
                text: 'New Appeal Fax Queue'
            },{
                xtype:'button',
                text: 'Add Attachment'
            }]
        }]    
    }]
});
