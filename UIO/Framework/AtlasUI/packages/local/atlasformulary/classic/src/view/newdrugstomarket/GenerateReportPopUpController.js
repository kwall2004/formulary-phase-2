Ext.define('Atlas.atlasformulary.view.newdrugstomarket.GenerateReportPopUpController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.generatereportpopup',

  onGenerate: function () {
    var startDateTemp = this.getViewModel().getData().genRptStartDate,
      endDateTemp = this.getViewModel().getData().genRptEndDate,
      startDate = null,
      endDate = null;

    if (startDateTemp != '' && endDateTemp != '') { // eslint-disable-line eqeqeq
      startDate = startDateTemp.getMonth() + 1 + '/' + startDateTemp.getDate() + '/' + startDateTemp.getFullYear();
      endDate = endDateTemp.getMonth() + 1 + '/' + endDateTemp.getDate() + '/' + endDateTemp.getFullYear();

      var reportingURL = Atlas.apiReportURL;

      var finalURL = reportingURL + '?%2fAtlas%2fFormulary%2fNewDrugsToMarket&rs:Command=Render&rc:Parameters=Collapsed&FromDate=' + startDate.toString() + '&ThruDate=' + endDate.toString() + '&DrugType:IsNull=True';
      window.open(finalURL);
    } else {
      Ext.MessageBox.alert('Error', 'Please choose a Start Date and an End Date');
    }
  }
});
