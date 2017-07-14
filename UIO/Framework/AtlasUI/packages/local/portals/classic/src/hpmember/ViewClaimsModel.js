/*
 * Last Developer: Srujith Cheruku
 * Date: 10-28-2016
 * Previous Developers: []
 * Origin: MHP Member - View Claims
 * Description: View Model for the View Claims Page
 */

Ext.define('Atlas.portals.view.hpmember.ViewClaimsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.portalsMemberMHPViewClaimsViewModel',
    stores: {
        claimsDisclaimerStore: {
            model: 'Atlas.portals.hpmember.model.PortalDynamicDataWeb'
        },
        claimsDetailStore: {
            model: 'Atlas.portals.hpmember.model.ClaimHeaderWeb',
            listeners:{
                load:'onClaimsDetailLoaded'
            }
        },
        claimsDetailPaged: {
            pageSize: 25,
            remoteSort: true,
            remoteFilter: true,// required for correct filtering using paging memory
            proxy: {
                type: 'memory',
                enablePaging: true
            }
        }
    }
});