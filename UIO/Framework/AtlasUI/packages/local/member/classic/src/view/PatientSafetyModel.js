/*
 Last Developer: Srujith Cheruku
 Previous Developers: [Srujith Cheruku]
 Origin: Merlin - Member
 Description: This is used for Patient safety view Model.
 */
Ext.define('Atlas.member.view.PatientSafetyModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.patientSafetyModel',

    stores:{
        storeAlertType: {
            autoLoad: true,
            fields: ['Subject'],
            data: [
                {"Subject": "All"},
                {"Subject": "High Risk Med"},
                {"Subject": "Adherence - AntiRetrovirals"},
                {"Subject": "Diabetes Treatment"},
                {"Subject": "DDI"},
                {"Subject": "Medication Adherence - Cholesterol"},
                {"Subject": "Medication Adherence - HTN"},
                {"Subject": "Medication Adherence - Diabetes"},
                {"Subject": "DMD"}
            ]
        },
        patientSafetyAlerts: {
            model:'Atlas.member.model.PatientSafety',
            remoteSort:true,
            sorters: [
                {
                    property: 'CreateDateTime',
                    direction: 'DESC'
                }
            ]
        },
        contactreceiverlist:{
            model: 'Atlas.common.model.ContactReceiverList',
            remoteSort:true,
            remoteFilter: true
        },
        contactcodelist:{
            model:'Atlas.common.model.ContactCode',
            remoteSort:true,
            remoteFilter: true
        },
        contactreceiverlist:{
            model: 'Atlas.common.model.ContactReceiverList',
            autoLoad: false
        },
        contactcodelist:{
            model:'Atlas.common.model.ContactCode',
            remoteSort:true,
            remoteFilter: true
        },
        storegetUserDetailList :{
            model: 'Atlas.pharmacy.model.SendMissingLetterLetterDetail',
            autoLoad: false
        },
        storecontactlogtype:{
            model: 'Atlas.common.model.ContactLogType',
            autoLoad: false
        },
        storecontactlogstatus:{
            model: 'Atlas.common.model.ContactLogStatus',
            autoLoad: false
        },
        assigntouser:{
            model: 'Atlas.member.model.AssignUser',
            autoLoad: true
        }

    }
});