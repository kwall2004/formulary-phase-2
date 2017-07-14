/**
 * Created by T4317 on 7/26/2016.
 */
Ext.define('Atlas.member.view.memberprofile.MpuDisplayContainer', {
//    extend: 'Ext.container.Container',
    extend: 'Ext.form.FieldContainer',
    xtype: 'member-memberprofile-mpudisplaycontainer',
    layout: {
        type: 'hbox',
        align: 'fit'
    },
    defaults: {
        //margin: '0 0 6 10'   // T L R B
        labelWidth: 0,
        labelAlign: '',
        cls: 'disabledText'
    },
    initComponent: function () {
        var me = this;
        me.defaults.labelWidth = this.itemConfig.tgtLblWidth;
        me.defaults.labelAlign = this.itemConfig.tgtLblAlign;
        me.items = [{

            xtype: 'textfield',
            name: this.itemConfig.tgtName || '',
            fieldLabel: this.itemConfig.tgtLabel,
            bind: this.itemConfig.tgtBind,
            itemId: this.itemConfig.tgtName || '',
            disabled: true,
            width: 425,
            vtype: this.itemConfig.tgtVtype || '',
            maskRe: this.itemConfig.tgtMaskRe || '',
            minLength: this.itemConfig.tgtMinLength || 0,
            maxLength: this.itemConfig.tgtMaxLength || 50,
            enforceMaxLength: this.itemConfig.tgtEnforceMaxLength || 50,
            plugins: this.itemConfig.tgtPlugins || ''
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
        }, {
            xtype: 'label',
            itemId: 'errorBox',    // This ID lets me find the display element relative to the editor above
            padding: '8px, 2px, 2px, 0px',   // T L R B
            layout: {
                labelAlign: 'bottom'
            }
            //cls: 'errorBox'      This class lets me customize the appearance of the error element in CSS
        }];

        me.itemId = "fc" + this.itemConfig.tgtName;
        me.callParent();
    }
    /*
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