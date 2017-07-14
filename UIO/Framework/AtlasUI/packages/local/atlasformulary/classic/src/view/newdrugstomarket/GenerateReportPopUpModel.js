Ext.define('Atlas.atlasformulary.view.newdrugstomarket.GenerateReportPopUpModel', {
  extend: 'Ext.app.ViewModel',
  alias: 'viewmodel.generatereportpopup',
  data: {
    genRptStartDate: '',
    genRptEndDate: '',
    dataSource: ''
  },
  stores: {
    genrptstore: {
      model: 'Atlas.atlasformulary.model.AssocFormularies',
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
});
