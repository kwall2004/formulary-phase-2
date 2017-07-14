Ext.define('Atlas.portals.prescriber.model.PreviousTherapy', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'Medication',    type: 'string' },
        { name: 'FailureDate',   type: 'string' },
        { name: 'TherResult',    type: 'string' },
        { name: 'Editable',      type: 'string' }
    ]
});