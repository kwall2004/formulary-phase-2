/** Developer: Jagman Bhullar
 * Previous Developer: Tremaine Grant
 * Description: This view used for the grid in the member letters section.
 */

Ext.define('Atlas.member.view.memberletters.MemberLettersGrid', {
    extend: 'Ext.grid.Panel',
    bind:{
        store:'{memberlettersstore}'
    },
    controller:'memberletters',
    xtype: 'member-memberlettersgrid',

    columns:[
        {text:'View Letter', dataIndex:'viewLetter'},
        {text:'Letter Name', dataIndex:'letterName'},
        {text:'Create Date', dataIndex:'createdDate',format:'mm:dd:yyyy'},
        {text:'Created By', dataIndex:'createdBy'},
        {text:'Carrier', dataIndex:'carrier'},
        {text:'Account', dataIndex:'account'},
        {text:'LOB', dataIndex:'lob'},
        {text:'Approved Date', dataIndex:'approvedDate'},
        {text:'Approved By', dataIndex:'approvedBy'},
        {text:'Sent Date', dataIndex:'sentDate'},
        {text:'AIMS Date', dataIndex:'aimsDate'},
        {text:'PO Box Drop Date', dataIndex:'poBoxDropOff'},
        {text:'Sent By', dataIndex:'sentBy'},
        {text:'Letter ID',dataIndex:'LetterID'},
        {text:'Auth ID',dataIndex:'authID'},
        {text: 'Document ID',dataIndex:'DocumentID'},
        {text: 'Letter Type',dataIndex:'letterType'},
        {text: 'Letter Category',dataIndex:'LetterCategory'},
        {text: 'System ID',dataIndex:'systemID'}
    ],
    defaults:{
        xtype:'container'
    },
    dockedItems: [
       {
        dock:'bottom',
        xtype: 'pagingtoolbar',
        pageSize:24,
        items:[{
            xtype:'button',
            text:'Send PA Form',
            handler:'openSendFaxDialog'
        },{
            xtype:'label',
            text:'No data to display'
        }]

    }]
});
