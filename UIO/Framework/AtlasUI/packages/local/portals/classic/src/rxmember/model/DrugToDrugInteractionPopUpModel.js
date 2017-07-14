/**
 * Created by T4317 on 7/26/2016.
 */
Ext.define('Atlas.portals.rxmember.model.DrugToDrugInteractionPopUpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.drugsearchdtdpopup',

    data: {
        srchNDC: null,
        srchMedName: null,
        dtdPopUpTitle: 'Drug To Drug Interaction',
        dtdNotFoundMsg: null
    },

    stores: {
        dtdinteractions: {
                model: 'Atlas.portals.rxmember.model.FindDrugToDrugInteractions'
        },
        simpsonsformularies: {
            fields: ['name', 'email', 'phone','NotSurveyed', {name:'GMPrice',mapping:"GM.Price"},{name:'GMType',mapping:"GM.Type"},{name:'ACMPrice',mapping:"ACM.Price"},{name:'ACMType',mapping:"ACM.Type"}],
            data: [{
                name: 'Lisa',
                email: 'lisa@simpsons.com',
                phone: '555',
                GM:{Price: 2.5, Type:'Error'},
                ACM:{Price: 4.5, Type:'Error'}
            }, {
                name: 'Bart',
                email: 'bart@simpsons.com',
                phone: '555',
                GM:{Price: 2.5, Type:'Error'},
                ACM:{Price: 4.5, Type:'Error'}
            }, {
                name: 'Homer',
                email: 'homer@simpsons.com',
                phone: '555abc',
                GM:{Price: 3.5, Type:'Error'},

                ACM:{Price: 4.5, Type:'Error'}
            }, {
                name: 'Marge',
                email: 'marge@simpsons.com',
                phone: '555',
                GM:{Price: 2.5, Type:'Error'},
                ACM:{Price: 4.5, Type:'Error'}
            }]
        }

    }
});
