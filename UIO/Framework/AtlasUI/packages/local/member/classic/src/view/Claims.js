/*
* Last Developer: Tremaine Grant
* Date: 2016-07-11
* Previous Developers: [Todd Urbanaowicz]
* Origin:
* Description: Allows the user to view their claims.
*	The grid can be exported to PDF and Excel
*/


Ext.define('Atlas.member.view.Claims', {
	extend: 'Ext.panel.Panel',
	xtype: 'member-claims',
	viewModel: 'claims',
    layout:'fit',
	title: 'Claims',
	items: [{
		controller:'memberclaims',
		xtype:'common-claims'
	}]
});