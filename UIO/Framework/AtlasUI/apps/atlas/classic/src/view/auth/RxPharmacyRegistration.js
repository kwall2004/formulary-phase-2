/**
 * Created by c4539 on 12/8/2016.
 */
Ext.define('Atlas.view.auth.RxPharmacyRegistration', {
    extend: 'Ext.window.Window',
    controller: 'rxpharmacyregistration',

    title: 'Pharmacy Registration',
    height: 430,
    width: 450,
    modal: true,
    viewModel: {
        stores: {
            securityQuestions: {
                model: 'Atlas.portals.rxmember.model.PharmacyType'
            }
        },
        data: {
            isOnStep1: true,
            isOnStep2: false,
            isOnStep3: false,
            isOnStep4: false,
            isOnStep5: false,
            isOnStep6: false,
            termsAccepted: false,
            isIndependent: false
        }
    },
    scrollable: 'y',
    defaults: {
        xtype: 'form',
        cls: 'card-panel',
        layout: {
            type: 'vbox',
            align: 'stretch',
            flex: 1
        }
    },
    bbar: {
        xtype: 'toolbar',
        items: [
            {
                xtype: 'checkbox',
                boxLabel: 'I Agree',
                bind: {
                    hidden: '{!isOnStep5}'
                },
                listeners: {
                    change: function(checkbox, newValue) {
                        this.up().up().getViewModel().set('termsAccepted', newValue);
                    }
                }
            },
            '->',
            {
                xtype: 'button',
                text: 'Prev',
                handler: 'goToPrevious',
                iconCls: 'x-fa fa-arrow-left',
                iconAlign: 'left',
                bind: {
                    hidden: '{isOnStep1 || isOnStep6}'
                }
            },
            {
                xtype: 'button',
                text: 'Next',
                handler: 'goToNext',
                iconCls: 'x-fa fa-arrow-right',
                iconAlign: 'right',
                bind: {
                    hidden: '{isOnStep5 || isOnStep6}'
                }
            },
            {
                xtype: 'button',
                text: 'Save',
                handler: 'savePharmacy',
                iconCls: 'x-fa fa-save',
                iconAlign: 'left',
                bind: {
                    hidden: '{!isOnStep5}',
                    disabled: '{!termsAccepted}'
                }
            }
        ]
    },
    items: [
        {
            title: 'Step 1 of 4',
            bind: {
                hidden: '{!isOnStep1}'
            },
            defaults: {
                style: {
                    padding: '5px'
                }
            },
            items: [
                { xtype: 'label', html: '<p><b>Welcome to the Pharmacy Registration!</b></p>' },
                { xtype: 'label', html: '<p style="font-size:12px;">Following information is required to register</p>' },
                { xtype: 'label', html: '<table style="width:100%;font-size:12px;padding-left:10px;"> <tr> <td>Chain ID or Relationship ID </td><td>(PSAO\'s)</td></tr><tr> <td>NCPDP ID</td><td>(Independent Pharmacies)</td></tr><tr><td>Prescription number</td><td>(processed in the past 30 days)</td></tr><tr><td>Contact Name</td><td></td></tr><tr><td>Email address</td><td></td></tr></table>' }
            ]
        },
        {
            title: 'Step 2 of 4',
            reference: 'form2',
            bind: {
                hidden: '{!isOnStep2}'
            },
            defaults: {
                style: {
                    padding: '5px'
                }
            },
            items: [
                { xtype: 'label', html: '<p><b>Please select one of the options below:</b></p>' },
                { xtype: 'label', html: '<p><b>I am a...</b></p>' },
                { xtype: 'radio', boxLabel: 'Part of a PSAO or Pharmacy Chain', name: 'pharmacyType', value: 'psao' },
                { xtype: 'radio', boxLabel: 'Independent Pharmacy', name: 'pharmacyType', value: 'independent', listeners: {
                  change: function(radio, newValue) {
                      this.up().up().getViewModel().set('isIndependent', newValue);
                  }
                }}
            ]
        },
        {
            title: 'Step 3 of 4',
            reference: 'form3',
            bind: {
                hidden: '{!isOnStep3}'
            },
            defaults: {
                style: {
                    padding: '5px'
                }
            },
            items: [
                { xtype: 'label', html: '<p><b><u>PSAO/Chain</u></b></p>', bind: { hidden: '{isIndependent}'}},
                { xtype: 'label', html: '<p><b><u>Independent Pharmacy</u></b></p>', bind: { hidden: '{!isIndependent}'} },
                {
                    xtype: 'textfield',
                    emptyText: 'Relationship of Chain ID',
                    fieldLabel: 'Chain ID',
                    name: 'RelationshipID',
                    reference: 'RelationshipID',
                    allowBlank: false,
                    bind: {
                        hidden: '{isIndependent}'
                    }
                },
                {
                    xtype: 'textfield',
                    emptyText: 'NCPDP ID',
                    fieldLabel: 'NCPDP ID',
                    name: 'NcpdpID',
                    reference: 'NcpdpID',
                    allowBlank: false,
                    bind: {
                        hidden: '{!isIndependent}'
                    }
                },
                {
                    xtype: 'container',
                    layout: {
                        type: 'hbox',
                        align: 'center'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            emptyText: 'Rx Number',
                            fieldLabel: 'Rx Number',
                            name: 'RxNum',
                            allowBlank: false,
                            flex: 1
                        },
                        {
                            xtype: 'button',
                            iconCls: 'x-fa fa-question-circle',
                            tooltip: 'Please provide a valid rx number for a prescription filled for a MeridianRx member within the last 30 days. If you have not filled a prescription for a MeridianRx member within the last 30 days and would like a login, please contact the MeridianRx Network Department at 313-324-3800.'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Step 4 of 4',
            reference: 'form4',
            bind: {
                hidden: '{!isOnStep4}'
            },
            defaults: {
                style: {
                    padding: '5px'
                }
            },
            items: [
                { xtype: 'textfield', name: 'ContactName', fieldLabel: 'Contact Name', allowBlank: false, emptyText: 'Contact Name' },
                {
                    xtype: 'textfield',
                    vtype: 'email',
                    itemId: 'email',
                    name: 'Email',
                    fieldLabel: 'Email',
                    allowBlank: false,
                    emptyText: 'Email Address',
                    regexText: 'Validation Error',
                    listeners: {
                        blur: function(field) {
                            var confirmEmail = this.up().getComponent('confirmEmail');

                            if (confirmEmail.value) {
                                if (field.value !== confirmEmail.value) {
                                    confirmEmail.markInvalid('Confirm email does not match.');
                                    return;
                                }
                                confirmEmail.clearInvalid();
                                field.clearInvalid();
                            }
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    vtype: 'email',
                    itemId: 'confirmEmail',
                    name: 'confirmEmail',
                    fieldLabel: 'Confirm Email',
                    allowBlank: false,
                    emptyText: 'Confirm Email Address',
                    listeners: {
                        blur: function(field) {
                            var email = this.up().getComponent('email');

                            if (field.value !== email.value) {
                                field.markInvalid('Confirm email does not match.');
                                return;
                            }
                            field.clearInvalid();
                            email.clearInvalid();
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'Phone',
                    fieldLabel: 'Phone',
                    allowBlank: false,
                    emptyText: '(xxx)-xxx-xxxx',
                    enableKeyEvents: true,
                    listeners: {
                        keypress: function(field) {
                            var s = field.value;

                            if (s.charAt(0) == '+') return false;
                            var filteredValues = '"`!@#$%^&*()_+|~-=\QWERT YUIOP{}ASDFGHJKL:ZXCVBNM<>?qwertyuiop[]asdfghjkl;zxcvbnm,./\\\'';
                            var i;
                            var returnString = '';
                            for (i = 0; i < s.length; i++) {
                                var c = s.charAt(i);
                                if ((filteredValues.indexOf(c) == -1) & (returnString.length <= 13)) {
                                    if (returnString.length == 0) returnString += '(';
                                    if (returnString.length == 4) returnString += ')';
                                    if (returnString.length == 5) returnString += '-';
                                    if (returnString.length == 9) returnString += '-';
                                    returnString += c;
                                }
                            }

                            field.setValue(returnString);
                        }
                    }
                },
                {
                    xtype: 'combo',
                    name: 'SecurityQuestion1',
                    fieldLabel: 'Security <br> Question 1',
                    allowBlank: false,
                    emptyText: 'Please Select',
                    queryMode: 'local',
                    valueField: 'value',
                    displayField: 'name',
                    bind: {
                        store: '{securityQuestions}'
                    },
                    listeners: {
                        select: 'filterSecurityQuestions'
                    }
                },
                { xtype: 'textfield', name: 'Answer1', fieldLabel: 'Answer 1', allowBlank: false },
                {
                    xtype: 'combo',
                    name: 'SecurityQuestion2',
                    reference: 'SecurityQuestion2',
                    fieldLabel: 'Security <br> Question 2',
                    allowBlank: false,
                    emptyText: 'Please Select',
                    queryMode: 'local',
                    valueField: 'value',
                    displayField: 'name',
                    bind: {
                        store: '{securityQuestions}'
                    }
                },
                { xtype: 'textfield', name: 'Answer2', fieldLabel: 'Answer 2', allowBlank: false }
            ]
        },
        {
            title: 'MeridianRx MAC Portal Terms of Use',
            bind: {
                hidden: '{!isOnStep5}'
            },
            defaults: {
                style: {
                    padding: '5px'
                }
            },
            items: [
                {
                    xtype: 'label',
                    html: 'MeridianRx, LLC (“MeridianRx”) offers our contracted pharmacies with access to certain internet websites and services to assist contracted ' +
                            'pharmacies in obtaining maximum allowable cost (“MAC”) information, including current MAC pricing for a single drug, the MAC price for a particular ' +
                            'paid claim or a listing of current MAC drugs (collectively the “MAC Portal”).Use of the MAC Portal is strictly governed by the foregoing terms of use ' +
                            '(referred to throughout as “Terms of Use”). <br /><br />' +
                            '<b>1. Terms of Use.</b><br /><br />' +
                            'The MAC Portal is offered to you only under the terms and conditions listed in this Terms of Use. The MAC Portal is only made available to pharmacies ' +
                            'with an active contract with MeridianRx and for those localities that MeridianRx has chosen to make eligible for MAC Portal access. The MAC Portal is intended ' +
                            'to be used only by those PSAO/Chain pharmacies or independent pharmacies and only with one login per pharmacy or PSAO/Chain, as applicable. <br /><br />' +
                            '<b>2. Use of MAC Portal.</b><br /><br />' +
                            'MeridianRx, its parent, subsidiaries, and affiliates will not be liable for, and you waive any claim for, any personal injury, damage, and/or liability arising ' +
                            'out of your use of or reliance on the information, data, recommendations, and any other materials made available to you through MeridianRx’s MAC Portal. Content ' +
                            'provided on the MAC Portal is solely to be used for informational and educational purposes and only for your benefit. <br /><br />' +
                            '<b>3. MAC Portal Account Management.  </b><br /><br />' +
                            'You represent and warrant that you possess the legal right and ability to enter into these Terms of Use, ' +
                            'register on MAC Portal under your own name and to use MAC Portal in accordance with these Terms of ' +
                            'Use and abide by the obligations hereunder. You are solely responsible for maintaining the ' +
                            'confidentiality of the password associated with your pharmacy and for all activities that occur under' +
                            'such password. You agree to prohibit unauthorized users from using your pharmacy’s password and ' +
                            'immediately notify MeridianRx of any unauthorized use of such password or other security concerns of which you become aware. <br /><br />' +
                            '<b>4. Confidentiality.  </b><br /><br />' +
                            'Information obtained from the MAC Portal is confidential and proprietary information to MeridianRx. ' +
                                'You are granted a limited license to view the information within the MAC Portal only and obtain no ' +
                            'other rights to use, replicate, aggregate or otherwise use, interact or display the data obtained from the ' +
                            'MAC Portal in any way without the express written consent of MeridianRx. <br /><br /> ' +
                            '<b>5. Privacy and Security.</b> <br /><br /> ' +
                            '<b>Privacy.</b> MeridianRx respects your privacy and takes privacy very seriously. By accepting these Terms of ' +
                            'Use, you consent to the use and disclosure of personally identifiable information provided to ' +
                            'MeridianRx as outlined in our Privacy Policy which is incorporated herein by reference. Please review ' +
                            'our Privacy Policy before using the MAC Portal. You are responsible for keeping confidential any and all ' +
                            'usernames and passwords associated with your MAC Portal account.<br /><br /> ' +
                            '<b>Email.</b>  Occasionally, MeridianRx will contact you via email when there is new information available to ' +
                            'you on the MAC Portal. Remember that the email address you provide to MeridianRx is the address that ' +
                            'this information will be sent to. If you share your email address with another individual, that individual ' +
                            'may be able to view these notification emails in your inbox. <br /><br /> ' +
                            '<b>Security.</b> MeridianRx constantly updates its electronic security systems and processes to ensure ' +
                            'adequate safeguards are in place to protect information we maintain. However, any security system is ' +
                            'only as secure as its users allow. Please remember to change your password on a regular basis and ' +
                            'protect your user ID and password from use by others to help MeridianRx in safeguarding your information.<br /><br /> ' +
                            '<b>6. Changes to These Terms of Use.</b><br /> ' +
                            'MeridianRx, in its sole discretion, reserves the right to update or change these Terms of Use at any time ' +
                            'and for any reason by posting the modified Terms of Use. Your continued use constitutes your ' +
                            'agreement to be bound by any such revisions and you should therefore periodically visit this page of the ' +
                            'website and print the latest version of these Terms of Use for your records. The date of the last update ' +
                            'to these Terms of Use is stated at the top of this document. MeridianRx at any time may discontinue, ' +
                                'modify, or suspend the operation of this MAC Portal, including any features therein, at any time with or ' +
                                'without notice to you. MeridianRx shall not be liable to you or any third party should we exercise such right.<br /><br /> ' +
                            '<b>7. Warranties</b><br /><br /> ' +
                            'ACCESS TO THE MAC PORTAL AND ANY DATA MADE AVAILABLE THEREIN IS PROVIDED TO YOU ON AN ' +
                            '“AS IS”, “WHERE IS”, “AS AVAILABLE” AND “WITH ALL FAULTS” BASIS, AND YOUR USE OF THE DATA OR ' +
                            'THE MAC PORTAL IS ENTIRELY AT YOUR SOLE RISK. THERE ARE NO EXPRESS OR IMPLIED WARRANTIES ' +
                            'OR CONDITIONS, ORAL OR WRITTEN ASSOCIATED WITH THE MAC PORTAL, CONTENT THEREOF OR YOUR ' +
                            'ACCESS TO THE MAC PORTAL, INCLUDING THOSE OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR ' +
                            'PURPOSE, SATISFACTORY QUALITY, TITLE, NONINFRINGEMENT, CUSTOM, AND USAGE OF TRADE. ' +
                                'MERIDIANRX DOES NOT WARRANTY UNINTERUPTED OR ERROR-FREE OPERATION OF THE MAC PORTAL ' +
                            'NOR THAT ANY INFORMATION PROVIDED THROUGH THE MAC PORTAL WILL BE ACCURATE, COMPLETE, ' +
                                'UP TO DATE, RELIABLE OR USEFUL TO YOU OR TO ANYONE IN YOUR JURISDICTION. IF, FOR ANY REASON, ' +
                                'YOU ARE DISSATISFIED WITH THE MAC PORTAL OR ANY OF THE INFORMATION CONTAINED THEREIN, ' +
                                'YOUR SOLE AND EXCLUSIVE REMEDY IS TO STOP YOUR USE OF THE MAC PORTAL. <br /><br /> ' +
                            '<b>8. Limitations of Liability. </b><br /><br /> ' +
                            'MERIDIANRX, ITS PARENT, SUBSIDIARIES, AND AFFILIATES ASSUME NO RESPONSIBILITY FOR ANY ' +
                            'CONSEQUENCE RELATING DIRECTLY OR INDIRECTLY TO ANY ACTION OR INACTION YOU TAKE BASED ON ' +
                            'THE CONTENT AVAILABLE THOUGH THIS MAC PORTAL OR THIRD PARTY WEBSITE REFERENCED ' +
                            'OR HYPERLINKED ON THE MAC PORTAL. IN NO EVENT SHALL MERIDIANRX, ITS PARENT, SUBSIDIARIES OR ' +
                            'ANY AFFILIATES BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY SPECIAL, PUNITIVE, INCIDENTAL, ' +
                                'INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER ARISING OUT ' +
                            'OF OR IN CONNECTION WITH THE USE OF THIS SITE OR ANY WEB SITE REFERENCED OR LINKED TO FROM THIS MAC PORTAL.<br /><br /> ' +
                            '<b>9. General Legal Provisions. </b><br /><br /> ' +
                            '<b>General Disclaimers.</b> You acknowledge that your use of MAC Portal is at your sole risk, and that you ' +
                            'assume full responsibility for all risk associated therewith. You understand and agree that temporary ' +
                            'interruptions of the information and services available through this MAC Portal may occur as normal ' +
                            'events. You further understand and agree that MeridianRx has no control over third party networks you ' +
                            'may access in the course of the use of this site, and therefore, delays and disruption of other network ' +
                            'transmissions are completely beyond our control.<br /><br /> ' +
                            '<b>Intellectual Property.</b> All right, title and interest in the MAC Portal is to sole and exclusive property of ' +
                            'MeridianRx, one of its affiliated entities or a third party with license to MeridianRx. You agree not to ' +
                            'attempt to decipher, decompile, disassemble, or reverse engineer any portion of the MAC Portal.<br /><br /> ' +
                            '<b>Operation and Record Retention.</b> MeridianRx reserves complete and sole discretion with respect to the ' +
                            'operation of MAC Portal. MeridianRx may, among other things withdraw, suspend or discontinue any ' +
                            'functionality or feature of MAC Portal without notice. MeridianRx is not responsible for any errors that ' +
                            'occur during transmission of MAC Portal data over the internet to you.  MeridianRx is not responsible ' +
                            'for maintaining data arising from use of MAC Portal.  MeridianRx reserves the right to maintain, delete ' +
                                'or destroy all communications and materials posted or uploaded to the MAC Portal pursuant to its ' +
                            'internal record retention and/or destruction policies. <br /><br /> ' +
                            '<b>Limitations on Use.</b> You agree not to access or use MAC Portal in an unlawful ' +
                            'way or for any unlawful purpose. In the event that you have the capability to send email through the MAC Portal, you may only ' +
                            'send e-mails to other parties solely for personal communication and no other purposes, including ' +
                            'commercial purposes or for mass distributions of unsolicited email. While using the MAC Portal, you ' +
                            'agree not to post or transmit: (a) any content under a name that is not yours or a false name; or (b) any ' +
                            'content which (i) is libelous, defamatory, obscene, fraudulent, false or contrary to the ownership or ' +
                            'intellectual property rights of any other person, or (ii) contains any virus, worm, malware, trojan horse ' +
                            'or other code which is contaminating or destructive to the files or programs of MeridianRx or any of its ' +
                            'users. MeridianRx reserves the right to delete, and not return, any content provided by you that we ' +
                            'believe, in our sole discretion, contains content of a fraudulent, abusive, defamatory, obscene, ' +
                                'threatening or illegal nature, or that content that may constitute an invasive of privacy or could be a ' +
                            'violation of a copyright, trademark or other intellectual property or ownership right of any other person. ' +
                                'Additionally, you agree that your use of the MAC Portal shall not be such that precludes or otherwise ' +
                            'limits access to the MAC Portal for any other user or otherwise limits the availability or reliability of the ' +
                            'MAC Portal in MeridianRx’s sole discretion. <br /><br /> ' +
                            '<b>Term and Termination.</b> These Terms of Use shall commence upon the date you first access or use MAC ' +
                            'Portal and/or complete the registration process. Either you or MeridianRx may terminate these Terms of ' +
                            'Use and your right to use MAC Portal at any time, with or without cause, and without any ' +
                            'effect on any other legal arrangement between your and MeridianRx. The Terms of Use and the licenses granted ' +
                            'hereunder shall terminate without notice in the event you (or any authorized person using your ' +
                            'account) fail to comply with these Terms of Use, or any additional rules provided to you for the use of all ' +
                            'or a portion of the MAC Portal. MeridianRx may revise these documents from time to time in its sole ' +
                            'discretion. Upon any termination of these Terms of Use, you agree to cease any access to or use of the ' +
                            'MAC Portal. MeridianRx shall not be liable to you or any third party for any claims or damages arising ' +
                            'out of termination or any other actions in connection to the termination.<br /><br /> ' +
                            '<b>Notice.</b>  MeridianRx may provide notice by e-mail to the e-mail address you provided MeridianRx during ' +
                            'your registration, by a general notice on the MeridianRx website, or by written communication delivered ' +
                            'by first class U. S. mail or express courier to your address on record with MeridianRx. You may give ' +
                            'notice to MeridianRx by email to legaldocuments@mhplan.com or by letter delivered to MeridianRx, ' +
                                '777 Woodward Ave. Suite 600, Detroit, Michigan 48226. Attn. Legal Department. Notice of termination ' +
                            'shall be deemed given upon deposit of such notice as specified herein. <br /><br /> ' +
                            '<b>Severability of Agreement.</b> If any provision of these Terms of Use is found by a court to be invalid, ' +
                                'you agree that the court should attempt to give effect to the parties’ intentions as reflected in the provision, ' +
                                'and the other provisions of these Terms of Use remain in full force and effect. Subheadings used in ' +
                            'these Terms of Use are not to be used to construe or interpret the Terms.<br /><br /> ' +
                            '<b>Governing Law.</b>The terms and conditions of these Terms of Use and its enforcement shall be governed under the laws of the State of Michigan.<br /><br /> ' +
                            '<b>Acceptance and Acknowledgement of Terms.</b> Your use of the MAC Portal constitutes acceptance of ' +
                            'these terms. You acknowledge that you have read and are bound by these Terms of Use. <br /><br /> ' +
                            '<b>Contact Information.</b> Except as explicitly noted on this site, the services available through the MAC ' +
                            'Portal or any of MeridianRx’s other websites are offered by MeridianRx. Please contact MeridianRx ' +
                            'Network Management at 313.324.3800 if you have any questions or concerns regarding use of the MAC Portal or these Terms of Use. '
                }
            ]
        },
        {
            title: 'Success',
            bind: {
                hidden: '{!isOnStep6}'
            },
            defaults: {
                style: {
                    padding: '5px'
                }
            },
            items: {
                xtype: 'label', html: 'Your account has been created. The password will be emailed to the address provided during registration.'
            }
        }
    ]
});