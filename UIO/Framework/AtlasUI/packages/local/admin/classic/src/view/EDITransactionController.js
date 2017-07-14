/**
 * Created by s6685 on 11/30/2016.
 */

Ext.define('Atlas.admin.view.EDITransactionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.EDITransactionController',
    extraParams: {
        'PACriteria': ''
    },
    init:function()
    {
      this.loadEDITransactionsStoreData();
    },

    MemberOnClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex),
            recipientID = rec.get('RecipientId'),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/member/MemberToolbar');

        if (recipientID != '' && recipientID != null) {
            this.fireEvent('openView','merlin','member','MemberToolbar', {
                menuId: menuId,
                RID:recipientID,
                atlasId: recipientID,
                keyValue: '0',
                openView: true,
                recordCase:null,
                subTabs:['member-demographics']
            });
        }
    },

    PharmacyOnClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex),
            NCPDPID = rec.get('NCPDPID'),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/pharmacy/Pharmacy');

        if (NCPDPID != '' && NCPDPID != null) {
            this.fireEvent('openView', 'merlin', 'pharmacy', 'Pharmacy', {
                menuId: menuId,
                atlasId: NCPDPID
            });
        }
    },

    TransactionOnClick: function(grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex),
            TransactionID = rec.get('TransactionID');

        var win = Ext.create({
            xtype: 'EDITransactionWindow',
            extraParams: {
                'TransactionID': TransactionID
            },
            autoShow: false
        });

        this.getView().add(win);
        win.show();
    },

    SearchOnClick:function() {
        var view = this.getView();
        var PACriteria='';
        this.loadEDITransactionsStoreData();
    },
    ResetOnClick:function() {
        var view = this.getView();
        view.down('#frmSet').reset();
       // this.loadEDITransactionsStoreData();
        this.getViewModel().getStore('EDITransactionsStore').removeAll();
    },
    formatDate: function(date) {
        return (date.getMonth() + 1).toString() + '/' + date.getDate().toString() + '/' + date.getFullYear().toString();
    },


    loadEDITransactionsStoreData: function(){
        var vm = this.getViewModel();
        var view = this.getView();
        var TransFromDate=view.down('#TranfromDate').getValue();
        var TransToDate=view.down('#TrantoDate').getValue();
        var ServiceDateFrom=view.down('#ServfromDate').getValue();
        var ServtoDate=view.down('#ServtoDate').getValue();
        var Source=view.down('#cbxSource').getValue();
        var Port=view.down('#cbxPort').getValue();
        var ProcessorCntr=view.down('#cbxLOB').getValue();
        var NCPID=view.down('#cbxcreateeditpharmacyprovidertype').getValue();
        var TransactionId=view.down('#txtTransactionid').getValue();
        var filterWhere='';
        if(TransFromDate!= null && TransFromDate!= '') {
            filterWhere="TransDate  >= '"+this.formatDate(TransFromDate)+"'";
        }
        if(TransToDate!= null && TransToDate!= '') {
            if (filterWhere != '') {
                filterWhere += " and TransDate  <= '" + this.formatDate(TransToDate)+"'";
            }
            else {
                filterWhere += "TransDate  <= '" + this.formatDate(TransToDate)+"'";
            }
        }
        if(ServiceDateFrom!= null && ServiceDateFrom!= '') {
            if (filterWhere != '') {
                filterWhere += " and ServiceDate  >= '" + this.formatDate(ServiceDateFrom)+"'";
            }
            else {
                filterWhere += "ServiceDate  >= '" + this.formatDate(ServiceDateFrom)+"'";
            }
        }
        if(ServtoDate!= null && ServtoDate!= '') {
            if (filterWhere != '') {
                filterWhere += " and ServiceDate  <= '" + this.formatDate(ServtoDate)+"'";
            }
            else {
                filterWhere += "ServiceDate  <= '" + this.formatDate(ServtoDate)+"'";
            }
        }
        if(Source!= null && Source!= '') {
            if (filterWhere != '') {
                filterWhere += " and Source begins '" + Source+"'";
            }
            else {
                filterWhere += " Source begins '" + Source+"'";
            }
        }

        if(Port!= null && Port!= '') {
            if (filterWhere != '') {
                filterWhere += " and Port = '" + Port+"'";
            }
            else {
                filterWhere += "Port = '" + Port+"'";
            }
        }

        if(ProcessorCntr!= null && ProcessorCntr!= '') {
            var cLOBQuery = '';

            var pList = ProcessorCntr.split(',');
            for (var i = 0; i < pList.length; i++)
            {
                if (cLOBQuery != '') {
                    cLOBQuery = cLOBQuery +  " OR ProcessorCntr = '" + pList[i] + "'";
                }
                else {
                    cLOBQuery = " ProcessorCntr = '" + pList[i] + "'";
                }
            }

            if (filterWhere != '') {
                filterWhere += ' and (' + cLOBQuery+')';
            }
            else {
                filterWhere +=  cLOBQuery;
            }
        }

        if(NCPID!= null && NCPID!= '') {
            if (filterWhere != '') {
                filterWhere += " and ProviderID = '" + NCPID+"'";
            }
            else {
                filterWhere += "ProviderID = '" + NCPID+"'";
            }
        }
        if(TransactionId!= null && TransactionId!= '') {
            if (filterWhere != '') {
                filterWhere += " and TransactionID = '" + TransactionId+"'";
            }
            else {
                filterWhere += "TransactionID = '" + TransactionId+"'";
            }
        }

        var pageNum = 1; //default page num
        var batchSize = 500; //grid size
        var modelEDITransactions = vm.getStore('EDITransactionsStore');
        modelEDITransactions.getProxy().setExtraParam('pFilterConditions',filterWhere);
        modelEDITransactions.getProxy().setExtraParam('pStartIndex','1');
        modelEDITransactions.getProxy().setExtraParam('pMode','F');
        modelEDITransactions.getProxy().setExtraParam('pBatchSize','500');
        modelEDITransactions.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                //var objRespPA = Ext.decode(operation.getResponse().responseText);
            }
        });

    }



});




