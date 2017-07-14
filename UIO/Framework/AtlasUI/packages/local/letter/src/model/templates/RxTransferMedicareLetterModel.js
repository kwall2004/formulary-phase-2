Ext.define('Atlas.letter.model.templates.RxTransferMedicareLetterModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.rxtransfermedicarelettermdl',
    fields: [
        'Freetext1',
        'Freetext2',
        'Freetext3',
        'Freetext4',
        'Freetext5'
    ],
    pageSize: 50,
    proxy: {
        url: 'member/{0}/letterdetail'
    }
});