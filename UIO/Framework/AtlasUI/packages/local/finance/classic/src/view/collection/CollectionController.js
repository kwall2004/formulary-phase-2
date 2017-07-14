Ext.define('Atlas.finance.view.collection.CollectionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.finance-collection',
    listen: {
        controller: {
            '*': {
                financecollectionadvsearchcontrolleronLoadSelected: 'onLoadSelected'
            }
        }
    },


    txtValidator: function(val,errortext,number,nmberval) {
        var valid =errortext;
        if(val.getValue())
        {
            if(number=="NUM")
                {

                    var v=  parseInt(val.getValue());
                    if(!v)
                        val.setValue("");

                    if(v.toString().length >= nmberval) {
                        val.setValue(v.toString().substring(0, nmberval))
                        return true;
                    }

                    return v;
                }

            valid = true;
        }

        return valid;
    },


    init: function () {

        var itemidplangroup = this.getView().down('#itemidplangroup');
        itemidplangroup.validator = Ext.bind(this.txtValidator, this, [itemidplangroup, "Plan Group is required",""]);

        var me = this,
            vm = me.getViewModel(),
            view= me.getView(),
            atlasId = view.atlasId,
            assignUser = vm.getStore('assignuser');
        view.down('#itemidplangroup').isValid();
        assignUser.getProxy().setExtraParam('pQueueListID', 5);
        assignUser.load();

        var button ={
            action:'letterId',
           hint:'[Letter ID]'
        };


        me.onSearchTypeToggle(button,false);
        vm.set('dataCredit',{});

        if (view) {
            view.down('#btnAddNotes').setDisabled(!view.parentSystemId);
            view.down('#btnaddcollection').setDisabled(!view.parentSystemId);
        }

        if (atlasId) {
            me.onSearch(atlasId, true);
        }
    },

    onLoadSelected:function (record,isAdvance) {

        var me=this,
            view=me.getView(),
            vm = this.getViewModel();

        if(vm==null){
            return;
        }
        else if (!record){
            return;
        }

        if (view.up('[reference = workspaceTabs]').getActiveTab() === view){
            vm.set('loadrecord',record.data);
            vm.set('loadrecordletterId',record.data.letterID);

            if (record.data)
            {
                view.down('#itemIdmembertypeaheadbox').setValue(record.data.recipientID);
                view.down('#itemIdmembertypeaheadbox').setRawValue(record.data.recipientID);
                view.down('#itemidlettertype').setValue(record.data.letterNameID);
                view.down('#itemIdmembertypeaheadbox').setDisabled(true);
                view.down('#itemidlettertype').setDisabled(true);
                view.down("#itemassignto").setRawValue(record.data.AssignTo);


                var rep = {
                    lastSelection:[{data:{recipientID:record.data.recipientID,MemberName:"",isAdvance:true,planid:record.data.PlanGroupId}}]
                }
                me.setMemberInfo(rep);

                var button ={
                    action:'createNew',
                    hint:'[Letter Type]'
                };

                me.onSearchTypeToggle(button,isAdvance);



                var where = " collectionCreditID = "+record.data.collectionCreditID +" ";
                me.loadCollectionCreditDetails(where,record.data.collectionCreditID);
                me.getMemberInfo(record.data.recipientID,record.data.systemID);
            }
        }
    },

    setSatementTotoal:function (record,field ,collectionCreditID) {
        var me=this,
            vm = this.getViewModel();
        var total = 0;
        record.forEach(function (val,index) {
            total += val.data.amtAdjusted;
        });

        var copyvm = vm.get('loadrecord');
        if( total.toString().indexOf("-")==-1)
        copyvm.total ='<font color="red"><strong>$'+ total.toFixed(2)+'</strong></font>';
        else
            copyvm.total ='<font color="red"><strong>-$'+ total.toFixed(2).toString().replace('-',"")+'</strong></font>';
        vm.set('loadrecord',copyvm);

        var saveAction = [{
            "Save": {"key": '', "value": ''}
        }];
        var extraParameters = {
            pcollectionCreditID: collectionCreditID,
            pAction: "U",
            pFields :"adjustedAmt",
            pValues : total
        };

        var settotal = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/collectioncreditmaster/update', null, [false], extraParameters,
            saveAction,  ['pretLetterID']);
        if (settotal.code == 0) {

        }
    },

    loadCollectionCreditDetails : function (where,collectionCreditID) {
        var me=this,
            vm = this.getViewModel();
        var storeDocument = vm.getStore("storeCollectioncreditDetailExt");
        storeDocument.load({
            params: {
                pWhere: where,
                pBatchSize:0
            },
            callback: function (record, operation) {
                if (record) {

                    var v = {collectionCreditID:collectionCreditID}
                    vm.set('dataCredit',v);
                    me.setSatementTotoal(record, "amtAdjusted",collectionCreditID);
                }
            }
        });
    },

    getMemberInfo :function (recipientID,systemID) {

        var me=this,
            view=this.getView(),
            vm = this.getViewModel();

        var fieldList = "recipientID,firstname,lastname,suffix,homephone.ContactInfo,@enrollmentStatus,home.address1,home.city,home.state,home.zipcode";
        var storeDocument = vm.getStore("memberinfo");
        storeDocument.load({
            params: {
                pKeyValue: recipientID,
                pKeyType:"recipientID",
                pFieldList:fieldList
            },
            callback: function (record, operation) {

                var objResp = Ext.decode(operation.getResponse().responseText.toString()
                    .replace("home.zipcode","homezipcode").replace("homephone.ContactInfo","homephoneContactInfo")
                    .replace("home.state","homestate").replace("home.city","homecity").replace("home.address1","homeaddress1").replace("@enrollmentStatus","enrollmentStatus"));
                if (objResp.data[0]) {
                    var valdata =objResp.data[0];
                    var copyvm = vm.get('loadrecord');
                    if(!copyvm.LetterCreatedBy=='')
                    {
                        view.down("#btnSend").setDisabled(copyvm.LetterSentBy==''?false:true);
                        view.down("#btnApprove").setDisabled(copyvm.LetterApproveBy==''?false:true);
                    }

                    if(vm.get('loadrecordletterId'))
                    {
                        view.down("#btnView").setDisabled(false);
                        view.down("#btnDelete").setDisabled(false);
                    }



                    view.parentSystemId = systemID;
                    view.down('#btnAddNotes').setDisabled(!view.parentSystemId);
                    me.getNotes();
                    copyvm.homezipcode = objResp.data[0].homezipcode;
                    copyvm.homephoneContactInfo = '(' + objResp.data[0].homephoneContactInfo.substring(0, 3) + ')-' + objResp.data[0].homephoneContactInfo.substring(3, 6) + '-' + objResp.data[0].homephoneContactInfo.substring(6, 10);;
                    copyvm.homestate = objResp.data[0].homestate;
                    copyvm.homecity = objResp.data[0].homecity;
                    copyvm.homecityandstate = objResp.data[0].homecity +', ' + objResp.data[0].homestate + ' '+ objResp.data[0].homezipcode;
                    copyvm.homeaddress1 = objResp.data[0].homeaddress1;
                    copyvm.HourRemaining = parseFloat(copyvm.HourRemaining).toFixed(2);
                    copyvm.membernamewithfirstandlast = objResp.data[0].firstname + ' ' + objResp.data[0].lastname;


                    if(objResp.data[0].enrollmentStatus=="Active") {
                        me.getView().down("#pnlActiveStatus").show();
                        me.getView().down("#pnlInActiveStatus").hide();

                        me.getView().down("#pnlActiveWordStatus").show();
                        me.getView().down("#pnlInActiveWordStatus").hide();
                    }
                    else {
                        me.getView().down("#pnlInActiveStatus").show();
                        me.getView().down("#pnlActiveStatus").hide();

                        me.getView().down("#pnlInActiveWordStatus").show();
                        me.getView().down("#pnlActiveWordStatus").hide();
                    }

                    vm.set('loadrecord',copyvm);
                }
            }
        });
    },

    roundNumber:  function(number, precision)
    {
        var factor = Math.pow(10, precision);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    },

    onAdvancedSearch: function () {
        var vm = this.getViewModel();

        if (!this.searchWin) {
            this.searchWin = Ext.create('Atlas.finance.view.collection.AdvancedSearch', {
                //autoShow: true,
                closeAction: 'hide' // Keep window around and don't destroy
            });
        }

        this.getView().add(this.searchWin);
        this.searchWin.show();
    },

    onSearchTypeToggle: function (seg, isAdvance) {

        var vm = this.getViewModel(),
            me=this,
            view=this.getView(),
            field = this.lookup('searchfield'),
            searchBy = seg.action,
            hint = seg.hint;
        field.setValue("");
        view.down("#itemidplangroup").setDisabled(false);
        var store=vm.getStore('storeCollectioncreditDetailExt');
        store.removeAll();
        //me.getView().down("#btnCreateLetter").setDisabled(true);
        me.getView().down("#btnView").setDisabled(true);
        me.getView().down("#btnApprove").setDisabled(true);
        me.getView().down("#btnSend").setDisabled(true);
        me.getView().down("#btnDelete").setDisabled(true);
        me.getView().down("#btnAdvancedSearch").show();
        me.getView().down("#itemidlettertype").hide();
        me.getView().down("#itemIdmembertypeaheadbox").hide();
        me.getView().down("#itemidplangroup").hide();

        var memberplanstore = this.getViewModel().getStore('memberplanstore');
        memberplanstore.removeAll();

        if(searchBy=='letterId')
        {
            field.show();
            view.down("#btnSend").setText('Send');
            view.down("#itemIdmembertypeaheadbox").setValue("");
            view.down("#itemidlettertype").setValue("");
            view.down("#itemidplangroup").setValue("");
            view.down('#btnaddcollection').setDisabled(true);
            view.down('#itemIdsegmentedbutton').setActive(0);
            view.down("#itemidplangroup").setDisabled(false);
            view.down('#itemIdmembertypeaheadbox').setDisabled(false);
            view.down('#itemidlettertype').setDisabled(false);

        }else{
            field.hide();
            view.down('#btnaddcollection').setDisabled(false);
            view.parentSystemId =null;
            me.getView().down("#btnAdvancedSearch").hide();
            me.getView().down("#itemidlettertype").show();
            me.getView().down("#itemIdmembertypeaheadbox").show();
            me.getView().down("#itemidplangroup").show();
            view.down('#itemIdsegmentedbutton').setActive(1);
            if(isAdvance)
            {
                if(isAdvance.type=="click")
                    isAdvance=false;
            }
            if(isAdvance) {
                view.down('#itemIdmembertypeaheadbox').setDisabled(true);
                view.down('#itemidlettertype').setDisabled(true);
                view.down("#itemidplangroup").setDisabled(true);
            }else{
                view.down("#itemIdmembertypeaheadbox").setValue("");
                view.down("#itemidlettertype").setValue("");
                view.down("#itemidplangroup").setValue("");
                view.down("#itemidplangroup").setDisabled(false);
                view.down('#itemIdmembertypeaheadbox').setDisabled(false);
                view.down('#itemidlettertype').setDisabled(false);
            }
        }
    },

    onSearch: function (value,flag) {

        var me=this,
            vm = this.getViewModel(),
            myView = me.getView(),
            where = '';
        where = "letterID = " + value;

        if (myView.atlasId) {
            me.dataloadforcoll(where, flag);
            return;
        }

        if (myView.up('[reference = workspaceTabs]').getActiveTab() === myView){
            if(flag) {
                if(flag.search=="onSearch")
                    flag=false;
                else
                    where = "collectionCreditID = " + value;
            }
            if (value)
            {
                me.dataloadforcoll(where,flag,value);
            }
        }
    },

    dataloadforcoll:function (where,flag,value) {
        var me=this,
            vm = this.getViewModel(),
            myView = me.getView(),
            where = '';



        var storeDocument = vm.getStore("storeCollectioncreditmasterext");
        storeDocument.load({
            params: {
                pWhere: where,
                pBatchSize:0
            },
            callback: function (record, operation) {
                if (record) {
                    me.onLoadSelected(record[0],flag);
                }
            }
        });
    },

    setMemberInfo :function (member,b,c,d) {
        var me=this,
            view=this.getView(),
            vm = this.getViewModel();

        if(!member.lastSelection[0].data.isAdvance)
        {
            member.setValue(member.lastSelection[0].data.recipientID.toString() +' '+  member.lastSelection[0].data.MemberName);
            member.setRawValue(member.lastSelection[0].data.recipientID.toString() +' '+  member.lastSelection[0].data.MemberName);
        }

        var memberplanstore = this.getViewModel().getStore('memberplanstore');
        memberplanstore.removeAll();
        memberplanstore.getProxy().setExtraParam('pRecipientId',parseInt(member.lastSelection[0].data.recipientID.toString().split(' ')[0]));
        memberplanstore.getProxy().setExtraParam('pDate',Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y'));
        memberplanstore.load({
            scope: this,
            callback: function (record, operation, success) {
                var memData = member.lastSelection[0].data,
                    cbxPlanGroup = view.down("#itemidplangroup");
                if(memData.isAdvance)
                {
                    cbxPlanGroup.setRawValue(memData.planid) ;
                    cbxPlanGroup.setValue(memData.planid) ;

                    if(record.length!=0)
                    {
                        var isexist = false;
                        var lastid= 0;
                        record.forEach(function (val,index) {
                            if(val.data.planGroupId == memData.planid)
                                isexist =true;

                            lastid = val.data.planGroupId;
                        })

                        if(isexist) {
                            cbxPlanGroup.setValue(memData.planid) ;
                        }
                        else
                        {
                            cbxPlanGroup.setValue(lastid) ;
                            cbxPlanGroup.setRawValue(memData.planid);
                            cbxPlanGroup.setDisabled(true);
                        }
                    }
                    else{
                        cbxPlanGroup.setValue(memData.planid) ;
                        cbxPlanGroup.setRawValue(memData.planid);
                    }
                }
                else{
                    if (record[0].data)
                        cbxPlanGroup.setValue(record[0].data.planGroupId) ;
                    else
                        cbxPlanGroup.setValue("") ;
                }
            }
        });
    },




    getClaimInfo:function (e) {

        var me=this,
            view =this.getView(),
            vm = this.getViewModel();

        var fieldList = "recipientID,respStatus,ncpdpID,serviceDate,TransactionDate,TransitionFill,prescriberID,prescriberNPI,pcpProvId,rxNum,gcnseq,@drugLN,ndc,patPaidAmt,carrierLobId";


        var storeclaiminfo = this.getViewModel().getStore('storeclaiminfo');
        storeclaiminfo.getProxy().setExtraParam('pPlanID',"HPM");
        storeclaiminfo.getProxy().setExtraParam('pTransactionID', e.rawValue);
        storeclaiminfo.getProxy().setExtraParam('pFieldList',fieldList);
        storeclaiminfo.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
               var  response = Ext.decode(operation.getResponse().responseText.toString().replace("@drugLN","drugLN"));




                var objResp = Ext.decode(operation.getResponse().responseText);
                if(objResp.message[0].message!="Success")
                {
                    Ext.MessageBox.show({
                        title: 'PBM',
                        msg:"Only claims for the selected member can be added.",
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                    return;
                }

                if(response.data[0].recipientID)
                {
                    var status;
                    if (response.data[0].respStatus === 'P') {
                        status = 'Paid'
                    } else if (response.data[0].respStatus === 'R') {
                        status = 'Rejected'
                    } else if (response.data[0].respStatus === 'A') {
                        status = 'Reversed'
                    } else if (response.data[0].respStatus === 'C') {
                        status = 'Captured'
                    } else if (response.data[0].respStatus === 'D') {
                        status = 'Duplicate Paid'
                    } else if (response.data[0].respStatus === 'F') {
                        status = 'Pa Defered'
                    } else if (response.data[0].respStatus === 'Q') {
                        status = 'Duplicate of Capture'
                    } else if (response.data[0].respStatus === 'S') {
                        status = 'Duplication of Reversed'
                    }
                    view.creditsave =false;
                    view.down("#txtservicedate").setValue(Ext.Date.format(new Date(response.data[0].serviceDate), 'm/d/Y'));
                    view.down("#txtdrugname").setValue(response.data[0].drugLN);
                    view.down("#txtclaimstatus").setValue(status);
                    view.down("#txtpatientpaidamount").setValue("$"+response.data[0].patPaidAmt);

                }else{
                    view.down("#txtservicedate").setValue("");
                    view.down("#txtdrugname").setValue("");
                    view.down("#txtclaimstatus").setValue("");
                    view.down("#txtpatientpaidamount").setValue("");
                    view.creditsave =true;
                }
            }
        });

    },

    createWinforCopay :function (title) {

        var copayWin = Ext.create('Ext.window.Window', {
            itemId: 'copayWin',
            height: 330,
            width: 300,
            iconCls: 'icon-contactlog,8',
            layout: 'vbox',
            title:'Copay Collection',
            modal: true,
            items: [
                {
                    xtype: 'form',
                    flex: 1,
                    itemId:'frmaddupdatecopayWin',
                    defaults: {
                        labelWidth: 100
                    },
                    items: [{
                        fieldLabel: 'Claim ID',
                        name: 'claimid',
                        xtype: 'numberfield',
                        itemId:'txtclaimid',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false,
                        enableKeyEvents: true,
                        listeners:{
                            change:'getClaimInfo'
                        }
                    },{
                        fieldLabel: 'Amount ($)',
                        name: 'amount',
                        xtype: 'numberfield',
                        itemId:'txtamount',
                        hideTrigger: true,
                        keyNavEnabled: false,
                        mouseWheelEnabled: false
                    },{
                        xtype: 'fieldset',
                        collapsed:false,
                        items:[{
                            fieldLabel: 'Service Date',
                            xtype:'displayfield',
                            itemId:'txtservicedate'
                        },{
                            fieldLabel: 'Drug Name',
                            xtype:'displayfield',
                            itemId:'txtdrugname'
                        },{
                            fieldLabel: 'Claim Status',
                            xtype:'displayfield',
                            itemId:'txtclaimstatus'
                        },{
                            fieldLabel: 'Patient Paid Amount.',
                            xtype:'displayfield',
                            itemId:'txtpatientpaidamount'
                        }]
                    }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '->',
                        {xtype: 'button', text: 'Save', itemId: 'btnSave', handler: 'winCollectionSave', iconCls: 'fa fa-save'},
                        {xtype: 'button', text: 'Cancel', handler: 'winCollectionClose',iconCls: 'fa fa-times'}
                    ]
                },
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {xtype: 'displayfield', itemId: 'noteDate'}, '-',
                        {xtype: 'displayfield', itemId: 'noteUser'}
                    ]
                }
            ]
        });


        return copayWin;
    },

    onAddClick: function () {

        var view = this.getView(),
            user = Atlas.user.un,
            copayWin = Ext.create(this.createWinforCopay());

        if(view.down("#itemidplangroup").getRawValue().indexOf("Medicare") == -1)
        {

            Ext.MessageBox.show({
                title: 'PBM',
                msg: 'Please select only Medicare members.',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
            return;
        }


        copayWin.show();
        view.add(copayWin);

        view.down('#txtclaimid').validator = Ext.bind(this.txtValidator, this, [ view.down('#txtclaimid'), "This field is required"]);
        view.down('#txtamount').validator = Ext.bind(this.txtValidator, this, [ view.down('#txtamount'), "This field is required"]);
        view.down('#txtclaimid').isValid();
        view.down('#txtamount').isValid();
    },

    onEditClick: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            user = Atlas.user.un,
            winUpdateNotes = Ext.create(this.createWinforCopay());
        winUpdateNotes.show();
        view.add(winUpdateNotes);



        var status;
        if (vm.get('dataCredit').respStatus === 'P') {
            status = 'Paid'
        } else if (vm.get('dataCredit').respStatus === 'R') {
            status = 'Rejected'
        } else if (vm.get('dataCredit').respStatus === 'A') {
            status = 'Reversed'
        } else if (vm.get('dataCredit').respStatus === 'C') {
            status = 'Captured'
        } else if (vm.get('dataCredit').respStatus === 'D') {
            status = 'Duplicate Paid'
        } else if (vm.get('dataCredit').respStatus === 'F') {
            status = 'Pa Defered'
        } else if (vm.get('dataCredit').respStatus === 'Q') {
            status = 'Duplicate of Capture'
        } else if (vm.get('dataCredit').respStatus === 'S') {
            status = 'Duplication of Reversed'
        }
        view.down('#txtclaimid').setValue(vm.get('dataCredit').transactionID);
        view.down('#txtamount').setValue(vm.get('dataCredit').amtAdjusted);
        view.down("#txtservicedate").setValue(Ext.Date.format(new Date( vm.get('dataCredit').serviceDate), 'm/d/Y'));
        view.down("#txtdrugname").setValue(vm.get('dataCredit').drugName);
        view.down("#txtclaimstatus").setValue(status);
        view.down("#txtpatientpaidamount").setValue("$"+vm.get('dataCredit').patientPaidAmt);
    },

    onDeleteClick :function () {

        var view = this.getView(),
            me=this,
            vm = this.getViewModel();

        Ext.MessageBox.confirm('Delete Prescriber','Are you sure you would like to delete the selected record?', function(btn){
            if(btn === 'yes'){
                me.actionCreditDelete();
            }
        },this)
    },

    actionCreditDelete : function () {


        var view = this.getView(),
            me=this,
            vm = this.getViewModel();

        var saveAction = [{
            "Save": {"key": '', "value": ''}
        }];


        var extraParameters = {
            pSystemId:vm.get('dataCredit').systemID,
            pAction: "D",
            pFields :"",
            pValues : ""
        };

        var collectioncreditdetailext = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/CollectionCreditDetail/update', null, [false], extraParameters,
            saveAction,  ['pretLetterID']);


        if(collectioncreditdetailext.code == 0){

            me.onSearch(vm.get('dataCredit').collectionCreditID,true);
            view.down('#btnupdatecollection').setDisabled(true);
            view.down('#btndeletecollection').setDisabled(true);
            vm.set('dataCredit',{});
        }
    },


    collectioncreditsearchgrid_itemclick :function (dv, record, item, index, e) {

        var view = this.getView(),
            me=this,
            vm = this.getViewModel();

        vm.set('dataCredit',record.data);
        view.down('#btnupdatecollection').setDisabled(false);
        view.down('#btndeletecollection').setDisabled(false);
    },

    onCreateLetterClick:function () {
        var view = this.getView(),
            me=this,
            mode = "A",
            letterId=0,
            assigneto='',
            vm = this.getViewModel();

         if(view.down("#itemassignto").getValue())
          assigneto = view.down("#itemassignto").getValue();

        fieldList = "CreateDate,CreateBy,AssignTo,LetterNameID,RecipientID,planGroupId",
            valueList = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s')  + "|" + Atlas.user.un  + "|" + assigneto + "|" + view.down("#itemidlettertype").getValue() + "|" + view.down("#itemIdmembertypeaheadbox").getValue().split(' ')[0] + "|" +view.down("#itemidplangroup").getValue().split(' ')[0];



        if(vm.get('loadrecordletterId'))
        {
            letterId = vm.get('loadrecordletterId');
            mode = "U"
            fieldList = "AssignTo,LetterNameID,RecipientID,planGroupId";
            valueList = assigneto + "|" + view.down("#itemidlettertype").getValue() + "|" + view.down("#itemIdmembertypeaheadbox").getValue().split(' ')[0]+ "|" + view.down("#itemidplangroup").getValue().split(' ')[0];
        }

        var saveAction = [{
            "Save": {"key": '', "value": ''}
        }];
        var extraParameters = {
            pLetterID: letterId,
            pMode: mode,
            pFields :fieldList,
            pValues :valueList
        };

        var setLetterDetail = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdetail/update', null, [false], extraParameters,
            saveAction,  ['pretLetterID']);

        if (setLetterDetail.code == 0) {

            if(!vm.get('loadrecordletterId'))
              vm.set('loadrecordletterId',setLetterDetail.pretLetterID);

           var pFieldList = "LetterID";
            var pFieldValues = vm.get('loadrecordletterId');
            var extraParameters = {
                pcollectionCreditID:vm.get('dataCredit').collectionCreditID,
                pAction: "U",
                pFields :pFieldList,
                pValues : pFieldValues
            };

            var collectioncreditdetailext = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/collectioncreditmaster/update', null, [false], extraParameters,
                saveAction,  ['pRetcollectionCreditID','pRetSystemID']);

            if(collectioncreditdetailext.code==0)
            {
                view.down('#btnCreateLetter').setDisabled(true);
                me.onSearch(collectioncreditdetailext.pRetcollectionCreditID,true);
                view.down('#btnView').setDisabled(false);
                view.down("#btnApprove").setDisabled(false);
                view.down("#btnSend").setDisabled(false);
                view.down("#btnDelete").setDisabled(false);
                view.down('#btnaddcollection').setDisabled(false);
            }
        }
    },

    onViewPdfClick :function () {


        var view = this.getView(),
            me=this,
            vm = this.getViewModel();

        var letterDetails ={};
        vm.get('proxyletterslist').data.items.forEach(function (val,index) {
            if(val.data.LetterNameID==view.down("#itemidlettertype").getValue() )
            {
                letterDetails = val;
            }
        })

        var ProgramName = letterDetails.data.LetterProgramName;
        var parameters= vm.get('loadrecordletterId');
        var reportName= view.down("#itemidlettertype").getRawValue();



        var saveAction = [{
            "Save": {"key": '', "value": ''}
        }];
        var extraParameters = {
            pDescription: reportName,
            pProgramName:ProgramName,
            pParameters :parameters,
            pRunMode :1,
            pProgramType:"",
            pSaveDocument:false,
            pFaxNumber:''
        };

        var setsubmitjob = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/submitjob/update', null, [false], extraParameters,
            saveAction,  ['pData']);

        if (setsubmitjob.code == 0) {

            Atlas.common.utility.Utilities.displayDocument('pdf', setsubmitjob.pData);
        }
    },

    onApproveClick:function () {


        var view = this.getView(),
            me=this,
            extraParameters={},
            vm = this.getViewModel();
        var today =  Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s');
        var user = Atlas.user.un;
        var mode = "U";
        var letterDetails ={};
        vm.get('proxyletterslist').data.items.forEach(function (val,index) {
            if(val.data.LetterNameID==view.down("#itemidlettertype").getValue() )
            {
                letterDetails = val;
            }
        })


        var fieldList = "ApproveBy,ApproveDate,AssignTo";
        var valueList = user + "|" +today + "|" + view.down("#itemassignto").getValue();
        var letterID = vm.get('loadrecordletterId');
        var programName =  letterDetails.data.LetterProgramName;

        if(letterID)
        {
            var saveAction = [{
                "Save": {"key": '', "value": ''}
            }];
            extraParameters = {
                pMode:mode,
                pLetterID: letterID,
                pFields: fieldList,
                pValues:valueList
            };
            var setletterdetails = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdetail/update', null, [false], extraParameters,
                saveAction,  ['DocID']);
            if (setletterdetails.code == 0) {

                extraParameters = {
                    pLetterID: letterID,
                    pLetterProgramName: programName
                };
                var setletterdocument = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdocument/update', null, [false], extraParameters,
                    saveAction,  ['DocID']);
                if (setletterdocument.code == 0) {
                    me.onSearch(vm.get('dataCredit').collectionCreditID,true);
                }
            }
        }

    },

    onSendClick:function () {



        var view = this.getView(),
            me=this,
            extraParameters={},
            vm = this.getViewModel();
        var today =  Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s');
        var user = Atlas.user.un;
        var mode = "U";
        var fieldList = "sentBy,sentDate,AssignTo";
        var valueList = user + "|" +today + "|" + view.down("#itemassignto").getValue();
        var letterID =  vm.get('loadrecordletterId');

        if(letterID)
        {
            var saveAction = [{
                "Save": {"key": '', "value": ''}
            }];
            extraParameters = {
                pMode:mode,
                pLetterID: letterID,
                pFields: fieldList,
                pValues:valueList
            };
            var setletterdetails = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdetail/update', null, [false], extraParameters,
                saveAction,  ['DocID']);
            if (setletterdetails.code == 0) {
                me.onSearch(vm.get('dataCredit').collectionCreditID,true);
            }
        }
    },


    deleteLetter:function () {
        var view = this.getView(),
            me=this,
            extraParameters={},
            vm = this.getViewModel();
        var mode = "D";
        var fieldList = "";
        var valueList ="";
        var letterID =  vm.get('loadrecordletterId');



        if(letterID)
        {
            var saveAction = [{
                "Save": {"key": '', "value": ''}
            }];
            extraParameters = {
                pMode:mode,
                pLetterID: letterID,
                pFields: fieldList,
                pValues:valueList
            };
            var setletterdetails = Atlas.common.utility.Utilities.saveData([{}], 'member/rx/letterdetail/update', null, [false], extraParameters,
                saveAction,  ['DocID']);
            if (setletterdetails.code == 0) {
                if(vm.get('dataCredit').collectionCreditID)
                {
                    var saveAction = [{
                        "Save": {"key": '', "value": ''}
                    }];
                    var extraParameters = {
                        pcollectionCreditID:vm.get('dataCredit').collectionCreditID,
                        pAction: mode,
                        pFields :fieldList,
                        pValues : valueList
                    };

                    var collectioncreditdetailext = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/collectioncreditmaster/update', null, [false], extraParameters,
                        saveAction,  ['pRetcollectionCreditID','pRetSystemID']);

                    if(collectioncreditdetailext.code==0){

                        view.down("#itemIdmembertypeaheadbox").setValue("");
                        view.down("#itemidlettertype").setValue("");
                        view.down("#itemidplangroup").setValue("");
                        vm.set('loadrecordletterId',0);
                        vm.set('loadrecord',{});
                        vm.set('dataCredit',{});

                        var button ={
                            action:'createNew',
                            hint:'[Letter Type]'
                        };

                        me.onSearchTypeToggle(button,false);
                        view.parentSystemId = null;
                        this.getNotes();
                    }
                }
            }
        }
    },


    onDeleteLetterClick:function () {

        Ext.Msg.confirm('Delete', 'Are you sure you would like to delete selected letter?', function (btn) {
            if (btn == 'yes') {
             this.deleteLetter();
            }
        }, this);
    },


    winCollectionSave:function () {

        var view = this.getView(),
            me=this,
            user = Atlas.user.un,
            today = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y'),
            vm = this.getViewModel();


        view.creditsave =false;




        if(view.down("#txtclaimstatus").getValue()=="Rejected")
        {
            Ext.MessageBox.show({
                title: 'Validation',
                msg:"Please enter a valid claim.",
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
            return;
        }


       var pFieldList = "createBy,createDate,type,recipientID,planGroupID,letterNameID";
       var pFieldValues = user+'|'+ today +'|' +  view.down("#itemidlettertype").getRawValue() +'|'+ view.down("#itemIdmembertypeaheadbox").getValue().split(' ')[0] + '|' + view.down("#itemidplangroup").getValue() +'|' +  view.down("#itemidlettertype").getValue();
        var pMode = "A";
        var pDetailMode ="A";
        var edit =vm.get('dataCredit');
        var masterSystemId = 0;
        var childSystemId = 0;
        if(vm.get('dataCredit').collectionCreditID) {
            pMode = "U";
            masterSystemId = vm.get('dataCredit').collectionCreditID;
            view.down('#btnupdatecollection').setDisabled(true);
            view.down('#btndeletecollection').setDisabled(true);
        }
        if(vm.get('dataCredit').systemID)
        {
            pDetailMode = "U";
            childSystemId = vm.get('dataCredit').systemID;
        }


        var saveAction = [{
            "Save": {"key": '', "value": ''}
        }];
        var extraParameters = {
            pcollectionCreditID:masterSystemId,
            pAction: pMode,
            pFields :pFieldList,
            pValues : pFieldValues
        };

        var collectioncreditmaster = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/collectioncreditmaster/update', null, [false], extraParameters,
            saveAction,  ['pRetcollectionCreditID','pRetSystemID']);
        if (collectioncreditmaster.code == 0) {

             pFieldList = "transactionID,amtAdjusted,planGroupID,collectionCreditID";
             pFieldValues =  view.down('#txtclaimid').getValue() +'|'+ view.down("#txtamount").getValue() + '|' + view.down("#itemidplangroup").getValue() +'|' +  collectioncreditmaster.pRetcollectionCreditID;

            if(pDetailMode=="A")
            {
                pFieldList = "createBy,createDate,transactionID,amtAdjusted,planGroupID,collectionCreditID";
                pFieldValues = user+'|'+ today +'|' +  view.down('#txtclaimid').getValue() +'|'+ view.down("#txtamount").getValue() + '|' + view.down("#itemidplangroup").getValue() +'|' +   collectioncreditmaster.pRetcollectionCreditID;
            }

            var extraParameters = {
                pSystemId:childSystemId,
                pAction: pMode,
                pFields :pFieldList,
                pValues : pFieldValues
            };

            if(!vm.get('loadrecordletterId'))
                me.getView().down("#btnCreateLetter").setDisabled(false);

            var collectioncreditdetailext = Atlas.common.utility.Utilities.saveData([{}], 'finance/rx/CollectionCreditDetail/update', null, [false], extraParameters,
                saveAction,  ['pretLetterID']);


            if(collectioncreditdetailext.code == 0){
                    me.onSearch(collectioncreditmaster.pRetcollectionCreditID,true);
                     vm.set('dataCredit',{});
                    me.winCollectionClose();

                Ext.MessageBox.show({
                    title: 'PBM',
                    msg: 'Successfully saved the details',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });


            }
        }
    },

    winCollectionClose:function () {
        var win = Ext.WindowManager.getActive();
        if (win) {
            win.close();
        }
    },

    onLettersListLoad: function (store, records) {
        var vm = this.getViewModel();
       // var proxystore = vm.getStore("proxyletterslist");

        store.filter('moduleName', 'Finance');
        vm.set('proxyletterslist',store)

        // store.data.items.forEach(function (val,index) {
        //
        // })
    },

    //---------------------------------------------- Notes section
    getNotes: function () {
        var view = this.getView();
        if (view) {


            var parentSystemId = view.parentSystemId;
            view.down('#btnUpdateNotes').setDisabled(true);
            view.down('#btnDeleteNotes').setDisabled(true);
            var storeCheckMastersNotes = this.getViewModel().getStore('storeCheckMastersNotes');
            storeCheckMastersNotes.getProxy().setExtraParam('pParentSystemID', parentSystemId);
            storeCheckMastersNotes.load({
                scope: this,
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {
                    if (success) {
                        var objResp = Ext.decode(operation.getResponse().responseText);
                        if (objResp.message[0].code == 0) {
                            if (objResp.data.length > 0) {
                                Ext.defer(function () {
                                    view.down('#gpNotes').getSelectionModel().select(0);
                                }, 300);
                            }
                        }
                    }
                }
            });
        }
    },



    onAddNotes: function () {
        var view = this.getView(),
            user = Atlas.user.un,
            winAddNotes = Ext.create(winNotes),
            today = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y');
        winAddNotes.show();
        view.add(winAddNotes);
        view.down('#noteUser').setValue(user);
        view.down('#noteDate').setValue(today);
        view.down('#btnSave').setText('Add');
        view.down('#winNotes').setTitle('Add');
    },

    onUpdateNotes: function () {
        var view = this.getView(),
            vm = this.getViewModel(),
            user = Atlas.user.un,
            winUpdateNotes = Ext.create(winNotes),
            today = Ext.Date.format(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y');
        winUpdateNotes.show();
        view.add(winUpdateNotes);
        view.down('#noteDate').setValue(today);
        view.down('#noteUser').setValue(user);
        view.down('#btnSave').setText('Update');
        view.down('#winNotes').setTitle('Update');
        view.down('#txtDesc').setValue(vm.get('selectedNoteRecord').get('Note'));
        view.down('#txtSbj').setValue(vm.get('selectedNoteRecord').get('Subject'));
    },

    onDeleteNotes: function () {
        Ext.Msg.confirm('Delete', 'Are you sure you would like to delete selected note?', function (btn) {
            if (btn == 'yes') {
                var saveAction = [{"Save": {"key": "pMode", "value": "D"}}];
                var systemID = parseFloat(this.getViewModel().get('selectedNoteRecord').get('SystemID'));
                this.setNotes(systemID, '', '', saveAction);
            }
        }, this);
    },

    winNotesSave: function () {
        var saveAction = '',
            seconds = 0,
            systemID = 0,
            now = Atlas.common.utility.Utilities.getLocalDateTime(),
            view = this.getView(),
            vm = this.getViewModel(),
            parentSystemId = parseFloat(view.parentSystemId),
            then = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0),
            pFieldList = 'ParentSystemID,Subject,Note,CreateUser,CreateDate,CreateTime';
        if (view.down('#winNotes').getTitle() == 'Add') {
            saveAction = [{"Save": {"key": "pMode", "value": "A"}}];
        }
        else if (view.down('#winNotes').getTitle() == 'Update') {
            saveAction = [{"Save": {"key": "pMode", "value": "U"}}];
            systemID = vm.get('selectedNoteRecord').get('SystemID');
        }
        seconds = now.getTime() - then.getTime();
        var pFieldValues = parseFloat(parentSystemId) + "|" + view.down('#txtSbj').getValue() + "|" + view.down('#txtDesc').getValue() + "|" + view.down('#noteUser').getValue() + "|" + view.down('#noteDate').getValue() + "|" + seconds.toString();
        this.setNotes(systemID, pFieldList, pFieldValues, saveAction);
        if (view.down('#winNotes')) {
            view.down('#winNotes').close();
        }
    },

    setNotes: function (systemID, pFieldList, pFieldValues, saveAction) {
        var extraParameters = {
            psystemId: systemID,
            pFieldList: pFieldList,
            pFields: pFieldValues
        };
        var saveNotesData = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/notes/update', null, [true], extraParameters,
            saveAction, null);
        if (saveNotesData.code != 0) {
            Ext.Msg.alert('Error', saveNotesData.message);
        }
        this.getNotes();
    },

    onGridRowSelect: function (me, record, tr, rowIndex, e, eOpts) {
        this.getView().down('#btnUpdateNotes').setDisabled(false);
        this.getView().down('#btnDeleteNotes').setDisabled(false);
        this.getViewModel().set('selectedNoteRecord', record);
    },

    winNotesClose: function () {
        this.getView().down('#winNotes').close();
    },

    reloadNotes: function (parentSystemId) {
        var view = this.getView();
        if (view) {
            view.parentSystemId = parentSystemId;
            view.down('#btnAddNotes').setDisabled(!view.parentSystemId);
            if (view.parentSystemId) {
                this.getNotes();
            }
        }
    }
});


var winNotes = Ext.create('Ext.window.Window', {
    itemId: 'winNotes',
    height: 230,
    width: 300,
    layout: 'vbox',
    modal: true,
    items: [
        {xtype: 'textfield', itemId: 'txtSbj', fieldLabel: 'Subject'},
        {xtype: 'textarea', itemId: 'txtDesc', fieldLabel: 'Description'}
    ],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                '->',
                {xtype: 'button', itemId: 'btnSave', handler: 'winNotesSave'},
                {xtype: 'button', text: 'Cancel', handler: 'winNotesClose'}
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'panel',
                iconCls: 'fa fa-calendar-check-o',
                width:23,
                iconMask: false
            },
                {xtype: 'displayfield', itemId: 'noteDate'}, '-',
                {
                    xtype: 'panel',
                    iconCls: 'fa fa-user',
                    width:23,
                    iconMask: false
                },
                {xtype: 'displayfield', itemId: 'noteUser'}
            ]
        }
    ]
});



