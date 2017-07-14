Ext.define('Atlas.common.view.sharedviews.windows.PbmPdfPopUpController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pbmpdf',

    onDataChanged: function () {
        console.log("--  PbmPdfPopUpController onDataChanged --");
    },

    onGenerate: function () {
/*
        var startDateTemp = this.getViewModel().getData().genRptStartDate,
            endDateTemp = this.getViewModel().getData().genRptEndDate,
            startDate = null,
            endDate = null;

        if (startDateTemp != "" && endDateTemp != "") {
            startDate = startDateTemp.getMonth()+1 + '/' + startDateTemp.getDate() + '/' + startDateTemp.getFullYear();
            endDate = endDateTemp.getMonth()+1 + '/' + endDateTemp.getDate() + '/' + endDateTemp.getFullYear();

            window.open('http://mirxsql01-dvw/ReportServer_INST01D/Pages/ReportViewer.aspx?%2fNewDrugsToMarket%2fNewDrugsToMarket&rs:Command=Render&rc:Parameters=Collapsed&FromDate=' + startDate.toString() + '&ThruDate=' + endDate.toString() + '&DrugType:IsNull=True');
        }
        else {
            Ext.MessageBox.alert('Error', 'Please choose a Start Date and an End Date');
        }
*/
    },
    init: function() {
        console.log("--  PbmPdfPopUpController init --");
        //https://fiddle.sencha.com/#fiddle/14ji
        this.loadPDF();

    },
    loadPDF: function() {

//        debugger;

        var vm = this.getViewModel();

        //    console.log("PDF TO Assign from ViewModel is: " + vm.data.inPDFFilename);
        console.log("PDF TO Assign from ViewModel is: " + vm.get('inPDFFilename'));

        var pdfX = Ext.create('Ext.Component',{
            //      var pdf = new Ext.Component({
            height: '100%',
            autoEl : {
                tag : 'iframe',
                src: 'https://partners.adobe.com/public/developer/en/xml/AdobeXMLFormsSamples.pdf'
                //src : 'https://52.34.5.91/webservicev3/api/contract/x2/attachment/6y/inline?Authorization=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzZWFuQGdlb3NjYXBlY29udHJhY3RpbmcuY29tIiwidW5pcXVlX25hbWUiOiJRcSIsInJvbGUiOlsiY29tcGFueTpmTiIsIk1hbmFnZXIiLCJTdXBlcnZpc29yIl0sImlzcyI6Imh0dHA6Ly9jb250cmFjdGNvbXBsZXRlLmNvbSIsImF1ZCI6IjA5OTE1M2MyNjI1MTQ5YmM4ZWNiM2U4NWUwM2YwMDIyIiwiZXhwIjoxNDU0NjcwNzU0LCJuYmYiOjE0NTI4NzA3NTR9.i8puTtVKjWQakx9iC6MsN8uPhnwqNGOqlnV88sd6Z8Q'
            }
        });


        //    var pnl = this.lookupReference('pdfpanel').add(pdfX);

        this.getView().down('[reference=pdfpanel]').add(pdfX);


    }
});