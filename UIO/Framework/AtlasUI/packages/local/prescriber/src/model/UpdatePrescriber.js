Ext.define('Atlas.prescriber.model.UpdatePrescriber',{
    extend: 'Atlas.common.model.Base',

    proxy: {
        updateUrl: 'prescriber/rx/npimasterdata'
    }
});