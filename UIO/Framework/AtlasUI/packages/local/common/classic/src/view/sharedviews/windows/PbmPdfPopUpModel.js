/**
 * Created by T4317 on 7/26/2016.
 */
Ext.define('Atlas.common.view.sharedviews.windows.PbmPdfPopUpModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.pbmpdf',
    data: {
        genRptStartDate: "",
        genRptEndDate: "",
        inPDFFilename: ""
    }
/*
    stores: {
        genrptstore: {
            model: 'Atlas.atlasformulary.model.AssocFormularies',
            listeners: {
                dataChanged: 'onDataChanged'
            },
           autoLoad: true,
            proxy: {
                type: 'ajax',
                url: 'resources/data/dummydata/prescriber/audit_detail.json',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }
*/

});
