/**
 * Created by n6684 on 12/2/2016.
 */

Ext.define('Atlas.admin.view.EDIPartnerInfoController',
    {
        extend: 'Ext.app.ViewController',
        alias: 'controller.edipartnerinfocontroller',
        custominit:{},
        listen: {
            controller: {
                '*': {
                    refreshgdeditpartnerinto: 'refreshgdeditpartnerinto',
                    refreshcontactgrid: 'refreshcontactgrid',
                    refreshpartnerrelationshipgrid: 'refreshpartnerrelationshipgrid'
                }
            }
        },
        init:function()
        {
            this.getViewModel().getStore('edipartnerinfoqualifiers').load();
            this.refreshgdeditpartnerinto();
        },

        refreshgdeditpartnerinto:function () {

            var me = this;
            if(this.getViewModel()) {
                var servicetypestore = this.getViewModel().getStore('edipartnerinfo');
                servicetypestore.load({
                    callback: function (record, operation, success) {
                        var grid = me.getView().down('#gdeditpartnerinto');
                        me.gdeditpartnerinto_itemclick(null,record[0],null,0,null);
                        //grid.getSelectionModel().select(0);
                        //var objResp = Ext.decode(operation.getResponse().responseText);


                    }
                });
            }

        },
        getQualifier:function (value) {
            var edipartnerinfoqualifiers = this.getViewModel().getStore('edipartnerinfoqualifiers');
            var record = edipartnerinfoqualifiers.findRecord('value', value);
            if(record)
                return record.get('name');
            else
                return '';
        },

        gdeditpartnerinto_itemclick:function (dv, record, item, index, e) {
            var view= this.getView();
            if(!record.data)
                return;
            this.custominit.singlepartner = record.data;

            view.down("#gdeditpartnerinto_edit").setDisabled(false);
            view.down("#gdeditpartnerrelationship_add").setDisabled(false);
            view.down("#gdcontactinfo_add").setDisabled(false);
            var vm = this.getViewModel();

            record.set('planQualifier',this.getQualifier(this.custominit.singlepartner.planIdQualifier));
            record.set('ISAQualifier',this.getQualifier(this.custominit.singlepartner.idQualifier));
            this.refreshedioptions(record);
            this.refreshpartnerrelationshipgrid(this.custominit.singlepartner.partnerId);
            this.refreshcontactgrid(this.custominit.singlepartner.SystemID);

        },
        refreshedioptions:function(record){
            //set the qualifiers
            //get the command
            var vm=this.getViewModel();
            var form = this.getView().down('#editoptionsform');
            if(this.getViewModel()) {
                var pFieldList = 'sendcmd';
                var ediPartnerRelationMasterExt = this.getViewModel().getStore('editpartnerinfodetails');
                ediPartnerRelationMasterExt.getProxy().setExtraParam('pPartnerId', record.data.partnerId);
                ediPartnerRelationMasterExt.getProxy().setExtraParam('pFieldList', pFieldList);
                ediPartnerRelationMasterExt.load(
                    {
                        callback: function (record1, operation, success) {
                            record.set('sendcmd',record1[0].get('sendcmd'));
                            form.loadRecord(record);

                        }
                    }
                );
            }

        },

        refreshpartnerrelationshipgrid:function (systemId) {


            if(this.getViewModel()) {
                var ediPartnerRelationMasterExt = this.getViewModel().getStore('ediPartnerRelationMasterExt');
                ediPartnerRelationMasterExt.getProxy().setExtraParam('pWhere', "where PartnerID='" + systemId + "'");
                ediPartnerRelationMasterExt.load();
            }
        },

        refreshcontactgrid:function (systemId) {

            if(this.getViewModel()) {
                var edipartnercontactinfo = this.getViewModel().getStore('edipartnercontactinfo');
                edipartnercontactinfo.getProxy().setExtraParam('pParentSystemID', systemId);
                edipartnercontactinfo.load();
            }
        },

        gdeditpartnerinto_add :function (){

               var view = this.getView(),
                   win = Ext.create({
                xtype: 'admin-edipartnerinfoform',
                extraParams: {

                    'action':'add'
                }
            });
           // this.getView().add(win);
            view.add(win).show();
        },

        gdeditpartnerinto_edit :function () {
            var view = this.getView(),
                win = Ext.create({
                xtype: 'admin-edipartnerinfoform',
                extraParams: {
                    'singlepartner':  this.custominit.singlepartner,
                    'action':'edit'
                }
            });
            view.add(win).show();
        },

        gdcontactinfo_itemclick :function (dv, record, item, index, e) {
            if(!record.data)
                return;
            this.custominit.contactinfo = record.data;
            this.getView().down("#gdcontactinfo_edit").setDisabled(false);
            this.getView().down("#gdcontactinfo_remove").setDisabled(false);
        },

        gdcontactinfo_add :function (){


            var view = this.getView(),
                win = Ext.create({
                xtype: 'admin-edipartnercontactform',
                extraParams: {
                    'singlepartner':  this.custominit.singlepartner,

                    'action':'add'
                }
            });
            view.add(win).show();
        },

        gdcontactinfo_edit :function () {

            var view = this.getView(),
                win = Ext.create({
                xtype: 'admin-edipartnercontactform',
                extraParams: {
                    'singlepartner':  this.custominit.singlepartner,
                    'contactinfo':  this.custominit.contactinfo,
                    'action':'edit'
                }
            });
            view.add(win).show();
        },

        gdcontactinfo_remove :function () {
            var me =this;
            this.getView().down("#gdcontactinfo_edit").setDisabled(true);
            this.getView().down("#gdcontactinfo_remove").setDisabled(true);
            Ext.MessageBox.confirm('Delete','Are you sure you would like to delete this record?', function(btn){
                if(btn === 'yes'){

                    var controller = Ext.create('Atlas.admin.view.EDIPartnerContactFormController');
                    controller.fireEvent('btnContactSave',"Delete",this.custominit.contactinfo.SystemID, this.custominit.singlepartner.SystemID);
                    this.custominit.contactinfo = {};
                }
                else{
                    this.custominit.contactinfo = {};
                }
            },this)
        },



        gdeditpartnerrelationship_itemclick :function (dv, record, item, index, e) {
            if(!record.data)
                return;
            this.custominit.editpartnerrelationship = record.data;
            this.getView().down("#gdeditpartnerrelationship_edit").setDisabled(false);
            this.getView().down("#gdeditpartnerrelationship_remove").setDisabled(false);
        },

        gdeditpartnerrelationship_add :function (){


            var view = this.getView(),
                win = Ext.create({
                xtype: 'admin-edipartnerrelationshipform',
                extraParams: {
                    'singlepartner':  this.custominit.singlepartner,

                    'action':'add'
                }
            });
            view.add(win).show();
        },

        gdeditpartnerrelationship_edit :function () {
            var view = this.getView(),
                win = Ext.create({
                xtype: 'admin-edipartnerrelationshipform',
                extraParams: {
                    'singlepartner':  this.custominit.singlepartner,
                    'editpartnerrelationship':  this.custominit.editpartnerrelationship,
                    'action':'edit'
                }
            });
            view.add(win).show();
        },

        gdeditpartnerrelationship_remove :function () {
            var me =this;
            this.getView().down("#gdeditpartnerrelationship_edit").setDisabled(true);
            this.getView().down("#gdeditpartnerrelationship_remove").setDisabled(true);
            Ext.MessageBox.confirm('Delete','Are you sure you would like to delete this record?', function(btn){
                if(btn === 'yes'){
                    var controller = Ext.create('Atlas.admin.view.EDIPartnerRelationshipFormController');
                    controller.fireEvent('btnpartnerrelationshiptSave',"Delete",this.custominit.editpartnerrelationship.SystemID, this.custominit.singlepartner.partnerId);
                    this.custominit.editpartnerrelationship = {};
                }
                else{
                    this.custominit.editpartnerrelationship = {};
                }
            },this)

        }

     });