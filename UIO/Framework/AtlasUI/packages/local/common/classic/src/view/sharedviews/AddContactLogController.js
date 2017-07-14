/**
 * Created by T4317 on 10/3/2016.
 */

var checkboxArray = [];
Ext.define('Atlas.common.view.sharedviews.AddContactLogController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.addcontactlogcontroller',
    finalselectedcodes:[],
    finalselectedreasons:[],
    init: function() {

        var me = this,
            vm = this.getView().items.items[0].getViewModel(),
            IsAuthFromOldModule = this.getView().IsAuthFromOldModule,
            user = Ext.first('viewport').getViewModel().get('user'),
            contactliststore = vm.getStore('contactreceiverlist'),
            receivedForm = this.getView().lookupReference('receiveForm'),
            // receivedForm2 = this.getView().lookupReference('receivedForm2')
            contactcodelist = this.getView().lookupReference('contactcodecard'),
            typestore = this.getView().lookup('contactlogtype').getStore(),
            statusstore = this.getView().lookup('contactlogstatus').getStore();
        //assignstore = this.getView().lookup('assignto').getStore();
        me.finalselectedreasons =[];
        me.finalselectedcodes =[];

        var assignstore =vm.getStore('storeuserdetails');
        assignstore.removeAll();
        assignstore.getProxy().setExtraParam('pShowActive',"Yes");
        assignstore.load( {
            scope: this,
            failure: function (record1, operation1) {
            },
            success: function (record1, operation1) {
            },
            callback: function (record1, operation1, success1) {
                var objResp1 = Ext.decode(operation1.getResponse().responseText);
                if (objResp1.message[0].code == 0) {


                    var storelistuserqueue =vm.getStore('storelistuserqueue');
                    storelistuserqueue.removeAll();
                    storelistuserqueue.getProxy().setExtraParam('pListName',"UserQueue");
                    storelistuserqueue.load( {
                        scope: this,
                        failure: function (record1, operation1) {
                        },
                        success: function (record1, operation1) {
                        },
                        callback: function (record1, operation1, success1) {
                            var objResp1 = Ext.decode(operation1.getResponse().responseText);
                            if (objResp1.message[0].code == 0) {

                                objResp1.data.forEach(function (val,index) {
                                    if(val.value=="14") {
                                        vm.getStore('storeuserdetails').insert(0, {userName:val.name, systemId:val.value});
                                    }
                                })
                            }
                        }
                    });

                }
            }
        });



        typestore.load();
        statusstore.load();
        // assignstore.load();
        vm.set('user', user);

        contactliststore.getProxy().setExtraParam('pListName', 'ContactCodeCategory');
        contactliststore.load({
            failure: function()
            {
            },
            success: function(record, operation)
            {
            },
            callback: function(masterrecord, operation, success)
            {
                me.getView().lookup("contactlogcallerLastName").setValue("");
                me.getView().lookup("contactlogcallerFirstName").setValue("");
                me.getView().lookup("contactlogcallerPhone").setValue("");
                me.getView().lookup("contactlogsubject").setValue("");
                me.getView().lookup("contactlogdescription").setValue("");
                if(vm.get('forminfo'))
                {
                    if(vm.get('forminfo').page=="prescriber")
                    {
                        me.getView().down("#itemidprescribertypeahead").setValue(vm.get('forminfo').keyvalue);
                        me.getView().down("#itemidprescribertypeahead").setRawValue(vm.get('forminfo').keyvalue +' '+ vm.get('forminfo').keytext);
                        me.getView().down("#itemidprescribertypeahead").setReadOnly(true);
                        me.getView().lookup("redirectPrescriber").hide();
                    }

                    if(vm.get('forminfo').page=="pharmacy")
                    {
                        me.getView().down("#itemidprovidertypeaheadbox").setValue(vm.get('forminfo').keyvalue);
                        me.getView().down("#itemidprovidertypeaheadbox").setRawValue(vm.get('forminfo').keyvalue +' '+ vm.get('forminfo').keytext);
                        me.getView().down("#itemidprovidertypeaheadbox").setReadOnly(true);
                        me.getView().lookup("redirectpharmacyName").hide();
                    }

                    if(vm.get('forminfo').page=="member")
                    {
                        me.getView().down("#itemidmembertypeaheadbox").setValue(vm.get('forminfo').keyvalue);
                        me.getView().down("#itemidmembertypeaheadbox").setRawValue(vm.get('forminfo').keyvalue +' '+ vm.get('forminfo').keytext);
                        me.getView().down("#itemidmembertypeaheadbox").setReadOnly(true);
                        me.getView().lookup("redirectMemberName").hide();
                    }

                    if(vm.get('forminfo').page=="cdag")
                    {
                        me.getView().lookup("contactlogAuthID").setValue(vm.get('forminfo').keyvalue);
                        me.getView().lookup("contactlogAuthID").setReadOnly(true);
                        me.getView().lookup("redirectAuthID").hide();
                    }

                    if(vm.get('forminfo').page=="MMR")
                    {
                        me.getView().lookup("contactlogMTMId").setValue(vm.get('forminfo').keyvalue);
                        me.getView().lookup("contactlogMTMId").setReadOnly(true);
                        me.getView().lookup("redirectMTMId").hide();
                        me.getView().lookup('plangrouptypeaheadbox').setValue(vm.get('forminfo').plankeyvalue);
                        me.getView().lookup('plangrouptypeaheadbox').setRawValue(vm.get('forminfo').plankeyvalue);
                    }

                    if(vm.get('forminfo').page=="claim")
                    {
                        me.getView().lookup("contactlogTransactionID").setValue(vm.get('forminfo').keyvalue);
                        me.getView().lookup("contactlogTransactionID").setReadOnly(true);
                        me.getView().lookup("redirectTransactionID").hide();
                    }

                    /////////////////////////// Set Plan ////////////////////////////////

                    if(vm.get('forminfo').PlanGroupID || vm.get('forminfo').planGroupId)
                    {
                        var planid = '';
                        if(vm.get('forminfo').PlanGroupID)
                            planid = vm.get('forminfo').PlanGroupID;
                        else if(vm.get('forminfo').planGroupId)
                            planid = vm.get('forminfo').planGroupId;

                        me.getView().lookup('plangrouptypeaheadbox').setValue(planid);
                        me.getView().lookup('plangrouptypeaheadbox').setRawValue(planid);
                    }


                    /////////////////////////// Set ClaimID ////////////////////////////////

                    if(vm.get('forminfo').ClaimID)
                    {
                        me.getView().lookup("contactlogTransactionID").setValue(vm.get('forminfo').ClaimID);
                        //  me.getView().lookup("redirectTransactionID").hide();
                    }

                    /////////////////////////// Set MMR ////////////////////////////////

                    // if(vm.get('forminfo').ClaimID)
                    // {
                    //     me.getView().lookup("contactlogMTMId").setValue(vm.get('forminfo').keyvalue);
                    //     me.getView().lookup("redirectMTMId").hide();
                    // }


                    ///////////////////////////// Set Auth //////////////////////////

                    if(vm.get('forminfo').authID)
                    {
                        me.getView().lookup("contactlogAuthID").setValue(vm.get('forminfo').authID);
                        // me.getView().lookup("redirectAuthID").hide();
                    }

                    /////////////////////////// Set Member ////////////////////////////////
                    if(vm.get('forminfo').RecipID || vm.get('forminfo').recipientID || vm.get('forminfo').RecipientId)
                    {
                        var recipid ='';;
                        if(vm.get('forminfo').RecipID)
                            recipid = vm.get('forminfo').RecipID;
                        else if(vm.get('forminfo').recipientID)
                            recipid = vm.get('forminfo').recipientID;
                        else if(vm.get('forminfo').RecipientId)
                            recipid = vm.get('forminfo').RecipientId;

                        me.getView().down("#itemidmembertypeaheadbox").setValue(recipid);
                        me.getView().down("#itemidmembertypeaheadbox").setRawValue(recipid);
                    }

                    ////////////////// Set Prescriber///////////////////////////////
                    if(vm.get('forminfo').prescriberID)
                    {
                        if(!vm.get('forminfo').prescriberName)
                            vm.get('forminfo').prescriberName ="";

                        me.getView().down("#itemidprescribertypeahead").setValue(vm.get('forminfo').prescriberID);
                        me.getView().down("#itemidprescribertypeahead").setRawValue(vm.get('forminfo').prescriberID +' '+ vm.get('forminfo').prescriberName);
                    }

                    ///////////////////////// Set Pharmacy ///////////////////////////////

                    if(vm.get('forminfo').ncpdpID)
                    {
                        me.getView().down("#itemidprovidertypeaheadbox").setValue(vm.get('forminfo').ncpdpID);
                        me.getView().down("#itemidprovidertypeaheadbox").setRawValue(vm.get('forminfo').ncpdpID);
                        //me.getView().lookup("redirectpharmacyName").hide();
                    }
                }

                if(vm.get('forminfo').action=='edit') {

                    if(me.getViewModel().data.record.data.reasons)
                    {
                        if(!me.finalselectedreasons)
                            me.finalselectedreasons =[];

                        if(me.getViewModel().data.record.data.reasons.length==1 || me.getViewModel().data.record.data.reasons.length==2 || me.getViewModel().data.record.data.reasons.length==3)
                        {
                            me.getView().down("#itemidReason1").setValue(me.getViewModel().data.record.data.reasons[0].CodeValue);
                            me.getView().down("#itemidReason1").setRawValue(me.getViewModel().data.record.data.reasons[0].CodeValue +' '+me.getViewModel().data.record.data.reasons[0].CodeDescr);
                            me.finalselectedreasons.push({reason:me.getViewModel().data.record.data.reasons[0].CodeValue +' '+me.getViewModel().data.record.data.reasons[0].CodeDescr});
                            me.finalselectedcodes.push(me.getViewModel().data.record.data.reasons[0].CodeValue)
                        }
                        if(me.getViewModel().data.record.data.reasons.length==2 || me.getViewModel().data.record.data.reasons.length==3) {
                            me.getView().down("#itemidReason2").setValue(me.getViewModel().data.record.data.reasons[1].CodeValue);
                            me.getView().down("#itemidReason2").setRawValue(me.getViewModel().data.record.data.reasons[1].CodeValue +' '+me.getViewModel().data.record.data.reasons[1].CodeDescr);
                            me.finalselectedreasons.push({reason:me.getViewModel().data.record.data.reasons[1].CodeValue +' '+me.getViewModel().data.record.data.reasons[1].CodeDescr});
                            me.finalselectedcodes.push(me.getViewModel().data.record.data.reasons[1].CodeValue)
                        }
                        if(me.getViewModel().data.record.data.reasons.length==3) {
                            me.getView().down("#itemidReason3").setValue(me.getViewModel().data.record.data.reasons[2].CodeValue);
                            me.getView().down("#itemidReason3").setRawValue(me.getViewModel().data.record.data.reasons[2].CodeValue +' '+me.getViewModel().data.record.data.reasons[2].CodeDescr);
                            me.finalselectedreasons.push({reason:me.getViewModel().data.record.data.reasons[2].CodeValue +' '+me.getViewModel().data.record.data.reasons[2].CodeDescr});
                            me.finalselectedcodes.push(me.getViewModel().data.record.data.reasons[2].CodeValue)
                        }
                    }


                    me.getView().down("#itemidprovidertypeaheadbox").setValue(me.getViewModel().data.record.data.ncpdpid);
                    me.getView().down("#itemidprovidertypeaheadbox").setRawValue(me.getViewModel().data.record.data.ncpdpid + ' ' + me.getViewModel().data.record.data.pharmacyName);
                    me.getView().down("#itemidprescribertypeahead").setValue(me.getViewModel().data.record.data.npi);
                    me.getView().down("#itemidprescribertypeahead").setRawValue(me.getViewModel().data.record.data.npi + ' ' + me.getViewModel().data.record.data.ProviderName);
                    me.getView().down("#itemidmembertypeaheadbox").setValue(me.getViewModel().data.record.data.RecipientId);
                    me.getView().down("#itemidmembertypeaheadbox").setRawValue(me.getViewModel().data.record.data.RecipientId + ' ' +me.getViewModel().data.record.data.MemberName);
                    /* me.getView().lookup('plangrouptypeaheadbox').hide();
                     me.getView().lookup('refplangroup').show();*/



                    // resolvedFirstCall

                    me.getViewModel().set('case',me.getViewModel().data.record.data.CaseNum);
                    me.getViewModel().set('time', me.getViewModel().data.record.data.callDateTime.substring(me.getViewModel().data.record.data.callDateTime.indexOf(" ")+1,(me.getViewModel().data.record.data.callDateTime.indexOf(" ")+6)));
                    me.getViewModel().set('date', me.getViewModel().data.record.data.callDateTime.substring(0,  me.getViewModel().data.record.data.callDateTime.indexOf(" ")));
                    var lastupdatedtime =Ext.Date.format(new Date(me.getViewModel().data.record.data.callDateTime), 'm/d/Y H:i:s');
                    me.getViewModel().set('callDateTimedatetime',lastupdatedtime);
                    me.getView().lookup("viewNotesButton").setDisabled(false);
                    me.getView().lookup("printbutton").setDisabled(false);
                    me.getView().lookup("addbutton").hide();
                    if (IsAuthFromOldModule == true || IsAuthFromOldModule == 'true') {
                        me.getView().lookup("updatebutton").hide();
                        me.getView().lookup("addNotesButton").setDisabled(true);
                    }
                    else {
                        me.getView().lookup("updatebutton").show();
                        me.getView().lookup("addNotesButton").setDisabled(false);
                    }
                    me.getView().lookup("contactlogshowDescription").show();

                    me.getView().lookup("contactlogcallerLastName").setValue(me.getViewModel().data.record.data.callerLastName);
                    me.getView().lookup("contactlogcallerFirstName").setValue(me.getViewModel().data.record.data.callerFirstName);
                    me.getView().lookup("contactlogcallerPhone").setValue(me.getViewModel().data.record.data.callerPhone);
                    me.getView().lookup("contactlogsubject").setValue(me.getViewModel().data.record.data.subject);
                    me.getView().lookup("contactlogdescription").setValue(me.getViewModel().data.record.data.description);

                    me.getViewModel().set('createdby', me.getViewModel().data.record.data.CreateUser);
                    me.getView().lookup("lastmodifiedby").setValue(me.getViewModel().data.record.data.LastModifiedBy);

                    //debugger;
                    if(me.getViewModel().data.record.data.oldformatupdatedDatetime)
                        me.getView().lookup("on").setValue(Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(Ext.util.Format.date(me.getViewModel().data.record.data.oldformatupdatedDatetime,'m/d/Y  h:i:s A'),'m/d/Y  h:i:s A'));
                    else
                        me.getView().lookup("on").setValue(Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(Ext.util.Format.date(me.getViewModel().data.record.data.oldformatLastModified,'m/d/Y  h:i:s A'),'m/d/Y  h:i:s A'));



                    var currentdate = new Date();
                    var comparedate = new Date(Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(me.getViewModel().data.record.data.callDateTime, 'm/d/Y  h:i:s A'));

                    var date = currentdate.getDate().toString().length==1?"0"+ currentdate.getDate().toString():currentdate.getDate().toString();
                    var month = currentdate.getMonth().toString().length==1?"0"+ currentdate.getMonth().toString():currentdate.getMonth().toString();

                    var cpcurrentdate =currentdate.getFullYear().toString()+ month+date;

                    var date = comparedate.getDate().toString().length==1?"0"+ comparedate.getDate().toString():comparedate.getDate().toString();
                    var month = comparedate.getMonth().toString().length==1?"0"+ comparedate.getMonth().toString():comparedate.getMonth().toString();

                    var cpcomparedate = comparedate.getFullYear().toString()+ month+ date;
                    if ((cpcurrentdate ==  cpcomparedate) && (me.getViewModel().data.record.data.CreateUser==user.un)) {
                        me.getView().lookup("contactlogsubject").setDisabled(false);
                        me.getView().lookup("contactlogdescription").setReadOnly(false);
                    }else{
                        me.getView().lookup("contactlogsubject").setDisabled(true);
                        me.getView().lookup("contactlogdescription").setReadOnly(true);
                    }

                    me.getView().lookup("contactlogTransactionID").setValue(me.getViewModel().data.record.data.TransactionID);
                    me.getView().lookup("contactlogMTMId").setValue(me.getViewModel().data.record.data.MTMId);
                    me.getView().lookup("contactlogAuthID").setValue(me.getViewModel().data.record.data.AuthID);
                    me.getView().lookup("assignto").setValue(me.getViewModel().data.record.data.updatedBy);
                    me.getView().lookup("contactlogtype").setValue(me.getViewModel().data.record.data.contactType);
                    // me.getView().lookup("contactlogtype").setValue(me.getViewModel().data.record.data.ContactTypeInfo);
                    me.getView().lookup("contactlogstatus").setValue(me.getViewModel().data.record.data.callStatus);


                    var record ={data:{userName:me.getViewModel().data.record.data.updatedBy}};
                    me.getUserGroup({},record);

                }else{

                    me.getViewModel().set('case',0);
                    var  date = new Date();
                    var formatedDate = me.getShortDate(date);
                    vm.set('date', formatedDate);
                    var min = date.getMinutes();

                    if(min.toString().length ==1)
                        min = '0'+min;
                    me.getViewModel().set('time', date.getHours() + ':' + min);
                    me.getView().lookup("addNotesButton").setDisabled(true);
                    me.getView().lookup("viewNotesButton").setDisabled(true);
                    me.getView().lookup("printbutton").setDisabled(true);
                    me.getView().lookup("assignto").setValue(user.un);
                    me.getView().lookup("contactlogtype").setValue("P");
                    me.getViewModel().set('createdby', user.un);
                    me.getView().lookup("addbutton").show();
                    me.getView().lookup("updatebutton").hide();
                    me.getView().lookup('plangrouptypeaheadbox').show();
                    me.getView().lookup('refplangroup').hide();

                    me.getView().lookup("contactlogstatus").setValue("O");
                    var record ={data:{userName:user.un}};

                    me.getUserGroup({},record);

                    if(me.getView().down("#itemidmembertypeaheadbox").getValue() && (me.getView().down("#itemidmembertypeaheadbox").getValue().trim()!="0")) {

                        vm.set('isAdvancefilter',true);

                        var rep = {
                            lastSelection: [{
                                data: {
                                    recipientID: me.getView().down("#itemidmembertypeaheadbox").value,
                                    MemberName: "",
                                    isAdvance:false,
                                    planid:0,
                                    planname : ""
                                }
                            }]
                        }
                        me.setMemberInfo(rep);
                    }
                }

                var masterarray = [];
                for(var i = 0; i < masterrecord.length; i++ ) {
                    if(masterrecord[i].get('charString') === 'yes|ContactLog') {
                        masterarray.push(masterrecord[i].data)
                    }
                }

                //masterarray.sort(me.sort_by('ListDescription', false, function(a){return a.toUpperCase()}));

                for(var i = 0; i < masterarray.length; i++ ) {

                    receivedForm.add({
                        boxLabel: masterarray[i].ListDescription,
                        name: 'from',
                        width:200,
                        inputValue: masterarray[i].ListItem,
                        itemId: 'from' + i
                    });

                    if(i==0)
                        me.loadCheckBoxes('GC');
                }
            }

        });
        this.getView().lookup('defaulteditbbar').hide();
    },

    sort_by : function(field, reverse, primer){

        var key = primer ?
            function(x) {return primer(x[field])} :
            function(x) {return x[field]};

        reverse = !reverse ? 1 : -1;

        return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
        }
    },

    setplangroupInfo:function (planinfo, b,c,d) {

        var me=this,
            view=this.getView(),
            vm = this.getView().items.items[0].getViewModel();

        me.lookup('plangrouptypeaheadbox').setValue(me.getView().lookup('refplangroup').getValue());
        me.lookup('plangrouptypeaheadbox').setRawValue(me.getView().lookup('refplangroup').getValue());
    },


    setMemberInfo :function (member,b,c,d) {
        var me=this,
            view=this.getView(),
            vm = this.getView().items.items[0].getViewModel();

        vm.set('isdirect',true);

        if(!member.lastSelection[0].data.isAdvance){
            if(!vm.get('isAdvancefilter')) {
                member.setValue(member.lastSelection[0].data.recipientID + ' ' + member.lastSelection[0].data.MemberName);
                member.setRawValue(member.lastSelection[0].data.recipientID + ' ' + member.lastSelection[0].data.MemberName);
            }
            member.lastSelection[0].data.isAdvance =false;
            member.lastSelection[0].data.planid =0;
            member.lastSelection[0].data.planname ='';
            vm.set('isdirect',false);
            vm.set('isAdvancefilter',false);
        }

        if(member.lastSelection[0].data.recipientID.toString().trim()==0)
            return;

        var memberplanstore = vm.getStore('memberplanstore');
        memberplanstore.getProxy().setExtraParam('pRecipientId',member.lastSelection[0].data.recipientID.toString().split(' ')[0]);
        memberplanstore.load({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objResp1 = Ext.decode(operation.getResponse().responseText);
                if (objResp1.message[0].code == 0) {
                    if(record.length==0)
                        return false;

                    if(record[0].data){



                        if(vm.get('isdirect'))
                        {

                            me.lookup('plangrouptypeaheadbox').setValue(member.lastSelection[0].data.planid);
                            me.lookup('plangrouptypeaheadbox').setRawValue(member.lastSelection[0].data.planid);
                            me.getView().lookup('refplangroup').setValue(member.lastSelection[0].data.planid);

                            // me.getView().lookup('refplangroup').setRawValue(member.lastSelection[0].data.planname);
                        }
                        else{
                            if(vm.getStore('memberplanstore').data.items.length!=0)
                            {
                                me.lookup('plangrouptypeaheadbox').setValue(vm.getStore('memberplanstore').data.items[0].data.planGroupId);
                                me.lookup('plangrouptypeaheadbox').setRawValue(vm.getStore('memberplanstore').data.items[0].data.planGroupId);
                            }
                            if(vm.getStore('memberplanstore').data.items.length==1)
                                me.getView().lookup('refplangroup').setValue(vm.getStore('memberplanstore').data.items[0].data.planGroupId);
                        }

                        me.getView().lookup('refplangroup').show();
                        me.getView().lookup('plangrouptypeaheadbox').hide();
                    }

                }
            }
        });
    },


    timeFormatChange: function (val,me) {
        try{
            var hour = "";
            var min = "";
            var sec = "";
            var index = val.toString().indexOf("T")+1;
            val= val.toString().substring(index,index+5);
            return val;
        }catch (e){
            return  Ext.Date.format(new Date(), 'm/d/Y')
        }
    },

    loadCheckBoxes: function(loadcategory) {
        var vm = this.getView().items.items[0].getViewModel(),
            me=this,
            maxReached = vm.get('maxReached'),
            contactcodestore = vm.getStore('contactcodelist'),
            pnlcontactlog = this.getView().lookup('pnlcontactlog'),
            // checkboxGroup = this.getView().lookup('contactcodecard'),
            controller = this,
            view = this.getView();
        view.mask('Loading Data....');
        contactcodestore.getProxy().setExtraParam('ipcCategory',loadcategory);
        contactcodestore.getProxy().setExtraParam('pShowAll',true);
        if(loadcategory=="GC")
            contactcodestore.getProxy().setExtraParam('iplGetGeneral',false);
        else
            contactcodestore.getProxy().setExtraParam('iplGetGeneral',true);

        contactcodestore.load({
            callback:function (records, two, tree) {
                pnlcontactlog.removeAll();
                var tempcontact = [];
                records.forEach(function (val,index) {
                    if (val.data.ACTIVE == true) {
                        var chkstatus = false;
                        me.finalselectedcodes.forEach(function (valselcode,index) {
                            if(valselcode==val.data.ReasonCode)
                                chkstatus =true;

                        })


                        var tempObj = {
                            boxLabel: val.data.DESCRIPTION,
                            inputValue: val.data.ReasonCode,
                            ReasonCode: val.data.ReasonCode,
                            checked:chkstatus
                        };
                        tempcontact.push(tempObj);
                    }
                });

                var  myCheckboxGroup = new Ext.form.CheckboxGroup({
                    xtype: 'checkboxgroup',
                    itemId:'chkcontactcodecard',
                    items: tempcontact,
                    reference:'contactcodecard',

                    height:400,
                    columns: 1,
                    listeners:{
                        change:'onContactCodeCheck'
                    }
                });
                pnlcontactlog.add(myCheckboxGroup);
                view.unmask();
            }
        });
    },
    onReceivedFormChange: function(me, radio) {
        this.loadCheckBoxes(radio.from);
    },

    onreasonselect :function (button) {


        var me = this,
            view = this.getView().items.items[0],
            user = Ext.first('viewport').getViewModel().get('user'),
            vm =  this.getView().items.items[0].getViewModel();

        if(button.reference === 'reason1'){
            me.finalselectedreasons.push( { reason:  button.lastSelection[0].data.ContactCode +' '+  button.lastSelection[0].data.ContactCodeDesc});
            me.finalselectedcodes.push( button.lastSelection[0].data.ContactCode)
        }else  if(button.reference === 'reason2'){
            me.finalselectedreasons.push({ reason:    button.lastSelection[0].data.ContactCode +' '+  button.lastSelection[0].data.ContactCodeDesc});
            me.finalselectedcodes.push( button.lastSelection[0].data.ContactCode)
        } else if(button.reference === 'reason3'){
            me.finalselectedreasons.push({ reason:    button.lastSelection[0].data.ContactCode +' '+  button.lastSelection[0].data.ContactCodeDesc});
            me.finalselectedcodes.push( button.lastSelection[0].data.ContactCode)
        }

        //me.setUncheckedCheckBoxGroup();
    },

    onkeyup :function (a,b,c) {

        var me = this,
            view = this.getView(),
            indexreason =-1;


        if(a.reference =="reason1")
        {
            if(!a.getValue())
                indexreason =0;
        }else  if(a.reference =="reason2")
        {
            if(!a.getValue())
                indexreason =1;
        }else  if(a.reference =="reason3")
        {
            if(!a.getValue())
                indexreason =2;
        }

        if(indexreason==-1)
            return;


        me.finalselectedreasons.splice(indexreason, 1);

        me.setReasonValue();


        me.setUncheckedCheckBoxGroup();
        me.finalselectedcodes =[];
        me.finalselectedreasons.forEach(function (newcolvalue, newindex) {
            me.finalselectedcodes.push(newcolvalue.reason.split(' ')[0])
        });

    },

    setReasonValue:function () {
        var me = this,
            view = this.getView();

        for(var indexreason=0; indexreason < 3; indexreason++){
            var reasonbox = view.lookup("reason"+ (indexreason+1));
            reasonbox.setValue("");
            reasonbox.setRawValue("");
        }

        me.finalselectedreasons.forEach(function (newcolvalue, newindex) {
            var reasonbox = view.lookup("reason"+ (newindex+1));
            reasonbox.setValue(newcolvalue.reason);
            reasonbox.setRawValue(newcolvalue.reason);
        });
    },

    matchReasonCode : function (matchArr,matchWord) {
        var isexist =false;
        matchArr.forEach(function (val,index) {
            if(val.reason==matchWord)
                isexist = true;
        })

        return isexist;
    },

    matchNotCode : function (matchArr,matchWord) {
        var reasondesc ='';
        matchArr.forEach(function (val,index) {
            if(val==matchWord)
                reasondesc = val;
        })

        return reasondesc;
    },

    getReasonCode: function (checkboxgroup,reasoncode) {

        var reasondesc ='';
        for(i=0; i < checkboxgroup.items.items.length; i ++) {
            var checkbox = checkboxgroup.items.items[i];
            if(reasoncode==checkbox.ReasonCode)
                reasondesc = checkbox.boxLabel;
        }

        return reasondesc;
    },

    onContactCodeCheck: function(checkboxgroup , newValue , oldValue ) {

        var me = this,
            view = this.getView(),
            newVal = newValue[Object.keys(newValue)[0]],
            oldVal = oldValue[Object.keys(oldValue)[0]],
            newValArr=[],
            oldValArr=[],
            minusArr=[],
            vm =  this.getView().items.items[0].getViewModel();



        if(!this.finalselectedreasons)
            this.finalselectedreasons =[];


        if(!Array.isArray(newValue[Object.keys(newValue)[0]]))
        {
            if(newValue[Object.keys(newValue)[0]])
                newValArr.push(newValue[Object.keys(newValue)[0]]);
        }else{
            newValue[Object.keys(newValue)[0]].forEach(function (newarrvalue, newindex) {
                newValArr.push(newarrvalue);
            });
        }

        if(!Array.isArray(oldValue[Object.keys(oldValue)[0]]))
        {
            if(oldValue[Object.keys(oldValue)[0]])
                oldValArr.push(oldValue[Object.keys(oldValue)[0]]);
        }else{
            oldValue[Object.keys(oldValue)[0]].forEach(function (oldarrvalue, newindex) {
                oldValArr.push(oldarrvalue);
            });
        }


        if(newValArr.length > 0 ||  oldValArr.length > 0)
        {

            if (oldValArr.length > newValArr.length) {

                oldValArr.forEach(function (newvalue, newindex) {
                    var desc = me.getReasonCode(checkboxgroup,newvalue);
                    var isnotexistval = me.matchNotCode( newValArr,newvalue);

                    if(!isnotexistval)
                    {

                        var matchingkey =   newvalue + ' ' + desc;
                        var matchingindex =0;
                        me.finalselectedreasons.forEach(function (val,findselindex) {
                            if(val.reason==matchingkey)
                                matchingindex =findselindex;
                        });
                        me.finalselectedreasons.splice(matchingindex, 1);
                        me.finalselectedcodes.splice(newvalue, 1);
                    }
                });
            }

            if(this.finalselectedreasons.length >= 3)
            {
                Ext.MessageBox.alert('Information', 'You can select maximum 3 contract codes');
                me.setUncheckedCheckBoxGroup();
                return false;
            }


            if (oldValArr.length < newValArr.length) {
                newValArr.forEach(function (newvalue, newindex) {
                    var desc = me.getReasonCode(checkboxgroup,newvalue);
                    if(!me.matchReasonCode(me.finalselectedreasons,newvalue + ' ' + desc))
                    {
                        me.finalselectedreasons.push({reason: newvalue + ' ' + desc});
                        me.finalselectedcodes.push(newvalue);
                    }
                });
            }

            me.setReasonValue();
        }
    },

    getShortDate: function(date) {
        var month = (date.getMonth() + 1);
        var pdate = date.getDate();
        if(month.toString().length ==1)
            month = '0'+month;
        if(pdate.toString().length ==1)
            pdate = '0'+pdate;

        return  month + '/' +  pdate + '/' +  date.getFullYear();
    },

    disableCheckBoxGroup: function(checkboxgroup) {
        // for(i=0; i < checkboxgroup.items.items.length; i ++) {
        //     var checkbox = checkboxgroup.items.items[i];
        //     if(checkbox.checked === false) {
        //         checkbox.setDisabled(true);
        //     }
        // }
    },
    enableCheckBoxGroup: function(checkboxgroup) {
        // for(i=0; i < checkboxgroup.items.items.length; i ++) {
        //     var checkbox = checkboxgroup.items.items[i];
        //     checkbox.setDisabled(false);
        // }
    },



    setUncheckedCheckBoxGroup: function(checkboxgroup) {
        var me = this;
        var receivedForm = me.getView().lookupReference('receiveForm');
        var receivedval =Object.keys(receivedForm.getValue());
        if(receivedval.length==0)
            receivedval ="GC";
        else
            receivedval =receivedForm.getValue().from;

        me.loadCheckBoxes(receivedval);
    },

    saveContactLog: function () {

        var me = this,
            view = this.getView().items.items[0],
            user = Ext.first('viewport').getViewModel().get('user'),
            vm = view.getViewModel(),
            planinfo = this.getView().lookup('plangrouptypeaheadbox').getValue(),
            MTMId = this.getView().lookup('contactlogMTMId').getValue(),
            form = me.lookupReference('callerform'),
            record = form.getValues(),
            fieldList, fields;

        var ttContactReasonCode ={};
        ttContactReasonCode.ttContactReasonCode=[];

        if(this.getView().lookup('reason1').getValue())
        {
            ttContactReasonCode.ttContactReasonCode.push({
                "CodeType": 'Reason1',
                "codeValue": this.getView().lookup('reason1').getValue().split(' ')[0]
            });
        }

        if(this.getView().lookup('reason2').getValue())
        {
            ttContactReasonCode.ttContactReasonCode.push({
                "CodeType": 'Reason2',
                "codeValue": this.getView().lookup('reason2').getValue().split(' ')[0]
            });
        }

        if(this.getView().lookup('reason3').getValue())
        {
            ttContactReasonCode.ttContactReasonCode.push({
                "CodeType": 'Reason3',
                "codeValue": this.getView().lookup('reason3').getValue().split(' ')[0]
            });
        }


        var prescriber='',pharmacy='',member='';
        if(me.getView().down("#itemidprescribertypeahead").getValue())
        {
            prescriber = me.getView().down("#itemidprescribertypeahead").getValue().split(' ')[0];
        }

        if(me.getView().down("#itemidprovidertypeaheadbox").getValue())
        {
            pharmacy = me.getView().down("#itemidprovidertypeaheadbox").getValue().split(' ')[0];
        }

        if(me.getView().down("#itemidmembertypeaheadbox").getValue())
        {
            member = me.getView().down("#itemidmembertypeaheadbox").getValue().split(' ')[0];
        }


        if(!planinfo)
        {
            Ext.MessageBox.alert('Error', ' Please Select a Plan Group');
            return;
        }

        var phonenumber =me.lookupReference("contactlogcallerPhone").getValue();
        if(!phonenumber)
            phonenumber ='';

        if(this.getView().down("#lblcase").getValue()!='0')
        {
            fieldList = "callerFirstname,callerLastName,callerPhone,subject,description,callStatus,contactType,oldContactUser,contactUser,updatedBy,npi," +
                "ncpdpid,recipientID,authID,transactionID,MTMId,LastModifiedUser,resolvedFirstCall,planGroupId,updatedDatetime";

            fields = me.lookupReference("contactlogcallerFirstName").getValue() +'|' + me.lookupReference("contactlogcallerLastName").getValue()  +'|' + phonenumber  +'|' +  me.lookupReference("contactlogsubject").getValue() +'|'
                + me.lookupReference("contactlogdescription").getValue()  +
                '|' + me.lookupReference("contactlogstatus").getValue() +'|' +  me.lookupReference("contactlogtype").getValue() +'|' + me.getViewModel().data.record.data.oldContactUser+'|' + me.lookupReference("assignto").getValue() +'|' + user.un +
                '|' + ( prescriber? prescriber:'') +'|' + (pharmacy? pharmacy:'') +'|' + (member? member:0) +'|' +  ( me.lookupReference("contactlogAuthID").getValue()?  me.lookupReference("contactlogAuthID").getValue():0) +'|' +
                (me.lookupReference("contactlogTransactionID").getValue()? me.lookupReference("contactlogTransactionID").getValue():0)  +'|' +  MTMId + '|' +  user.un + '|' +  this.getView().lookup('resolvedFirstCall').getValue() + '|' + planinfo+ '|'+ Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s');
        }
        else {
            fieldList = "callerFirstname,callerLastName,callerPhone,subject,description,callStatus,contactType,oldContactUser,contactUser,updatedBy,callDateTime,npi," +
                "ncpdpid,recipientID,authID,transactionID,MTMId,LastModifiedUser,resolvedFirstCall,planGroupId,updatedDatetime";

            fields = me.lookupReference("contactlogcallerFirstName").getValue() +'|' +  me.lookupReference("contactlogcallerLastName").getValue() +'|' +  phonenumber+'|' + me.lookupReference("contactlogsubject").getValue() +'|'
                + me.lookupReference("contactlogdescription").getValue() +
                '|' +  me.lookupReference("contactlogstatus").getValue() +'|' + me.lookupReference("contactlogtype").getValue() +'|' + user.un +'|' + me.lookupReference("assignto").getValue() +'|' +  user.un +
                '|' + Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s') +'|' + (prescriber?prescriber:'')  +'|' + (pharmacy?pharmacy:'')+'|' + (member?member:0) +'|' +  (me.lookupReference("contactlogAuthID").getValue()? me.lookupReference("contactlogAuthID").getValue():0)  +'|' +
                (me.lookupReference("contactlogTransactionID").getValue()? me.lookupReference("contactlogTransactionID").getValue():0) +'|' +  MTMId + '|' + user.un  + '|' +  this.getView().lookup('resolvedFirstCall').getValue() + '|' + planinfo + '|' + Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y H:i:s');
        }


        var newFields = fields.replace(/undefined/gi, '');
        var contactlogmodel =  Ext.create('Atlas.common.model.ContactLogData');
        contactlogmodel.phantom = false;
        contactlogmodel.getProxy().setExtraParam('pKeyValue',this.getView().down("#lblcase").getValue());
        contactlogmodel.getProxy().setExtraParam('pKeyType', 'CaseNum');
        contactlogmodel.getProxy().setExtraParam('pFieldList', fieldList);
        contactlogmodel.getProxy().setExtraParam('pFields', newFields);
        contactlogmodel.getProxy().setExtraParam('ttContactReasonCode',ttContactReasonCode);
        contactlogmodel.save({
            callback:function(record, operation, response) {
                Ext.MessageBox.alert('Success', ' Contact log successfully saved!');

                var controller;
                /* if(vm.get('forminfo').page=="home")
                 controller = Ext.create('Atlas.home.xclassview.ContactLogAlertController');
                 else
                 controller = Ext.create('Atlas.common.view.sharedviews.ContactLogController');*/

                me.fireEvent('contactloggridrefresh');

                me.onCancelClick();
            }
        });
    },

    getMemberPlanGroup:function () {


        var me = this,
            vm = this.getView().items.items[0].getViewModel();

        var planid ='';

        if(vm.get('forminfo').page=="MMR")
            planid = vm.get('forminfo').plankeyvalue;
        else
            planid = this.getViewModel().data.record.data.planGroupId;



        var storegetUserDetailList =vm.getStore('storegetUserDetailList');
        storegetUserDetailList.getProxy().setExtraParam('pBuffer',"planGroup");
        storegetUserDetailList.getProxy().setExtraParam('pWhere',"planGroupId = '" + planid + "' ");
        storegetUserDetailList.getProxy().setExtraParam('pField',"planGroupName");
        storegetUserDetailList.getProxy().setExtraParam('pOrderBy','');
        storegetUserDetailList.getProxy().setExtraParam('pAscDesc','');
        storegetUserDetailList.load( {
            scope: this,
            failure: function (record1, operation1) {
            },
            success: function (record1, operation1) {
            },
            callback: function (record1, operation1, success1) {
                var objResp1 = Ext.decode(operation1.getResponse().responseText);
                if (objResp1.message[0].code == 0) {


                    if(planid)
                    {
                        me.getView().lookup('plangrouptypeaheadbox').setValue(planid);
                        me.getView().lookup('plangrouptypeaheadbox').setRawValue(planid);

                        if(me.getView().down("#itemidmembertypeaheadbox").getValue().split(' ')[0] && (me.getView().down("#itemidmembertypeaheadbox").getValue().trim()!="0")) {
                            var rep = {
                                lastSelection: [{
                                    data: {
                                        recipientID: me.getView().down("#itemidmembertypeaheadbox").value,
                                        MemberName: "",
                                        isAdvance:true,
                                        planid:planid,
                                        planname : objResp1.data[0].planGroupName
                                    }
                                }]
                            }

                            /* me.getView().lookup('plangrouptypeaheadbox').hide();
                             me.getView().lookup('refplangroup').show();*/
                            me.setMemberInfo(rep);
                        }else{
                            /*var memberplanstore = vm.getStore('memberplanstore');
                             memberplanstore.insert(0,{planGroupName:objResp1.data[0].planGroupName,planGroupId:planid, planGroupCode:objResp1.data[0].planGroupCode});
                             me.getView().lookup('refplangroup').setValue(planid);
                             me.getView().lookup('refplangroup').setRawValue(objResp1.data[0].planGroupCode);*/
                            me.getView().lookup('plangrouptypeaheadbox').show();
                            me.getView().lookup('refplangroup').hide();
                        }
                    }

                }
            }
        });
    },

    getUserGroup:function (username,record) {


        var me = this,
            vm = this.getView().items.items[0].getViewModel();

        var storegetUserDetailList =vm.getStore('storegetUserDetailList');
        storegetUserDetailList.getProxy().setExtraParam('pBuffer',"userMaster");
        storegetUserDetailList.getProxy().setExtraParam('pWhere',"UserName = '" + record.data.userName + "' ");
        storegetUserDetailList.getProxy().setExtraParam('pField',"groupId");
        storegetUserDetailList.getProxy().setExtraParam('pOrderBy','');
        storegetUserDetailList.getProxy().setExtraParam('pAscDesc','');
        storegetUserDetailList.load( {
            scope: this,
            failure: function (record1, operation1) {
            },
            success: function (record1, operation1) {
            },
            callback: function (record1, operation1, success1) {
                var objResp1 = Ext.decode(operation1.getResponse().responseText);
                if (objResp1.message[0].code == 0) {


                    var storegetGroupDetailList =vm.getStore('storegetUserDetailList');
                    storegetGroupDetailList.removeAll();
                    storegetGroupDetailList.getProxy().setExtraParam('pBuffer',"userGroups");
                    storegetGroupDetailList.getProxy().setExtraParam('pWhere',"groupId = '" + objResp1.data[0].groupId+ "' ");
                    storegetGroupDetailList.getProxy().setExtraParam('pField',"groupName");
                    storegetGroupDetailList.getProxy().setExtraParam('pOrderBy','');
                    storegetGroupDetailList.getProxy().setExtraParam('pAscDesc','');
                    storegetGroupDetailList.load( {
                        scope: this,
                        failure: function (record1, operation1) {
                        },
                        success: function (record1, operation1) {
                        },
                        callback: function (record1, operation1, success1) {
                            var objResp1 = Ext.decode(operation1.getResponse().responseText);
                            if (objResp1.message[0].code == 0) {
                                if(me.getView())
                                {
                                    me.getView().lookup("assigntogroup").setValue(objResp1.data[0].groupName);
                                    if(vm.get('forminfo').action=='edit')
                                        me.getView().lookup("assignto").setValue(me.getViewModel().data.record.data.contactUser);
                                    else
                                        me.getView().lookup("assignto").setValue(record.data.userName);
                                    me.getMemberPlanGroup();
                                }


                            }
                        }
                    });

                }
            }
        });
    },

    onCancelClick: function () {

        var window = this.getView();
        this.editor = Ext.destroy(window);
    },
    launchNotesDialog: function(button) {
        var that = this,
            vm = that.getViewModel(),
            notesModel = Ext.create('Atlas.common.model.Notes',{});


        notesModel.getProxy().setExtraParam('pParentSystemID',that.getViewModel().data.record.data.systemID);
        notesModel.load({
            success:function(record,operation)
            {
            },
            callback:function(record,operation)
            {
                that.windowNotes(button);
                if(button.reference === 'viewNotesButton')
                {
                    var response = Ext.decode(operation.getResponse().responseText);
                    var noteboxValue ='';
                    for(var i = 0; i < response.data.length; i++){
                        var data = response.data[i],
                            time = data.CreateTime,
                            idxFirstColon = time.indexOf(':'),
                            hours = time.slice(0, idxFirstColon),
                            dateTime;

                        if ((time.slice(0, (time.length - 2)) === 'pm') && (hours !== '12')){
                            time = (parseInt(hours) + 12).toString() + time.slice(idxFirstColon, (time.length - 2));
                        }

                        dateTime = data.CreateDate + ' ' + time.slice(0, (time.length - 2));

                        noteboxValue =data.CreateUser+' ('+ Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(dateTime,'m/d/Y g:i:s A') + ')' + '\n'+  that.getView().lookup("contactlogsubject").getValue()+'\n'+' '+data.Note  + '\n' + noteboxValue+ '\n\n';
                    }
                    that.lookup('notebox').setValue(noteboxValue);
                    that.lookup('notebox').setReadOnly (true);
                }
            }
        });
    },

    windowNotes:function (button) {

        var that = this,
            vm = that.getViewModel(),
            view = that.getView(),
            form = that.lookup('callerform'),
            window = Ext.create('Ext.window.Window', {
                width: 355,
                height: 500,
                title:that.showTitleOfNotes(button),
                items:[{
                    xtype: 'panel',
                    viewModel:{
                        data:{
                            formValues:form.getForm().getValues()
                        }
                    },
                    items:[
                        {
                            xtype:'displayfield',
                            fieldLabel:that.showTextAreaLabel(button)
                        },
                        {
                            xtype:'textarea',
                            reference:'notebox',
                            allowBlank:false,
                            width: 330,
                            height: 400,
                            fieldLabel:''

                        }],
                    dockedItems:[{
                        xtype: 'toolbar',
                        dock:'bottom',
                        items:['->',{
                            text:'Save',
                            iconCls: 'fa fa-plus',
                            hidden: that.showSaveButton(button),
                            listeners: {
                                click: function (form) {

                                    var view = form.up().up(),
                                        vm = view.getViewModel(),
                                        formVals = vm.getData().formValues,
                                        note = form.up().up().items.items[1].lastValue,
                                        serverTime = Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(Atlas.common.utility.Utilities.getLocalDateTime(), 'G:i:s'),
                                        arrServerTime = serverTime.split(':'),
                                        user = Ext.first('viewport').getViewModel().get('user'),
                                        fields = 'CreateUser,CreateDate,CreateTime,Subject,Note,ParentSystemID',
                                        fieldvals = user.un+'|'+Atlas.common.utility.Utilities.FixDateoffsetToMatchServer(Atlas.common.utility.Utilities.getLocalDateTime(), 'm/d/Y')+'|' + ((parseInt(arrServerTime[0]) * 3600) + (parseInt(arrServerTime[1]) * 60) + parseInt(arrServerTime[2])) + '|'+'|'+note+'|'+vm.data.record.data.systemID;

                                    if(!note)
                                        return;

                                    var saveAction = [{
                                        "Save": {"key": '', "value": ''}
                                    }];
                                    var extraParameters = {
                                        psystemId: "0",
                                        pMode: 'A',
                                        pFieldList :fields,
                                        pFields :fieldvals
                                    };
                                    var savenotes = Atlas.common.utility.Utilities.saveData([{}], 'shared/rx/notes/update', null, [false], extraParameters,
                                        saveAction,  ['pDocumentID']);

                                    if (savenotes.code == 0) {
                                        window.close();
                                    }
                                }
                            }
                        },{
                            text:'Close',
                            iconCls: 'fa fa-times',
                            listeners: {
                                click: function (form) {
                                    window.close();
                                }
                            }
                        }]
                    }]
                }]
            },this);
        view.add(window).show();
    },

    showDescription: function(button){

        var that = this,
            vm = that.getViewModel(),
            view = that.getView(),
            form = that.lookup('callerform');
        //button.reference = 'contactlogshowDescription';
        that.windowNotes(button);
        that.lookup('notebox').setValue(vm.data.record.data.description);
        that.lookup('notebox').setReadOnly(true);
    },

    showSaveButton: function(button) {
        if(button.reference === 'viewNotesButton'){
            return true;
        }else if(button.reference === 'contactlogshowDescription'){
            return true;
        }
        else{
            return false;
        }
    },

    showTitleOfNotes: function(button) {
        if(button.reference === 'viewNotesButton'){
            return "View Notes";
        }else if(button.reference === 'contactlogshowDescription'){
            return "Contact Log Description";
        }else{
            return "Add Notes";
        }
    },

    showTextAreaLabel: function(button) {
        if(button.reference === 'viewNotesButton'){
            return "Notes";
        }else if(button.reference === 'contactlogshowDescription'){
            return "";
        }else{
            return "Notes";
        }
    },

    printbuttonContactLog:function () {

        var that = this,
            vm = that.getViewModel();

        var storeSubmitJob =  Ext.create('Atlas.pharmacy.model.SubmitJob');
        storeSubmitJob.getProxy().setExtraParam('pDescription', "PrintContactLog");
        storeSubmitJob.getProxy().setExtraParam('pProgramName', "printContactNotes.p");
        storeSubmitJob.getProxy().setExtraParam('pParameters', vm.data.record.data.CaseNum+ "|1");
        storeSubmitJob.getProxy().setExtraParam('pRunMode', 1);
        storeSubmitJob.getProxy().setExtraParam('pProgramType', "PrintContactLog");
        storeSubmitJob.getProxy().setExtraParam('pSaveDocument', false);
        storeSubmitJob.getProxy().setExtraParam('pFaxNumber', '');
        storeSubmitJob.phantom = false;
        storeSubmitJob.save({
            scope: this,
            failure: function (record, operation) {
            },
            success: function (record, operation) {
            },
            callback: function (record, operation, success) {
                var objResp = Ext.decode(operation.getResponse().responseText);
                if (objResp.message[0].code == 0) {
                    Atlas.common.utility.Utilities.displayDocument('pdf', objResp.metadata.pData);
                }
            }
        });
    },

    redirectPage:function (a,b,c,d,e) {

        var me = this;
        if(a.reference=="redirectPrescriber")  {
            if(me.getView().down("#itemidprescribertypeahead").getValue())
                this.routeTo(me.getView().down("#itemidprescribertypeahead").getValue().split(' ')[0],'merlin/prescriber/PrescriberToolbar');
        }else if(a.reference=="redirectpharmacyName")  {
            if(me.getView().down("#itemidprovidertypeaheadbox").getValue())
                this.routeTo(me.getView().down("#itemidprovidertypeaheadbox").getValue().split(' ')[0],'merlin/pharmacy/Pharmacy');
        }else if(a.reference=="redirectMemberName"){
            if(me.getView().down("#itemidmembertypeaheadbox").getValue())
                this.routeTo(me.getView().down("#itemidmembertypeaheadbox").getValue().split(' ')[0],'merlin/member/MemberToolbar');
        }else if(a.reference=="redirectMTMId"){
            if(me.getView().lookup("contactlogMTMId").getValue())
                this.routeTo(me.getView().lookup("contactlogMTMId").getValue(),'merlin/casemanagement/CaseInfo');
        }else if(a.reference=="redirectAuthID"){
            if(me.getView().lookup("contactlogAuthID").getValue())
                this.routeTo(me.getView().lookup("contactlogAuthID").getValue(),'merlin/authorization/cdag_CDAGMain');
        }else if(a.reference=="redirectTransactionID"){
            if(me.getView().lookup("contactlogTransactionID").getValue())
                this.routeTo(me.getView().lookup("contactlogTransactionID").getValue(),'merlin/claims/ClaimsToolbar');
        }
    },

    routeTo: function (atlasId, route) {
        var me = this,
            menuId = Atlas.common.Util.menuIdFromRoute(route),
            viewRoute = route.split('/'),
            atlasId = atlasId;

        me.fireEvent('openView',viewRoute[0],viewRoute[1],viewRoute[2], {
            menuId: menuId,
            atlasId: atlasId,
            MTMId: atlasId,
            openView: true,
            pClaimId: atlasId,
            pClaimStatus:false
        });
    }

});
