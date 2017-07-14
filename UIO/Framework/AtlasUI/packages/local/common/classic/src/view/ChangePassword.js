/**
 * Created by n6684 on 11/29/2016.
 */
// Revisited by @Sencha
//Labeled
Ext.define('Atlas.common.view.ChangePassword', {
    extend: 'Ext.window.Window',
    xtype: 'common_changepassword',
    controller: 'changepasswordcontroller',
    width: 400,
    modal: true,
    title: 'Change My Password',
    layout: 'fit',
    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            layout: 'form',
            items: [
                {
                    //TODO : Add password strength validator
                    xtype: 'textfield',
                    name: 'password',
                    itemId: 'pass',
                    inputType: 'password',
                    fieldLabel: 'Password ',
                    minLength: 5,
                    minLengthText: 'Password should be at least 5 char long',
                    allowBlank: false,
                    blankText: 'Password is required'
                },
                {
                    xtype: 'textfield',
                    name: 'password2',
                    inputType: 'password',
                    fieldLabel: 'Confirm Password',
                    minLength: 5,
                    allowBlank: false,
                    blankText: 'Confirm Password is required',
                    vtype: 'fieldValueMatch',
                    vtypeText: 'Passwords does not match',
                    matchField: 'password'
                }
            ],
            bbar: [
                '->',
                {
                    text: 'Save',
                    iconCls: 'x-fa fa-save',
                    handler: 'changePassword',
                    disabled: true,
                    formBind: true
                },
                {
                    text: 'Cancel',
                    iconCls: 'x-fa fa-times',
                    handler: 'btncancel'
                }
            ]
        }
    ]
});
