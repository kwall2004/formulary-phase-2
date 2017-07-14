Ext.define('Atlas.portals.view.prescriber.PrescriberFormularyViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prescriberformularycontroller',

    init: function() {

        var viewModel = this.getViewModel(),
            formularyPlanGroups = viewModel.getStore('formularyPlanGroups');

        formularyPlanGroups.load({
            failure: function (records, operation) {
                //do something if the load failed
            },
            success: function (records, operation) {

            },
            callback: function (records, operation) {

            }
        });


    },

    showDocument: function(combo, record, col) {
        var planGroupId = record.data.planGroupId,
            viewModel = this.getViewModel(),
            formularyDocs = viewModel.getStore('formularyDocs'),
            planGroupId = record.data.planGroupId,
            planGroupName = record.data.planGroupName,
            stripWhiteSpaceId = planGroupName.replace(new RegExp(' ', 'g'), ''),
            tabPanel = Ext.first('tabpanel[itemId=formularyTabPanel]'),
            existingTab = tabPanel.up().lookup(planGroupId.toString()),
            tab;

        formularyDocs.getProxy().setExtraParam('ipiPlanGroupId', planGroupId);

        if (!existingTab) {
            var myMask = new Ext.LoadMask({
                msg: 'Loading ' + planGroupName,
                target: tabPanel
            });
            myMask.show();

            formularyDocs.load({
                callback: function (records, operation) {

                    var formularyFocsMetaData = formularyDocs.getProxy().getReader().metaData,
                        docData = formularyFocsMetaData.oplcData;

                    if (docData == "" || docData == null) {
                        Ext.MessageBox.alert('Error', 'Document data not found.', function(){});
                        myMask.hide();
                    } else {
                        if (Ext.browser.is.IE && window.navigator.msSaveOrOpenBlob) {
                            Atlas.common.utility.Utilities.displayDocument('pdf', docData);
                        } else {
                            var urlString = "data:application/pdf;base64," + escape(docData),
                                iframeHtml = '<iframe src="' + urlString + '" height="100%" width="100%"></iframe>';
                            tab = tabPanel.add({
                                title: planGroupName,
                                html: iframeHtml,
                                closable: true,
                                reference: stripWhiteSpaceId
                            });
                            tabPanel.setActiveTab(tab);
                        }
                        myMask.hide();
                    }
                }
            });
        } else {
            tabPanel.setActiveTab(existingTab);
        }



    }
});