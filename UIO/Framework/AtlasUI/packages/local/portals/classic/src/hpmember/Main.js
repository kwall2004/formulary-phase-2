/*
 * Last Developer: Srujith Cheruku
 * Date: 10-26-2016
 * Previous Developers: []
 * Origin: MHP Member - Home
 * Description: View for the Home Page
 */
Ext.define('Atlas.portals.view.hpmember.Main', {
    extend: 'Ext.container.Container',
    xtype: 'portalsmembermhpmain',
    title: 'Home',
    scrollable: 'y',
    controller: 'portalsMemberMHPMainController',
    viewModel: 'portalsMemberMHPMainModel',

    items: [{
         xtype: 'panel',
         cls: 'card-panel',
         title: 'Welcome',

         items: [{
             xtype: 'container',
             layout: 'hbox',

             items: [{
                xtype: 'container',
                html: '<div class="hpmember-user-icon"><i class="fa fa-user"></i></div>'
             }, {
                xtype: 'displayfield',
                margin: '10 0 0 0',
                reference: 'memberNameRef'
             }]
         }, {
            xtype: 'container',
            padding: '10 11 10 11',
            html: '<b>Welcome to the Meridian Health Plan Member Portal</b><br><br>' +
            'The Meridian Health Plan Member Portal is your online hub for managing your healthcare, 24/7. The Meridian Health Plan Member Portal is modern, intuitive and has a host of features' +
            ' such as Live Chat with a Nurse. It will also allow you to request a new member ID card, change your Primary Care Provider, enroll in preventive care programs and pay your bill.' +
            ' You can use the quick links below, or the left-side menu to navigate though the Meridian Health Plan Member Portal. If you have any questions or need help, please call Member' +
            ' Services at 888-437-0606.'
         }, {
             xtype: 'portalsmembermhpmainitems'
         }]
    }]
 });
                /*, {
                 xtype: 'container',
                 layout: 'hbox',

                 items: [{
                 xtype: 'fieldset',
                 title: 'Your Profile Settings',
                 flex: 1,

                 items: [{
                 xtype: 'container',
                 layout: 'hbox',
                 items: [{
                 xtype: 'container',
                 html: '<div class="hpmember-quicklinks-icon hpmember-profile"><i class="fa fa-user"></i></div>'
                 }, {
                 xtype: 'container',
                 html: '<b>Want to change your member profile information, such as your address, your email or text message settings? All of that and more can be changed with a few clicks' +
                 ' of your mouse.</b>'
                 }]
                 }, {
                 xtype: 'container',
                 layout: 'hbox',

                 items: [{
                 xtype: 'container',
                 flex: 1
                 }, {
                 xtype: 'button',
                 text: 'Change Your Settings <i class="fa fa-share"></i>',
                 handler: 'onChangeSettingsClick'
                 }]
                 }]
                 }, {
                 xtype: 'fieldset',
                 title: 'Your ID Card',
                 flex: 1,

                 items: [{
                 xtype: 'container',
                 layout: 'hbox',

                 items: [{
                 xtype: 'container',
                 html: '<div class="hpmember-quicklinks-icon hpmember-idcard"><i class="fa fa-credit-card"></i></div>'
                 }, {
                 xtype: 'container',
                 html: '<b>Lost or need to replace your ID card? All you need to do is provider some personal information to request your ID card. Get your replacement card today!</b>'
                 }]
                 }, {
                 xtype: 'container',
                 layout: 'hbox',

                 items: [{
                 xtype: 'container',
                 html: 'Note: A lost or stolen ID card should be reported immediately.'
                 }, {
                 xtype: 'container',
                 flex: 1
                 }, {
                 xtype: 'button',
                 text: 'Request Your Card <i class="fa fa-share"></i>',
                 handler: 'onRequestCardClick'
                 }]
                 }]
                 }]
                 }, {
                 xtype: 'container',
                 layout: 'hbox',

                 items: [{
                 xtype: 'fieldset',
                 title: 'Your Primary Care Provider',
                 flex: 1,

                 items: [{
                 xtype: 'container',
                 layout: 'hbox',

                 items: [{
                 xtype: 'container',
                 html: '<div class="hpmember-quicklinks-icon hpmember-hospital"><i class="fa fa-hospital-o"></i></div>'
                 }, {
                 xtype: 'container',
                 html: '<b>Need to find a Primary Care Provider (PCP), sepcialist or vision provider in your area? Do you want to change your Primary Care Provider (PCP)? You can do either in' +
                 ' 3 easy steps.</b>'
                 }]
                 }, {
                 xtype: 'container',
                 layout: {
                 type: 'hbox',
                 pack: 'end'
                 },

                 items: [{
                 xtype: 'button',
                 text: 'Find Providers <i class="fa fa-share"></i>',
                 handler: 'onFindProvidersClick'
                 }]
                 }]
                 }, {
                 xtype: 'fieldset',
                 title: 'Your Health Risk Assessment',
                 flex: 1,

                 items: [{
                 xtype: 'container',
                 layout: 'hbox',

                 items: [{
                 xtype: 'container',
                 html: '<div class="hpmember-quicklinks-icon hpmember-idcard"><i class="fa fa-medkit"></i></div>'
                 }, {
                 xtype: 'container',
                 html: '<b>Complete your Health Risk Assessment (HRA) to identify your health risks and receive a plan to help you address any and all of your health risks. Complete your HRA today and' +
                 ' start your path to better health today.</b>'
                 }]
                 }, {
                 xtype: 'container',
                 layout: {
                 type: 'hbox',
                 pack: 'end'
                 },

                 items: [{
                 xtype: 'button',
                 text: 'Complete Your HRA <i class="fa fa-share"></i>',
                 handler: 'onCompleteHRAClick'
                 }]
                 }]
                 }]
                 }, {
                 xtype: 'container',
                 layout: 'hbox',

                 items: [{
                 xtype: 'fieldset',
                 title: 'Your Protected Health Information',
                 flex: 1,

                 items: [{
                 xtype: 'container',
                 layout: 'hbox',

                 items: [{
                 xtype: 'container',
                 html: '<div class="hpmember-quicklinks-icon hpmember-info"><i class="fa fa-h-square"></i></div>'
                 }, {
                 xtype: 'container',
                 html: '<b>Do you need access to your Protected Health Information (PHI)? You can fill out the 2 release forms online, print & sign them, and then just mail the forms to the' +
                 ' address printed on them</b>'
                 }]
                 }, {
                 xtype: 'container',
                 layout: {
                 type: 'hbox',
                 pack: 'end'
                 },

                 items: [{
                 xtype: 'button',
                 text: 'Request Your PHI <i class="fa fa-share"></i>',
                 handler: 'onRequestPHIClick'
                 }]
                 }]
                 }, {
                 xtype: 'fieldset',
                 title: 'Your Health Services',
                 flex: 1,

                 items: [{
                 xtype: 'container',
                 layout: 'hbox',

                 items: [{
                 xtype: 'container',
                 html: '<div class="hpmember-quicklinks-icon hpmember-info"><i class="fa fa-info-circle"></i></div>'
                 }, {
                 xtype: 'container',
                 html: '<b>Want to check what health services you\'re eligible for? Need to update the health services you\'re already receiving? You can browse from a large selection of health' +
                 ' services to choose the service(s) that are right for you.</b>'
                 }]
                 }, {
                 xtype: 'container',
                 layout: {
                 type: 'hbox',
                 pack: 'end'
                 },

                 items: [{
                 xtype: 'button',
                 text: 'View Your Health Services <i class="fa fa-share"></i>',
                 handler: 'onViewHealthServicesClick'
                 }]
                 }]
                 }]
                 }, {
                 xtype: 'container',
                 layout: 'hbox',

                 items: [{
                 xtype: 'fieldset',
                 title: 'Your Member Handbook',
                 flex: 1,

                 items: [{
                 xtype: 'container',
                 layout: 'hbox',

                 items: [{
                 xtype: 'container',
                 html: '<div class="hpmember-quicklinks-icon hpmember-book"><i class="fa fa-book"></i></div>'
                 }, {
                 xtype: 'container',
                 html: '<b>Lost or need a new member handbook? To request a new copy of the member handbook, simply fill out the basic information within the short, 6 item, form</b>'
                 }]
                 }, {
                 xtype: 'container',
                 layout: {
                 type: 'hbox',
                 pack: 'end'
                 },

                 items: [{
                 xtype: 'button',
                 text: 'Request Handbook <i class="fa fa-share"></i>',
                 handler: 'onRequestHandbookClick'
                 }]
                 }]
                 }, {
                 xtype: 'fieldset',
                 cls: 'hpmember-invisible-fieldset',
                 flex: 1
                 }]
                 }*/

