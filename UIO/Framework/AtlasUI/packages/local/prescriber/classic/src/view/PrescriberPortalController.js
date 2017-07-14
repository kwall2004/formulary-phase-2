/**
 * Created by T4317 on 9/27/2016.
 */
Ext.define('Atlas.prescriber.view.PrescriberPortalController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.portalusers',

    onPrescriberSelection: function (combo, record) {
        var me = this;
        var form = this.getView();
        var vm = this.getViewModel();
        combo.setValue(combo.lastSelection[0].data.fullname);
        var prescriberUser = Ext.create('Atlas.prescriber.model.PrescriberUser', {});
        prescriberUser.getProxy().setExtraParam('pWhere', 'npi = "' + record.get('npi') + '"');
        prescriberUser.load({
            scope: me,
            failure: function (masterrecord, operation) {
            },
            success: function (masterrecord, operation){
                vm.set('prescribermaster', masterrecord);
            },
            callback: function (masterrecord, operation, success) {
                if(masterrecord.get('NPI').length > 0)
                {
                    vm.set('editPrescriber', false);
                    vm.set('passReset', false);
                    var lastLogin = '';
                    var tempRecord = Ext.create('Ext.data.Model', record.getData());
                    tempRecord.set('UserName',masterrecord.get('UserName'));
                    tempRecord.set('DEA',masterrecord.get('DEA'));
                    tempRecord.set('Email',masterrecord.get('Email'));
                    tempRecord.set('Active',masterrecord.get('Active'));
                    tempRecord.set('registrationStatus',me.registrationStatusTranslation(masterrecord.get('registrationStatus')));
                    tempRecord.set('LoginDevice',masterrecord.get('LoginDevice'));
                    // tempRecord.set('lastLogin',me.dateFormat(lastLogin));
                    // tempRecord.set('PasswordChangeDate',me.dateFormat(passwordChangeDate));
                    tempRecord.set('lastLogin',Atlas.common.Util.setdateformatWithAMPM(masterrecord.get('Lastlogin')));
                    tempRecord.set('CreateDateTime',Atlas.common.Util.setdateformatWithAMPM(masterrecord.get('CreateDateTime')));
                    tempRecord.set('PasswordChangeDate',Atlas.common.utility.Utilities.FixDateoffsetToMatchLocal(masterrecord.get('PasswordChangeDate'),'m/d/Y h:i:s A'));
                    tempRecord.set('formattedzip', me.zipFormat(record.get('loczip')));
                    vm.set('masterrecord', tempRecord);
                    form.loadRecord(tempRecord);
                    vm.set('approve', true);
                    this.isApprovable(vm, masterrecord);

                } else {
                    Ext.Msg.alert('Notice', 'Prescriber is not registered.', Ext.emptyFn);
                }
            }
        });
    },
    isApprovable:function(vm, masterrecord) {
        if(masterrecord.get('registrationStatus') === 'L' || masterrecord.get('registrationStatus') === "Approved" ){
            vm.set('approve', false);
        }
    },
    dateFormat: function(date) {
        if(date !== '')
        {
            return (date.getMonth() + 1) +
                '/' +  date.getDate() +
                '/' +  date.getFullYear() +
                ' ' + date.getHours() +
                ':' + date.getMinutes() +
                ':' + date.getSeconds();
        } else {
            return '';
        }

    },
    registrationStatusTranslation: function(status) {
        if(status === 'A') {
            return 'Approved';
        } else if(status === 'L') {
            return 'Registration Letter Sent';
        } else {
            return 'Information Saved';
        }
    },
    zipFormat: function(zip) {

        if(zip.length<=10)
            return zip;
        return zip.substring(0, 5) + '-' + zip.substring(5, 9);
    },
    onSetResetPw: function (wType) {
        var proxy;
        var me = this;
        var vm = this.getViewModel();


        Ext.Msg.confirm('Reset Password', 'Are you sure you would like to set password for this prescriber <b>'+ this.lookup('prescriberSearch').getRawValue() +' </b>? Prescriber will be notified via email.', function(result){
            if(result === 'yes') {
                var prescriberPasswordReset = Ext.create('Atlas.prescriber.model.PrescriberPasswordReset');

                prescriberPasswordReset.phantom = false;
                proxy = prescriberPasswordReset.getProxy();
                proxy.setExtraParam('pNPI', vm.get('masterrecord').get('npi'));
                proxy.setExtraParam('pEmail', vm.get('masterrecord').get('Email'));
                proxy.setExtraParam('pPassword', '');
                proxy.setExtraParam('pDevice', '');
                proxy.setExtraParam('oPassword', '');
                proxy.setExtraParam('pUserName', vm.get('masterrecord').get('UserName'));

                prescriberPasswordReset.save({
                    scope: me,
                    failure: function (record, operation) {
                        //debugger;
                    },
                    success: function (record, operation) {
                        Ext.Msg.alert('Password Reset', 'Password has been reset successfully!', Ext.emptyFn);
                    },
                    callback: function (record, operation, success) {
                        //do something whether the load succeeded or failed
                        //debugger;
                        Ext.Msg.alert('PBM', 'Password is set for User:'+vm.get('masterrecord').get('UserName')+'. New password has been emailed to user.', Ext.emptyFn);
                    }
                });
            }
        });



    },
    onApprove: function () {
        var vm = this.getViewModel(),
            wFields =  'registrationStatus',
            wFieldData = 'A';
        var updateModel = Ext.create('Atlas.common.model.PrescriberUserMaster');
        updateModel.phantom = false;
        updateModel.getProxy().setExtraParam('pNPI', vm.get('masterrecord').get('npi'));
        updateModel.getProxy().setExtraParam('pFields', wFields);
        updateModel.getProxy().setExtraParam('pValues', wFieldData);
        updateModel.getProxy().setExtraParam('pMode', 'U');
        updateModel.getProxy().setExtraParam('pApprovalFlag', 'N');
        updateModel.save(
            {
                success: function () {
                    Ext.MessageBox.alert('PBM', 'Prescriber is successfully appro', Ext.emptyFn);
                    vm.set('approve', true);
                    this.getView().lookup('regStat').setValue('Approved');
                }
            });
    },
    onSave: function () {
        var me = this,
            vm = this.getViewModel(),
            view = this.getView(),
            fldEmail = this.lookup('email').down(),
            fldEmailContainer = this.lookup('email'),
            imgEmail = fldEmailContainer.down('#hldEmail').down('#imgEmail'),
            fldActiveContainer = this.lookup('activeToggle'),
            activeToggle = fldActiveContainer.down(),
            imgActive = fldActiveContainer.down('#hldActive').down('#imgActive'),
            fldUtil = Ext.create('Atlas.common.view.AtlasEditsUtil'),
            wFields = 'Email,Active',
            wFieldData = fldEmail.value.toString() + "|" + activeToggle.value.toString(),
            record= vm.get('masterrecord'),
            existingRecord = vm.get('prescribermaster');
        //debugger;

        if(fldUtil.validEmail(fldEmail.value.toString())){
            //updateModel = Ext.create('Atlas.member.model.MemberUserMaster', );
            var updateModel = Ext.create('Atlas.common.model.PrescriberUserMaster');

            updateModel.phantom = false;
            updateModel.getProxy().setExtraParam('pNPI', vm.get('masterrecord').get('npi'));
            updateModel.getProxy().setExtraParam('pFields', wFields);
            updateModel.getProxy().setExtraParam('pValues', wFieldData);
            updateModel.getProxy().setExtraParam('pMode', 'U');
            updateModel.getProxy().setExtraParam('pApprovalFlag', 'N');
            updateModel.save(
                {
                    success: function () {

                        var copyexist = vm.get('masterrecord');
                        copyexist.data.Email = fldEmail.value.toString();
                        vm.set('masterrecord',copyexist);
                        Ext.MessageBox.alert('PBM', 'Prescriber Details Updated', Ext.emptyFn);
                    }
                });

            this.clearActiveErrors(view);
            this.clearErrors(view);
            this.toggleFormForEdit(false);
        }
        else {

            this.setFieldContainerError(fldEmailContainer, "Invalid Email Found");
            fldEmail.selectText();
            this.toggleFormForEdit(true);
        }

    },
    onEditUser: function () {
        this.toggleFormForEdit(true);
    },
    onCancel: function () {
        var view = this.getView(),
            vm = view.getViewModel(),
            fldEmail = this.lookup('email').down(),
            fldEmailContainer = this.lookup('email'),
            imgEmail = fldEmailContainer.down('#hldEmail').down('#imgEmail'),
            fldActiveContainer = this.lookup('activeToggle'),
            activeToggle = fldActiveContainer.down();

        this.clearActiveErrors(view);
        this.clearErrors(view);

        if (view.getRecord().dirty) {
            view.loadRecord(vm.get('masterrecord'));
        }
        this.toggleFormForEdit(false);
    },
    clearErrors: function (form) {
        var fieldContainers = form.query('fieldcontainer');
        fieldContainers.forEach(function (container) {
            var errUI = container.down('#errorBox');
            if (errUI) {
                errUI.setText("", false);
                errUI.setVisible(false);
            }
        });
    },
    setFieldContainerError: function (container, msg) {
        var errUI = container.down('#errorBox');
        errUI.setText(msg, false);
        errUI.show();

    },
    clearActiveErrors: function (form) {
        var fieldContainers = form.query('fieldcontainer');
        fieldContainers.forEach(function (container) {
            container.unsetActiveError();
        });
    },
    toggleFormForEdit: function (enableControls) {

        var vm = this.getViewModel(),
            fldEmail = this.lookup('email').down(),
            fldEmailContainer = this.lookup('email'),
            imgEmail = fldEmailContainer.down('#hldEmail').down('#imgEmail'),
            fldActiveContainer = this.lookup('activeToggle'),
            activeToggle = fldActiveContainer.down(),
            imgActive = fldActiveContainer.down('#hldActive').down('#imgActive'),
            toggleImageLock =  enableControls ? "resources/images/unlocked.png" : "resources/images/locked.png";

        imgEmail.el.dom.src = toggleImageLock;
        imgActive.el.dom.src = toggleImageLock;

        if (enableControls) {
            fldEmail.setDisabled(false);
            fldEmail.selectText();
            activeToggle.setDisabled(false);
            this.toggleButtons(false,true,false,true,true);
        }
        else {
            fldEmail.setDisabled(true);
            activeToggle.setDisabled(true);
            this.toggleButtons(true,false,true,false,false);
        }

    },
    toggleButtons: function(save,edit,cancel,reset,approve) {
        var vm = this.getViewModel();
        vm.set('save', save);
        vm.set('editPrescriber', edit);
        vm.set('cancel', cancel);
        vm.set('passReset', reset);
        vm.set('approve', reset);
    },
    onPrescriberClick: function () {
        var me = this,
            vm = me.getViewModel(),
            rec = vm.get('masterrecord'),
            topViewModel =  Ext.first('viewport').getViewModel(),
            menuId = Atlas.common.Util.menuIdFromRoute('merlin/prescriber/PrescriberToolbar');

        if (rec != null && rec != undefined) {
            topViewModel.set('prescriberrecord', rec);

            var atlasId = rec.get('npi');

            me.fireEvent('openView', 'merlin', 'prescriber', 'PrescriberToolbar', {
                menuId: menuId,
                atlasId: atlasId
            });
        }

    }

});

