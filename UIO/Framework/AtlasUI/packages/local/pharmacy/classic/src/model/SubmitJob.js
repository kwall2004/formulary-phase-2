Ext.define('Atlas.pharmacy.model.SubmitJob', {
    extend: 'Atlas.common.model.Base',

    fields: [
        //'metadata'
    ],
    proxy: {
        extraParams: {
            pDescription: '',
            pProgramName: '',
            pParameters: '',
            pRunMode: '',
            pProgramType: '',
            pSaveDocument: '',
            pFaxNumber: ''
        },
        url: 'shared/{0}/submitjob'
    }

});
