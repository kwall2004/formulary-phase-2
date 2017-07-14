/*
 * Last Developer: Srujith Cheruku
 * Date: 10-26-2016
 * Previous Developers: []
 * Origin: MHP Member - Services Needed and Completed
 * Description: View Model for the Services Needed Information Page
 */

Ext.define('Atlas.portals.view.hpmember.ServicesNeededViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.portalsMemberMHPServicesNeededViewModel',
    stores: {
        servicesNeededStore: {
            model: 'Atlas.portals.hpmember.model.MemberHedisSummaryMasterWeb'
        }
    }
});