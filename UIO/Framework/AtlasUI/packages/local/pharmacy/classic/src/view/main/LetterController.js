Ext.define('Atlas.pharmacy.view.main.LetterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pharmacy-letter',

    listen: {
        controller: {
            'pharmacy': {
                datachanged: 'onModuleDataChange'
            }
        }
    },
    //Will be running after first layout
    boxReady: function () {
        // if so - load our data
        this.onModuleDataChange();
    },

    onModuleDataChange: function (origin) {
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            store = vm.getStore('letters'),
            ncpdpId = vm.getParent().get('ncpdpId');

        //Prevent any data collisions between tabs
        if (origin && origin !== view.ownerCt.id) {
            return;
        }

        if (!ncpdpId) {
            return;
        }

        me.getView().mask('Loading...');
        store.removeAll(true); // remove any old data

        store.load({
            params: {
                pcKeyType: 'NCPDPID',
                pcKeyValue: ncpdpId,
                pcInOut: '',
                pagination: true //Merlin needs extra parameter for paging
            },
            callback: function (record, operation) {
                var status = operation.getResultSet().message[0];
                me.getView().unmask();

                if (status.code !== 0) {
                    //Ext.Msg.alert('Error in Letters view', status.message);
                }
            }
        });
    },

    onViewLetter: function (grid, rowIndex) {
        this.getDocumentDetails(grid.getStore().getAt(rowIndex).data.DocumentID);
    },

    getDocumentDetails: function (docID) {
        /*if (docID != '') {
            Atlas.common.utility.Utilities.viewDocument(docID);
        }*/
        var modelViewPDF = Ext.create('Atlas.common.model.shared.ViewPDF');
        modelViewPDF.getProxy().setExtraParam('pDocumentID', docID);
        modelViewPDF.load({
            scope: this,
            // failure: function (record, operation) {
            // },
            // success: function (record, operation) {
            // },
            callback: function (record, operation, success) {
                var objResp = Ext.decode(operation.getResponse().responseText);
                if (objResp.message[0].code == 0) {
                    //window.open("../../Shared/PDF.aspx?DocumentID=" + docID, 'PBM_PDF', 'width=1000,height=800,status=no,menu=no,toolbar=no,resizable=yes');
                    Atlas.common.utility.Utilities.displayDocument('pdf', objResp.metadata.pData);
                }
                else {
                    Ext.Msg.alert('Message', 'PDF Document is being generated. Please try again later.');
                }
            }
        });
    }
});
