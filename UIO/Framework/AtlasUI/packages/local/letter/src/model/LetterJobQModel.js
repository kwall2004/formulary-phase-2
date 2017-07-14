Ext.define('Atlas.letter.model.LetterJobQModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.letterjobqmdl',
    fields: [
        'jobNum', 'programName', 'jobStatus', 'dbRowID', 'description', 'documentID', 'faxNumber',
        'jobType', 'statusDescription', 'submittedBy', 'schedStartDate', 'submitDateTime', 'startDateTime',
        'endDateTime'
    ],
    proxy: {
        url: 'shared/{0}/jobqueue',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                payload.data.forEach(function(contactlogval,contactlogindex){

                    if(contactlogval.endDateTime && contactlogval.endDateTime.indexOf("T"))
                    {
                        var breaksdateandtime = contactlogval.endDateTime.split('T');
                        var dateparts =breaksdateandtime[0].split('-');
                        var timeparts =breaksdateandtime[1].split(':');

                        var formatter ='AM';
                        var hours =timeparts[0];
                        if(hours >=11) {
                            formatter = 'PM';
                        }

                        if(hours >=12) {
                            hours = hours%12;
                        }

                        contactlogval.endDateTime = dateparts[1] + '/' + dateparts[2] + '/' + dateparts[0] + ' ' +hours+ ":" + timeparts[1] + ':' +  timeparts[2].substring(0,2)+' '+formatter ;
                    }


                    if(contactlogval.submitDateTime && contactlogval.submitDateTime.indexOf("T"))
                    {
                        var breaksdateandtime = contactlogval.submitDateTime.split('T');
                        var dateparts =breaksdateandtime[0].split('-');
                        var timeparts =breaksdateandtime[1].split(':');

                        var formatter ='AM';
                        var hours =timeparts[0];
                        if(hours >=11) {
                            formatter = 'PM';
                        }

                        if(hours >=12) {
                            hours = hours%12;
                        }

                        contactlogval.submitDateTime = dateparts[1] + '/' + dateparts[2] + '/' + dateparts[0] + ' ' +hours+ ":" + timeparts[1] + ':' +  timeparts[2].substring(0,2)+' '+formatter ;
                    }


                    if(contactlogval.startDateTime && contactlogval.startDateTime.indexOf("T"))
                    {
                        var breaksdateandtime = contactlogval.startDateTime.split('T');
                        var dateparts =breaksdateandtime[0].split('-');
                        var timeparts =breaksdateandtime[1].split(':');

                        var formatter ='AM';
                        var hours =timeparts[0];
                        if(hours >=11) {
                            formatter = 'PM';
                        }

                        if(hours >=12) {
                            hours = hours%12;
                        }

                        contactlogval.startDateTime = dateparts[1] + '/' + dateparts[2] + '/' + dateparts[0] + ' ' +hours+ ":" + timeparts[1] + ':' +  timeparts[2].substring(0,2)+' '+formatter ;
                    }


                });

                return payload.data;
            }
        }
    }
});