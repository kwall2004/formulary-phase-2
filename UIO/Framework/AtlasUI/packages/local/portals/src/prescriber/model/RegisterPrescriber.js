Ext.define('Atlas.portals.prescriber.model.RegisterPrescriber', {
    extend: 'Atlas.common.model.Base',

    proxy: {
        url: 'authentication/rx/registerprescriber'
    }
});