/*
 Last Developer: Srujith Cheruku
 Previous Developers: [Srujith Cheruku]
 Origin: Merlin - Member
 Description: This is used for Create case view Model.
 */
Ext.define('Atlas.member.view.CreateCaseModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.createCaseModel',

    stores:{
        createCaseModel:{
            model: 'Ext.data.Model',
            proxy: {
                type: 'ajax',

                url: 'resources/data/dummydata/PatientSafetyModel.json',
                reader: {
                    type: 'json',
                    rootProperty: 'createCaseModel'
                }
            }
            //  autoLoad: true
        },
        assignTo:{
            fields:['name'],
            model: 'Ext.data.Model',
            proxy: {
                type: 'ajax',
                extraParams: {

                },

                url: 'resources/data/dummydata/PatientSafetyModel.json',
                reader: {
                    type: 'json',
                    rootProperty: 'assignTo'
                }
            },
              autoLoad: true
           
        }
    }
});