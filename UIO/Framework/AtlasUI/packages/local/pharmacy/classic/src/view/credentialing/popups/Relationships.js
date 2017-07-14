/**
 * Created by s6393 on 12/2/2016.
 */
Ext.define('Atlas.pharmacy.view.credentialing.popups.Relationships', {
    extend: 'Ext.window.Window',
    title: 'Relationships',
    width: 900,
    height: 550,
    modal: true,
    layout: 'border',
    items: [
        {
            region: 'center',
            xtype: 'grid',
            bind: '{relationshipPopupData}',
            columns: [
                {text: 'Relationship ID', dataIndex: 'RSrelationshipID', flex: 1},
                {text: 'Relationship Entity Name', dataIndex: 'RSname', flex: 1},
                {text: 'Relationship Type', dataIndex: 'RSRelationTypeInfo', flex: 1},
                {text: 'Payment Center ID', dataIndex: 'PCpayCenterId', hidden: true, flex: 1},
                {text: 'Payment Center Name', dataIndex: 'PCpayCenterName', flex: 1},
                {text: 'Effective Date', dataIndex: 'PReffDate', formatter: 'date("n/j/Y")', flex: 1},
                {text: 'Term Date', dataIndex: 'PRtermdate', formatter: 'date("n/j/Y")', hidden: true, flex: 1},
                {text: 'Parent Name', dataIndex: 'PMparentOrgName', flex: 1}
            ],
            bbar: {
                xtype: 'pagingtoolbar',
                bind: '{relationshipPopupData}',
                displayInfo: true,
                hideRefresh: true
            }
        }
    ]
});
