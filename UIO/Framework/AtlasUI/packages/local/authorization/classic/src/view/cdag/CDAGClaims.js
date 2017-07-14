/*
* Last Developer: Tremaine Grant
* Date: 2016-07-11
* Previous Developers: [Todd Urbanaowicz]
* Origin:
* Description: Allows the user to view their claims.
*	The grid can be exported to PDF and Excel
*/


Ext.define('Atlas.authorization.view.cdag.CDAGClaims', {
	extend: 'Ext.panel.Panel',
	xtype: 'cdag-claims',
	title: 'Claims',
	items: [{
		controller:'cdagclaims',
		xtype:'common-claims'
	}]
});