/*
 Developer: Tremaine Grant
 Description: error window that prompts the user that a dialogxtype must be passed for grid editor to work.
 Origin: Merlin
 8/15/16

 */
Ext.define('Atlas.common.view.sharedviews.EditorWindowError', {
    extend:'Ext.form.Panel',
    xtype:'editorwindowerror',
    html:'<h1>Warning</h1><p>Please define a dialogxtype in your grid</p>',
    reference: 'editorForm'

});