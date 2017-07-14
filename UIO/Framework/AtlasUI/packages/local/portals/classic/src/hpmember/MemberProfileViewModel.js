/*
 * Last Developer: Srujith Cheruku
 * Date: 09-26-2016
 * Previous Developers: []
 * Origin: MemberMHP - My Profile
 * Description: Model for the My Profile page
 */
Ext.define('Atlas.portals.view.hpmember.MemberProfileViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.portalsMemberMHPMemberProfileViewModel',
    stores: {
        memberDataStore: {
            model: 'Atlas.portals.hpmember.model.MemberDataWeb'
        },
        setMemberDataStore: {
            model: 'Atlas.portals.hpmember.model.MemberProfileWeb'
        }
    },
    data: {
        canEdit: true
    }
});