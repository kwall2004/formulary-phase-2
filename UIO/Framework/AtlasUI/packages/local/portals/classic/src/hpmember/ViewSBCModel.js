
/*
 * Last Developer: Srujith Cheruku
 * Date: 10-26-2016
 * Previous Developers: []
 * Origin: MHP Member - View SBC
 * Description: Model for the View SBC Page
 */

Ext.define('Atlas.portals.view.hpmember.ViewSBCModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.portalsMemberViewSBCModel',

    stores: {
        viewSBCStore: {
            model: 'Atlas.portals.hpmember.model.MemberPolicyWeb'
        }
    }
});