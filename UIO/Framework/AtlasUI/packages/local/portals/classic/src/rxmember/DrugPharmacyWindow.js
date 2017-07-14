/**
 * Created by c4539 on 10/12/2016.
 */
Ext.define('Atlas.portals.rxmember.DrugPharmacyWindow', {
    extend: 'Ext.Container',

    xtype: 'portalsrxmemberdrugpharmacywindow',

    items: {
        xtype: 'panel',
        defaults: {
            margin: '10px'
        },
        items: [
            {
                xtype: 'displayfield',
                labelSeparator: '',
                fieldLabel: '<a href="http://www.kroger.com/generic/Pages/default.aspx" target="_blank">Kroger Pharmacy</a>'
            },
            {
                xtype: 'fieldset',
                iconCls: 'x-fa fa-home',
                collapsible: true,
                style: {
                    width: '300px'
                },
                title: 'Kroger Pharmacy (Zip:48188)',
                items: [
                    {
                        xtype: 'label',
                        html: '<p>45540 Michigan Ave</p><p>Canton, MI 48188</p><p>734-397-2560</p>'
                    },
                    {
                        xtype: 'button',
                        text: 'Google Map',
                        handler: function() {
                            window.open('https://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=45540+Michigan+Avenue,+Canton,+MI&aq=0&sll=37.160317,-95.712891&sspn=47.712237,74.179688&ie=UTF8&hq=&hnear=45540+Michigan+Ave,+Canton,+Michigan+48188&z=16');
                        }
                    }
                ]
            },
            {
                xtype: 'displayfield',
                labelSeparator: '',
                fieldLabel: '<a href="http://sites.target.com/site/en/health/page.jsp?contentId=PRD03-004319&ref=tgt_adv_XS000000&CPNG=target+pharmacy&adgroup=$4+generic+drugs&LNM=4%20drugs&MT=broad&AFID=googlestr&LID=28p3949872&KID=022770c4-0e64-1648-8b11-00000cf7a26f" target="_blank">Target Pharmacy</a>'
            },
            {
                xtype: 'fieldset',
                iconCls: 'x-fa fa-home',
                collapsible: true,
                style: {
                    width: '300px'
                },
                title: 'Target Pharmacy (Zip:48188)',
                items: [
                    {
                        xtype: 'label',
                        html: '<p>47330 Michigan Ave</p><p>Canton, MI 48188</p><p>734-714-2113</p>'
                    },
                    {
                        xtype: 'button',
                        text: 'Google Map',
                        handler: function() {
                            window.open('https://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=47730+Michigan+Avenue,+Canton,+MI&aq=&sll=42.275044,-83.474514&sspn=0.087768,0.144882&ie=UTF8&hq=&hnear=47730+Michigan+Ave,+Canton,+Michigan+48188&z=16');
                        }
                    }
                ]
            },
            {
                xtype: 'displayfield',
                labelSeparator: '',
                fieldLabel: '<a href="http://www.walmart.com/cp/1078664?adid=77777777915300001647&wmlspartner=PSPharmacy" target="_blank">Walmart Pharmacy</a>'
            },
            {
                xtype: 'fieldset',
                iconCls: 'x-fa fa-home',
                collapsible: true,
                style: {
                    width: '300px'
                },
                title: 'Walmart Pharmacy (Zip:48188)',
                items: [
                    {
                        xtype: 'label',
                        html: '<p>4555 Michigan Ave</p><p>Canton, MI 48188</p><p>734-985-9429</p>'
                    },
                    {
                        xtype: 'button',
                        text: 'Google Map',
                        handler: function() {
                            window.open('https://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q=4555+Michigan+Avenue,+Canton,+MI&aq=0&sll=42.275044,-83.474514&sspn=0.087768,0.144882&ie=UTF8&hq=&hnear=Michigan+Ave,+Canton,+Michigan&z=13');
                        }
                    }
                ]
            }
        ]
    }
});