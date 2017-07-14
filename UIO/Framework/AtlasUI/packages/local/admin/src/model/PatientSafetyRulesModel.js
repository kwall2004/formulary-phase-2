/**
 * Created by d4662 on 11/30/2016.
 */
Ext.define('Atlas.admin.model.PatientSafetyRulesModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminPatientSafetyRulesModel',

    fields: [
        { name: 'autoNotes',     type: 'string',defaultValue:'' },
        { name: 'drugCode',     type: 'string',defaultValue:'' },
        { name: 'ruleLevel',      type: 'string',defaultValue:'' },
        { name: 'maxDose1',      type: 'string',defaultValue:'' },
        { name: 'maxDose2',   type: 'string',defaultValue:''},
        { name: 'stepFlag',   type: 'string',defaultValue:''},
        { name: 'ruleLevelDesc',     type: 'string',defaultValue:'' },
        { name: 'ruleName',     type: 'string',defaultValue:'' },
        { name: 'SystemID',      type: 'number',defaultValue:0 },
        { name: 'ruleNameDesc',   type: 'string',defaultValue:''},
        { name: 'drugCategory',      type: 'string',defaultValue:'' }

    ],
    proxy: {
        url: 'shared/rx/cmspatientsafetyrules',
        timeout: 120000,
        extraParams: {
            pagination: true
        }
    }
});