/*
 Last Developer: Kevin Tabasan
 Origin: Merlin - Prescriber
 Date: 9/1/2016
 Description: Controller that drives most logic for the Create Prescriber page
 */

Ext.define('Atlas.prescriber.view.CreatePrescriberController', {
    extend: 'Atlas.common.view.sharedviews.editablefieldset.FieldsetController',
    alias: 'controller.createprescriber',
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

    init:function()
    {

        var vm = this.getViewModel();
        vm.set('editDisable',true);
        vm.set('destroyDisabled',true);
    },

    onPrescriberSelection: function (combo, record) {
      this.getView().down("#prescriberCombo").setValue(combo.lastSelection[0].data.npi + ' ' + combo.lastSelection[0].data.fullname);

        var vm = this.getViewModel(),
            view = this.getView(),
            editFieldset = Ext.first('button[itemId=editFieldset]'),
            deleteFieldset = Ext.first('button[itemId=deleteFieldset]'),
            fwaPrescriberCheckbox = Ext.first('checkboxfield[itemId=FWAPrescriberCheckbox]'),
            prescriberCombo = Ext.first('combo[itemId=prescriberCombo]'),
            prescribersModel = Ext.create('Atlas.common.model.Prescriber', {}),
            prescriberStore = vm.getStore('prescribStore');

        prescribersModel.getProxy().setExtraParam('pKeyValue', this.getView().down("#prescriberCombo").getValue().split(' ')[0]);

        prescribersModel.load(
            {
                scope: this,
                failure: function (record, operation) {
                    //do something if the load failed
                },
                success: function (record, operation) {


                    vm.set('masterrecord', record);
                    vm.set('editDisable',false);
                    vm.set('destroyDisabled',false);
                    if (record.getData().FWAPrescriberLockFlag == "yes") {
                        fwaPrescriberCheckbox.setValue(true);
                    }
                    else {
                        fwaPrescriberCheckbox.setValue(false);
                    }
                    var selectedvalues= [];
                    this.getView().down("#ParentFWAPrescriberLockLOBField").setValue("");
                    if(record.data.FWAPrescriberLockLOB)
                    {
                        var lineofBusiness = record.data.FWAPrescriberLockLOB.split(',');
                        Ext.Array.each(lineofBusiness, function (value) {
                            selectedvalues.push(value);
                        });
                        this.getView().down("#ParentFWAPrescriberLockLOBField").setValue(selectedvalues);
                    }

                    this.getView().down("#editFieldset").setDisabled(false);
                    this.getView().down("#deleteFieldset").setDisabled(false);
                },
                callback: function (record, operation, success) {

                }
            });

    },

    onAdd: function () {

        var vm = this.getViewModel(),
            editFieldset = Ext.first('button[itemId=editFieldset]'),
            deleteFieldset = Ext.first('button[itemId=deleteFieldset]'),
            prescriberCombo = Ext.first('combo[itemId=prescriberCombo]'),
            fieldsetModel = this.getView().Model;
        prescriberCombo.setValue('');
        vm.set('masterrecord', null);
        vm.set('fieldrecord',null);
        vm.set('editDisable',true);
        vm.set('destroyDisabled',true);
        this.createEditor(null, fieldsetModel);

        if(Ext.first('textfield[itemId=npiField]'))
        {
            Ext.first('textfield[itemId=npiField]').validator = Ext.bind(this.txtValidator, this, [ Ext.first('textfield[itemId=npiField]'), "10-digit NPI is Required","NUM",10]);
            Ext.first('textfield[itemId=lastNameField]').validator = Ext.bind(this.txtValidator, this, [ Ext.first('textfield[itemId=lastNameField]'), "Prescriber Last Name is Required",""]);
            Ext.first('textfield[itemId=firstNameField]').validator = Ext.bind(this.txtValidator, this, [Ext.first('textfield[itemId=firstNameField]'), "Prescriber First Name is Required",""]);
            Ext.first('textfield[itemId=deaField]').validator = Ext.bind(this.txtValidator, this, [Ext.first('textfield[itemId=deaField]'), "DEA is Required",""]);
        }

        if(Ext.first('form[itemId=createPrescriberEditor]'))
        {
            Ext.first('form[itemId=createPrescriberEditor]').isValid();
        }
    },

    onEdit: function () {
        var record = this.getViewModel().get('masterrecord');

        this.createEditor(record, null);
        var fwaPrescriberCheckbox = this.getView().lookup('editFwaLock');
        if (record.getData().FWAPrescriberLockFlag == "yes") {
            fwaPrescriberCheckbox.setValue(true);
        }

        Ext.first('textfield[itemId=npiField]').setDisabled(true);
        var selectedvalues = [];
        if(record.data.FWAPrescriberLockLOB)
        {
            var lineofBusiness = record.data.FWAPrescriberLockLOB.split(',');
            Ext.Array.each(lineofBusiness, function (value) {
                selectedvalues.push(value);
            });
            Ext.first('combobox[itemId=FWAPrescriberLockLOBField]').setValue(selectedvalues);
        }
    },

    onCancelClick :function () {
        var   winopen = Ext.WindowManager.getActive();
        if (winopen) {
            winopen.close();
        }
    },

    onSaveClick: function () {
        var mode = 'A';
        if(this.getViewModel().get('masterrecord'))
            mode = 'U';

        var npi = Ext.first('textfield[itemId=npiField]').value,
            lastName = Ext.first('textfield[itemId=lastNameField]').value,
            firstName = Ext.first('textfield[itemId=firstNameField]').value,
            deaNum = Ext.first('textfield[itemId=deaField]').value,
            degree = Ext.first('textfield[itemId=degreeField]').value,
            specialty = Ext.first('textfield[itemId=specialtyField]').value,
            stateLicensed = Ext.first('combo[itemId=licStateField]').value,
            fwaCheckbox = this.getView().lookup('editFwaLock').value ? 'yes':'no',
            fwaField = Ext.first('combobox[itemId=FWAPrescriberLockLOBField]').value,
            notes = Ext.first('textareafield[itemId=prescriberLockNoteField]').value,
            addressOne = Ext.first('textfield[itemId=locaddr1Field]').value,
            addressTwo = Ext.first('textfield[itemId=locaddr2Field]').value,
            city = Ext.first('textfield[itemId=loccityField]').value,
            stateLocation = Ext.first('combo[itemId=locstateField]').value,
            zipNum = Ext.first('textfield[itemId=loczipField]').value,
            phoneNum = Ext.first('textfield[itemId=locphoneField]').value,
            faxNum = Ext.first('textfield[itemId=locfaxField]').value,
            authFax = Ext.first('textfield[itemId=authFaxField]').value,
            me=this,
            pFieldList,
            recordToSave;


        if (!Ext.first('form[itemId=createPrescriberEditor]').isValid())
        {
            return;
        }

        var preBlockarray =Ext.first('combo[itemId=FWAPrescriberLockLOBField]').value;
        var preBlock=this.getView().lookup('editFwaLock').value.toString();

        var cLockLOB='';
        preBlockarray.forEach(function(item, index){
            if(!cLockLOB)
                cLockLOB = item;
            else
                cLockLOB  =  cLockLOB + "," + item;
        });

        if(preBlock.toString().toLowerCase()=="true")
            preBlock ="Yes";
        else
            preBlock ="No";

        if(!stateLocation)
            stateLocation ='';

        if(!stateLicensed)
            stateLicensed ='';

        if(!zipNum)
            zipNum ='';

        if(mode=='U') {
            recordToSave = firstName + '|' + lastName + '|' + degree + '|' + deaNum + '|' + specialty + '|' + stateLicensed + '|' + addressOne + '|' + addressTwo + '|' + city + '|' + stateLocation + '|' + zipNum + '|' + Atlas.common.Util.unformatPhone(phoneNum) + '|' + Atlas.common.Util.unformatfax(faxNum) + '|' + Atlas.common.Util.unformatfax(authFax) + '|1' + '|' + preBlock + '|' + notes + '|' + cLockLOB;
            pFieldList = 'firstname,lastname,degree,deaNum,specialty,licstate,locaddr1,locaddr2,loccity,locstate,loczip,locphone,locfax,@AuthFax,EntityType,FWAPrescriberLockFlag,prescriberLockNote,FWAPrescriberLockLOB';

        }
        else if(mode=='A') {
            recordToSave = npi + '|' + firstName + '|' + lastName + '|' + degree + '|' + deaNum + '|' + specialty + '|' + stateLicensed + '|' + addressOne + '|' + addressTwo + '|' + city + '|' + stateLocation + '|' + zipNum + '|' + Atlas.common.Util.unformatPhone(phoneNum) + '|' + Atlas.common.Util.unformatfax(faxNum) + '|' + Atlas.common.Util.unformatfax(authFax) + '|1' + '|' + preBlock + '|' + notes + '|' + cLockLOB;
            pFieldList =  "npi,firstname,lastname,degree,deaNum,specialty,licstate,locaddr1,locaddr2,loccity,locstate,loczip,locphone,locfax,@AuthFax,EntityType,FWAPrescriberLockFlag,prescriberLockNote,FWAPrescriberLockLOB";

        }
        else {
            recordToSave = '';
            pFieldList='';
        }

        this.actioncalls(mode,recordToSave,pFieldList, npi,firstName + ' '+ lastName);
    },

    onRemoveButtonClick:function () {
        Ext.MessageBox.confirm('Delete Prescriber','Are you sure you would like to delete prescriber  <b>'+ this.getViewModel().get('masterrecord').data.fullname+' </b>?', function(btn){
            if(btn === 'yes'){
                this.actioncalls('D','','',this.getView().down("#prescriberCombo").getValue().split(' ')[0]);
            }
        },this)
    },

    actioncalls:function (mode,recordToSave,pFieldList, npi,fullname) {
        var record = this.getViewModel().get('masterrecord');
        var me=this;
        var vm = this.getViewModel();


      var updatePrescriberModel = Ext.create('Atlas.prescriber.model.UpdatePrescriber');
        updatePrescriberModel.phantom = false;
        updatePrescriberModel.getProxy().setExtraParam('pNPI', npi);
        updatePrescriberModel.getProxy().setExtraParam('pMode', mode);
        updatePrescriberModel.getProxy().setExtraParam('pFieldList', pFieldList);
        updatePrescriberModel.getProxy().setExtraParam('pFields', recordToSave);
        updatePrescriberModel.save(
            {
                failure: function (record, operation) {
                },
                success: function (record, operation) {
                },
                callback: function (record, operation, success) {

                    var objResp = Ext.decode(operation.getResponse().responseText);

                    if(objResp.message[0].message!="Successful")
                    {
                        Ext.MessageBox.show({
                            title: 'Failure',
                            msg:objResp.message[0].message,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                        return;
                    }


                    if(mode=='D') {
                        vm.set('masterrecord', {});
                        me.getView().down("#prescriberCombo").setValue("");
                        me.getView().down("#ParentFWAPrescriberLockLOBField").setValue("");
                        me.getView().down("#FWAPrescriberCheckbox").setValue(false);
                    }
                    else {
                        var combo = {};
                        combo.lastSelection = [];
                        var data = {
                            data: {
                                fullname: fullname,
                                npi: npi
                            }
                        };
                        combo.lastSelection.push(data);
                        me.onCancelClick();
                        me.onPrescriberSelection(combo, {});
                        if (mode == 'U')
                            Ext.MessageBox.alert("Success", "Prescriber is updated");
                        else
                            Ext.MessageBox.alert("Success", "Prescriber is created");
                    }
                }
            });
    },

    checkbox_change:function (checkbox, checked) {
        if(checked)
            Ext.first('combo[itemId=FWAPrescriberLockLOBField]').setDisabled(false);
        else {
            Ext.first('combo[itemId=FWAPrescriberLockLOBField]').setDisabled(true);
            Ext.first('combo[itemId=FWAPrescriberLockLOBField]').setValue("");
        }
    }

});