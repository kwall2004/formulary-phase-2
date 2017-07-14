/**
 * Created by c4539 on 10/5/2016.
 */
Ext.define('Atlas.portals.prescriber.model.PrescriberLettersP', {
    extend: 'Atlas.common.model.Base',

    fields: [
        { name: 'ttRowNum', type: 'int' },
        { name: 'inOut', type: 'string' },
        { name: 'DESCRIPTION', type: 'string' },
        { name: 'faxDate', type: 'string' },
        { name: 'FaxNumber', type: 'string' },
        { name: 'DocumentID', type: 'int' },
        { name: 'SubmittedBy', type: 'string' },
        { name: 'ttRowID', type: 'string' },
        { name: 'displayDate', calculate: function(obj) {
            var date = new Date(obj.faxDate),
                month = (date.getMonth() + 1).toString(),
                day = (date.getDate()).toString(),
                year = (date.getFullYear()).toString(),
                hours = (date.getHours()).toString(),
                minutes = (date.getMinutes()).toString(),
                seconds = (date.getSeconds()).toString();

            month = parseInt(month) > 10 ? month : '0' + month;
            minutes = parseInt(minutes) > 10 ? minutes : '0' + minutes;
            seconds = parseInt(seconds) > 10 ? seconds : '0' + seconds;

            return month + '/' + day + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;
        }}
    ],

    proxy: {
        url: 'portal/{0}/prescriberlettersp'
    }
});