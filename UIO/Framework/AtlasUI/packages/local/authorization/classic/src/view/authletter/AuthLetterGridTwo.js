/**
 * Developer: Tremaine Grant
 * Description: This view used for the grid in the authorization letter queue section.
 */
Ext.define('Atlas.authorization.view.authletter.AuthLetterGridTwo', {
    extend: 'Atlas.common.view.sharedviews.editablegrid.Grid',
    xtype: 'AuthLetterGridTwo',
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
                fields: ['appealType',
                    'urgent',
                    'initiateDate',
                    'dueDate',
                    'hrsRe',
                    'decision',
                    'decisionDate',
                    'canceled'],
                data:[
                    {appealType: 'Transition',
                        urgent: 'TransitionLetter.p',
                        initiateDate: 'TransitionLetter.aspx',
                        dueDate: 'Freetext1,Freetext2,Freetext3,Freetext4,freeText5' ,
                        hrsRe: 'Letter',
                        decision: '0',
                        decisionDate:' ',
                        canceled: 'Plan'}
                ]
            }
        }
    },
    bind:{
        store: '{authletters}'
    },
    columns:[
        {text:'Appeal Type', dataIndex:'appealType'},
        {text:'Urgent', dataIndex:'urgent'},        
        {text:'Initiate Date', dataIndex:'initiateDate'},
        {text:'Due Date', dataIndex:'dueDate'},
        {text:'HrsRe', dataIndex:'hrsRe'},
        {text:'Decision', dataIndex:'decision'},
        {text:'Decision Date', dataIndex:'decisionDate'},
        {text:'Canceled', dataIndex:'canceled'}
    ],

    dockedItems: [{
        dock:'bottom',

        items:[{
            title:'Denial/Appeal Letters',
            items:[{
                xtype:'button',
                text: 'Create Appeal'
            },{
                xtype:'button',
                text: 'Appeal Timeframe Lookup'
            }]
        }]
    }]
});
