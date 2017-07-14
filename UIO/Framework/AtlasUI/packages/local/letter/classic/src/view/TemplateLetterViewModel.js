/** ... **/

Ext.define('Atlas.letter.view.TemplateLetterViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.templatelettervmNOTFOUND',
    data: {
        masterrecord: null
    },
    stores: {
        mtminvitationlettertemplatedata: {
            model: {
                fields: [
                    {name: 'AIMSJobNum', type: 'string', mapping: 'AIMSJobNum' },
                    {name: 'DocCount', type: 'string', mapping: 'DocCount' }
                ],
                pageSize: 50,
                proxy: {
                    url: 'member/{0}/aimsbatches'
                }
            }
        }
    }
});