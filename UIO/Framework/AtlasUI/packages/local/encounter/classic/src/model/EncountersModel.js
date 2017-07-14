Ext.define('Atlas.encounter.model.EncountersModel', {
    extend: 'Atlas.common.model.Base',
    alias: 'model.adminencountersmodel',

    fields: [{
        name: 'EncounterId',
        type: 'int'
    }, {
        name: 'TaskConfigId',
        type: 'int'
    }, {
        name: 'TaskName',
        type: 'string'
    }, {
        name: 'BatchNum',
        type: 'string'
    }, {
        name: 'CreateDateTime',
        type: 'date'
    }, {
        name: 'SubmissionDateTime',
        type: 'date'
    }, {
        name: 'Type',
        type: 'string'
    }, {
        name: 'TotalRecords',
        type: 'int'
    }, {
        name: 'JobNum',
        type: 'number'
    }],

    proxy: {
        url: 'shared/{0}/encounterparent',
        reader: {
            //Specify metadata property
            metaProperty: 'metadata',
            //Optionally specify root of the data if it's other than 'data'
            rootProperty: function(payload) {
                payload.data.forEach(function(encounterval,encounterindex){
                    if(encounterval.CreateDateTime && encounterval.CreateDateTime.indexOf("T"))
                    {
                        var breaksdateandtime = encounterval.CreateDateTime.split('T');
                        var dateparts =breaksdateandtime[0].split('-');
                        var timeparts =breaksdateandtime[1].split(':');
                        var hours =timeparts[0];
                        encounterval.CreateDateTime = dateparts[1] + '/' + dateparts[2] + '/' + dateparts[0] + ' ' +hours+ ":" + timeparts[1] + ':' +  timeparts[2].substring(0,2) ;
                    }

                    if(encounterval.SubmissionDateTime && encounterval.SubmissionDateTime.indexOf("T"))
                    {
                        var breaksdateandtime = encounterval.SubmissionDateTime.split('T');
                        var dateparts =breaksdateandtime[0].split('-');
                        var timeparts =breaksdateandtime[1].split(':');
                        var hours =timeparts[0];
                        encounterval.SubmissionDateTime = dateparts[1] + '/' + dateparts[2] + '/' + dateparts[0] + ' ' +hours+ ":" + timeparts[1] + ':' +  timeparts[2].substring(0,2) ;
                    }
                });

                return payload.data;
            }
        }
    }
});