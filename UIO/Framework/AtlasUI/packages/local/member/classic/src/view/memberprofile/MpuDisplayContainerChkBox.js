/**
 * Created by T4317 on 7/26/2016.
 */
Ext.define('Atlas.member.view.memberprofile.MpuDisplayContainerChkBox', {
//    extend: 'Ext.container.Container',
    extend: 'Ext.form.FieldContainer',
    xtype: 'member-memberprofile-mpudisplaycontainerchkbox',
    layout: {
        type: 'hbox',
        align: 'fit'
    },
    defaults: {
        labelWidth: 0,
        labelAlign: ''
    },
    initComponent: function() {
        var me = this;
        me.defaults.labelWidth = this.itemConfig.tgtLblWidth;
        me.defaults.labelAlign = this.itemConfig.tgtLblAlign;
        me.items = [{
            xtype: 'checkbox',
            name: this.itemConfig.tgtName || '',
            fieldLabel: this.itemConfig.tgtLabel,
            bind: this.itemConfig.tgtBind,
            itemId: this.itemConfig.tgtName || '',
            disabled: true
        }, {
             xtype: 'container',
             padding: '6px, 0px, 0px, 0px',   // T L R B
             itemId: "hld" + this.itemConfig.tgtName,
             items: [{
                 xtype: 'image',
                 height: 20,
                 width: 20,
                 //src: 'resources/images/locked.png',
                 itemId: "img" + this.itemConfig.tgtName
             }]
        },{
            xtype: 'label',
            itemId: 'errorBox' // This ID lets me find the display element relative to the editor above
            //cls: 'errorBox'      This class lets me customize the appearance of the error element in CSS
        }];

        me.itemId = "fc" + this.itemConfig.tgtName;
        me.callParent();
    }
    /*
     fieldLabel: 'Handicap Access',
     name: 'handicapAccess'

     constructor: function(configs) {
        // ------------------------------------------------------
        // You only use this method if you need to modify incoming arguments
        // before they actually get initialized in the component.
        // ------------------------------------------------------
        this.callParent(arguments);  // Creates Class, calls initComponent
        this.initConfig(configs);
    }
    */
});