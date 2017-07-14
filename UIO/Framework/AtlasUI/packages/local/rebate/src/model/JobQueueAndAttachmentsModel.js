/**
 * Created by j2487 on 11/15/2016.
 */
Ext.define('Atlas.rebate.model.JobQueueAndAttachmentsModel', {
    extend: 'Atlas.common.model.Base',
    fields:[
        { name: 'FaxNumber', type: 'string' },
        { name: 'DocumentID', type: 'string' },
        { name: 'faxDate', type: 'date', mapping: function (data) {
            return Ext.Date.format(new Date(data.faxDate), 'm/d/Y H:i:s');
        }
        },
        { name: 'SubmittedDate', type: 'date', mapping: function (data) {
            return Ext.Date.format(new Date(data.SubmittedDate), 'm/d/Y H:i:s');
        }
        },
        { name: 'inOut', type: 'string' },
        { name: 'StatusDescription', type: 'string' },
        { name: 'SubmittedBy', type: 'string' },
        { name: 'DESCRIPTION', type: 'string' },
        { name: 'RecordType', type: 'string' },
        { name: 'fileName', type: 'string' },
        {name: 'fileNameShort', type: 'string',
            calculate: function (data) {
                var fileNameShort = '';
                if (data.fileName != '' && data.fileName != null && data.fileName != undefined) {
                    var fileFullName = data.fileName.split('/');
                    fileNameShort = fileFullName[fileFullName.length - 1];
                }
                return fileNameShort;
            }
        },
        { name: 'jNum', type: 'string' }
    ],
    proxy: {
        url: 'shared/{0}/jobqueueandattachments'
    }
})
