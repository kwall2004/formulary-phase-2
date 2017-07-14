Ext.define('Atlas.atlasformulary.view.manageformulary.CompareFormulariesPopUpController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.compareformulariespopup',

  onSubmitClick: function () {
    var references = this.getReferences();
    var reportingURL = Atlas.apiReportURL;
    var formularyCombo1 = references.compareformularycombo1;
    var formularyCombo2 = references.compareformularycombo2;
    var criteriaCombo = references.compareformularycriteriacombo;
    var umcriteriaCombo = references.compareformularyumcriteriamulti;
    var formularySK1 = formularyCombo1.selection.data.FrmlrySK;
    var formularySK2 = formularyCombo2.selection.data.FrmlrySK;
    var columnName = criteriaCombo.selection.data.name;
    var umcriteriaString = '';
    umcriteriaCombo.store.data.items.forEach(function (record) {
      umcriteriaString += record.data.CvrgPrptyTypeSK;
      umcriteriaString += ',';
    });
    umcriteriaString = umcriteriaString.slice(0, -1);

    var coveragePropertyParam = '&CvrgPrptySKList=';
    if (umcriteriaString === '') {
      umcriteriaString = 'isNull=true';
      coveragePropertyParam = '&CvrgPrptySKList:';
    }
    var finalURL = reportingURL + '?%2fAtlas%2fFormulary%2fFormularyCompare&rs:Command=Render&FrmlrySK_From=' +
      formularySK1 + '&FrmlrySK_To=' + formularySK2 + '&SortColumnName=' + columnName + coveragePropertyParam + umcriteriaString + '&rc:Parameters=Collapsed';

    window.open(finalURL);
  }
});
