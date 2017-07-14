/*
 * Last Developer: Srujith Cheruku
 * Date: 11-8-2016
 * Previous Developers: []
 * Origin: Provider - Member Immunization
 * Description: Model for Member Immunization
 */
Ext.define('Atlas.portals.hpmember.MemberImmunizationViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.memberimmunizationsmodel',

    stores: {
        memberImmunizationStore: {
            model: 'Atlas.portals.provider.model.McirDataMaster'
        },
        memberBloodLeadStore: {
            model:'Atlas.portals.provider.model.BloodLeadDataMaster'
        }
    }
});