/**
 * Created by m4542 on 10/7/2016.
 */
Ext.define('Atlas.portals.prescriber.controller.MemberInformationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberInformationController',

    /**
     * Called when the view is created
     */
    init: function() {
        this.loadAuthStatuses();
        if (this.getView().isMemberPassed) {
            var me = this,
                vm = this.getViewModel(),
                form = this.lookupReference('mymembersinformationform'),
                toolbar = this.lookupReference('memberinfotoolbar'),
                user = Ext.first('viewport').getViewModel().get('user'),
                memberStore = vm.getStore('priorauthstore');

            memberStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
            memberStore.getProxy().setExtraParam('pSessionId', user.retSessionID);
            memberStore.getProxy().setExtraParam('ipiRecipientId', me.getView().myMemberDetailRecord.getData().recipientID);
            memberStore.getProxy().setExtraParam('pFieldList', 'recipientID,firstname,middlename,lastname,suffix,gender,birthDate,socSecNum,@languageDescription,race,deathDate,Home.Address1,Home.Address2,Home.City,home.zipCode,Home.State,@countyDescription,homephone.ContactInfo,workphone.ContactInfo,cell.ContactInfo,email.ContactInfo,@alerts,hedisMessage,@enrollmentStatus,respFirstName,respMiddleName,respLastName,resp.address1,resp.address2,resp.state,resp.city,resp.ZipCode,respHomePhone.ContactInfo,respWorkPhone.ContactInfo,complianceAlert,CarrierName,AccountName,@CoCMember,primRecipientId,@mcsProgGroupCode,@medicarePlanGroupId,PlangroupName,@pcpNPI');
            memberStore.load({
                callback: function (record) {
                    var detailsForm = me.lookupReference('mymembersinformationform'),
                        toolbar = me.lookupReference('memberinfotoolbar'),
                        paRecord = record["0"].joined["0"].proxy.reader.metaData.ttPAHistory.ttPAHistory,
                        claimsRecord = record["0"].joined["0"].proxy.reader.metaData.ttClaimsHistory.ttClaimsHistory,
                        hedisRecord = record["0"].joined["0"].proxy.reader.metaData.ttHEDIS.ttHEDIS,
                        paArray = [],
                        claimsArray = [],
                        hedisArray = [];


                    //LOAD FORM AND TOOLBAR
                    detailsForm.loadRecord(record[0]);
                    toolbar.loadRecord(record[0]);

                    //SET PA GRID
                    for (var i = 0; i < paRecord.length; i++) {
                        var individualArray = [];
                        individualArray.push(paRecord[i].AuthID);
                        individualArray.push(paRecord[i].medication);
                        individualArray.push(paRecord[i].authStatus);
                        individualArray.push(paRecord[i].createDate);
                        individualArray.push(paRecord[i].PlanGroupName);
                        paArray.push(individualArray);
                    }

                    var paStore = new Ext.data.ArrayStore({
                        fields: ['AuthID', 'medication', 'authStatus', 'createDate', 'PlanGroupName'],
                        data: paArray,
                        pageSize: 15,
                        proxy: {
                            type: 'memory',
                            enablePaging: true
                        }
                    });
                    me.getViewModel().set('priorauthstore', paStore);

                    //SET CLAIMS GRID
                    for (var i = 0; i < claimsRecord.length; i++) {
                        var individualArray = [];
                        individualArray.push(claimsRecord[i].claimID);
                        individualArray.push(claimsRecord[i].medication);
                        individualArray.push(claimsRecord[i].stat);
                        individualArray.push(claimsRecord[i].svcdate);
                        individualArray.push(claimsRecord[i].planGroupName);
                        claimsArray.push(individualArray);
                    }

                    var claimsStore = new Ext.data.ArrayStore({
                        fields: ['claimID', 'medication', 'stat', 'svcdate', 'planGroupName'],
                        data: claimsArray,
                        pageSize: 15,
                        proxy: {
                            type: 'memory',
                            enablePaging: true
                        }
                    });
                    me.getViewModel().set('claimsstore', claimsStore);

                    //SET HEDIS GRID
                    for (var i = 0; i < hedisRecord.length; i++) {
                        var individualArray = [];
                        individualArray.push(hedisRecord[i].helpText);
                        individualArray.push(hedisRecord[i].measureDesc);
                        individualArray.push(hedisRecord[i].subMeasure);
                        individualArray.push(hedisRecord[i].dueBy);
                        hedisArray.push(individualArray);
                    }

                    var hedisStore = new Ext.data.ArrayStore({
                        fields: ['helpText', 'measureDesc', 'subMeasure', 'dueBy'],
                        data: hedisArray,
                        pageSize: 15,
                        proxy: {
                            type: 'memory',
                            enablePaging: true
                        }
                    });
                    me.getViewModel().set('hedisstore', hedisStore);
                }
            });
        }
    },

    loadAuthStatuses: function() {
        var priorAuthListStore = this.getViewModel().getStore('priorAuthList'),
            user = Ext.first('viewport').getViewModel().get('user'),
            listModel = Ext.create('Atlas.portals.model.SearchPriorAuth', {
                ListDescription: 'All',
                charString: ''
            });

        priorAuthListStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
        priorAuthListStore.getProxy().setExtraParam('pListName', 'PriorAuthStatusPortal');
        priorAuthListStore.load({
            callback: function() {
                this.insert(0, listModel);
            }
        });
    },


    refreshPriorAuth: function() {
        var me = this,
            status = this.lookupReference('authStatus').getValue(),
            priorAuthListStore = this.lookupReference('priorauth').getStore();

        if(status == 'All') {
            priorAuthListStore.clearFilter();
            return;
        }
        priorAuthListStore.filter('authStatus',status);
    },

    createPA: function (grid, rowIndex) {
        var record = grid.getStore().getAt(rowIndex),
            claimId = record.get('claimID') ? record.get('claimID') : record.get('claimID');

        this.fireEvent('openView','rxprescriber','portals','prescriber_CreatePriorAuth', {
            keyType: 'ClaimId',
            keyValue: claimId,
            atlasId: claimId
        });
    },

    onMemberSelected: function (combo, record) {
        var me = this,
            form = me.getView().down('form'),
            parameters = form.getValues(),
            vm = me.getViewModel(),
            user = Ext.first('viewport').getViewModel().get('user'),
            //makes a call to priorauthstore but is used to save data for claims, PA, and HEDIS
            memberStore = vm.getStore('priorauthstore'),
            enrollmentStore = vm.getStore('portalmembermasterext');

        memberStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
        memberStore.getProxy().setExtraParam('pSessionId', user.retSessionID);
        memberStore.getProxy().setExtraParam('ipiRecipientId', record.get('recipientID'));
        memberStore.getProxy().setExtraParam('pFieldList', 'recipientID,firstname,middlename,lastname,suffix,gender,birthDate,socSecNum,@languageDescription,race,deathDate,Home.Address1,Home.Address2,Home.City,home.zipCode,Home.State,@countyDescription,homephone.ContactInfo,workphone.ContactInfo,cell.ContactInfo,email.ContactInfo,@alerts,hedisMessage,@enrollmentStatus,respFirstName,respMiddleName,respLastName,resp.address1,resp.address2,resp.state,resp.city,resp.ZipCode,respHomePhone.ContactInfo,respWorkPhone.ContactInfo,complianceAlert,CarrierName,AccountName,@CoCMember,primRecipientId,@mcsProgGroupCode,@medicarePlanGroupId,PlangroupName,@pcpNPI');
        memberStore.load({
            callback: function(record) {
                var detailsForm = me.lookupReference('mymembersinformationform'),
                    toolbar = me.lookupReference('memberinfotoolbar'),
                    paRecord = record["0"].joined["0"].proxy.reader.metaData.ttPAHistory.ttPAHistory,
                    claimsRecord = record["0"].joined["0"].proxy.reader.metaData.ttClaimsHistory.ttClaimsHistory,
                    hedisRecord = record["0"].joined["0"].proxy.reader.metaData.ttHEDIS.ttHEDIS,
                    paArray = [],
                    claimsArray = [],
                    hedisArray = [];


                //LOAD FORM AND TOOLBAR
                detailsForm.loadRecord(record[0]);
                toolbar.loadRecord(record[0]);

                //SET PA GRID
                for(var i = 0; i < paRecord.length; i++) {
                    var individualArray = [];
                    individualArray.push(paRecord[i].AuthID);
                    individualArray.push(paRecord[i].medication);
                    individualArray.push(paRecord[i].authStatus);
                    individualArray.push(paRecord[i].createDate);
                    individualArray.push(paRecord[i].PlanGroupName);
                    paArray.push(individualArray);
                }

                var paStore = new Ext.data.ArrayStore({
                    fields: ['AuthID', 'medication', 'authStatus', 'createDate', 'PlanGroupName'],
                    data: paArray,
                    pageSize: 15,
                    proxy: {
                        type: 'memory',
                        enablePaging: true
                    }
                });
                me.getViewModel().set('priorauthstore', paStore);

                //SET CLAIMS GRID
                for(var i = 0; i < claimsRecord.length; i++) {
                    var individualArray = [];
                    individualArray.push(claimsRecord[i].claimID);
                    individualArray.push(claimsRecord[i].medication);
                    individualArray.push(claimsRecord[i].stat);
                    individualArray.push(claimsRecord[i].svcdate);
                    individualArray.push(claimsRecord[i].planGroupName);
                    claimsArray.push(individualArray);
                }

                var claimsStore = new Ext.data.ArrayStore({
                    fields: ['claimID', 'medication', 'stat', 'svcdate', 'planGroupName'],
                    data: claimsArray,
                    pageSize: 15,
                    proxy: {
                        type: 'memory',
                        enablePaging: true
                    }
                });
                me.getViewModel().set('claimsstore', claimsStore);

                //SET HEDIS GRID
                for(var i = 0; i < hedisRecord.length; i++) {
                    var individualArray = [];
                    individualArray.push(hedisRecord[i].helpText);
                    individualArray.push(hedisRecord[i].measureDesc);
                    individualArray.push(hedisRecord[i].subMeasure);
                    individualArray.push(hedisRecord[i].dueBy);
                    hedisArray.push(individualArray);
                }

                var hedisStore = new Ext.data.ArrayStore({
                    fields: ['helpText', 'measureDesc', 'subMeasure', 'dueBy'],
                    data: hedisArray,
                    pageSize: 15,
                    proxy: {
                        type: 'memory',
                        enablePaging: true
                    }
                });
                me.getViewModel().set('hedisstore', hedisStore);


                var enrollStatus = me.lookupReference('dpyenrollmentStatus'),
                    repID = record["0"].data.recipientID;
                enrollmentStore.getProxy().setExtraParam('pSessionID', user.retSessionID);
                enrollmentStore.getProxy().setExtraParam('pSessionId', user.retSessionID);
                enrollmentStore.getProxy().setExtraParam('pWhere', 'wrdidx contains' +  repID);
                enrollmentStore.load({
                    callback: function (record) {
                        enrollStatus.setValue(record["0"].data.memStatus);
                    }
                });

            }
        });




    }

});