Ext.define('Atlas.claims.controller.detail.ClaimDetailStatusClaimDetailMedicalController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.claimDetailMedical',
    requires: [
    	'Atlas.claims.view.detail.ClaimDetailDiagCodeField',
        'Atlas.claims.model.detail.diagCodeModel'
    ],

    config: {
    	diagNumber: 12,
    	i: 0,
    	sore: '',
    	leftContainer: '',
    	centerContainer: '',
    	rightContainer: '',
    	fieldIDs: []
    },

    init: function (view) {		
		var me = this;
		me.i = 0;
		me.fieldIDs = [];
		//Load and add diagnosis codes to the screen
		me.store = Ext.create('Atlas.claims.model.detail.diagCodeModel');
		me.leftContainer = Ext.getCmp('leftDiag');		
		me.centerContainer = Ext.getCmp('centerDiag');
		me.rightContainer = Ext.getCmp('rightDiag');
        me.store.each(function(record, id){
        	me.diagNumber = record.get('idNo');
		    me.addDiagCode(record.get('diagCode'), me.getContainer());    	           
        });
    },

	addDiagCode: function (infotext, container) {
	    var fieldObject = container.add({
	        xtype: 'diagCodeField',
	        labelText: 'Diag ' + this.diagNumber.toString() + ':',
	        fieldText: infotext,
	        idNum: this.diagNumber - 1
	    });
	    if (this.diagNumber > 12) {
		    fieldObject.down().add({
		        items: {
		            iconCls: 'pictos pictos-delete_black1',
		            xtype: 'button',
		            style: 'padding: 2px; margin-top: 1px:',
		            listeners: {
		                click: function () {
							var parentObj = this.findParentByType('fieldcontainer');
							var diagId = parentObj.down().fieldLabel.split(' ')[1].replace(':','');
							var thisController = parentObj.findParentByType('ClaimDetailStatusClaimDetailMedical').getController('claimDetailMedical');
							// find and remove record from the store
							thisController.store.remove(thisController.store.getById(parseInt(diagId) - 1));							
							thisController.store.commitChanges();
							thisController.refreshView();
		                }
		            }
		        }
		    });
		}
	},

	addNewField: function () {
		this.diagNumber++;
		this.store.add({id: this.diagNumber - 1, idNo: this.diagNumber.toString(), diagCode: 'test ' + this.diagNumber.toString()});
		this.store.commitChanges();
		this.addDiagCode('test ' + this.diagNumber.toString(), this.getContainer());
	},

	getContainer: function () {
	    if (this.i == 0) {
	        this.i++;
		    return this.leftContainer;
	    } else if (this.i == 1) {
	        this.i++;
		    return this.centerContainer;
	    } else {		        
	        this.i = 0;
	        return this.rightContainer;
	    }    
	},

	refreshView: function () {		
		var me = this;
		for (var i = me.fieldIDs.length - 1; i > 11; i = i - 1){
			me.fieldIDs[i].ref.destroy();
			me.fieldIDs.pop();
		}
		me.i = 0;
	    me.store.each(function(record, id){
	    	// fixing idNumbers for the store
			record.set('id', id);		
			record.set('idNo', (id + 1).toString());	
			// recreating the added codes 
	    	if (id > 11) {				
	        	me.diagNumber = record.get('idNo');
			    me.addDiagCode(record.get('diagCode'), me.getContainer());    	
			    me.diagNumber = id + 1;           
			}
        });	
	}
});