/**
 * Created by n6684 on 11/21/2016.
 */
/**
 * Created by n6684 on 11/15/2016.
 */

Ext.define('Atlas.authorization.view.PopupAddRelationShipViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.createeditpharmacy_popupaddrelationshipviewmodel',
    stores: {
        storerelationshipmasterdataModel: {
            model: 'Atlas.pharmacy.model.relationshipmasterdataModel',
            autoLoad: false
        }
    }
});