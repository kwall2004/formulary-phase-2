Ext.define('Atlas.letter.controller.MemberInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.memberinfoctrl',
    listen:{
        controller:{
            'createeditletterctrl' : {
                XTLoadMemberRecord : 'onLoadRecordInfo',
                ResetAllMemberFields: 'onResetAllFields'
            }
        }
    },

    onLoadRecordInfo: function(rec) {
        var me = this;
        // if(rec.get('@enrollmentStatus') == 'Active'){
        //     rec.set('@enrollmentStatus','<font color="green"><strong>'+rec.get('@enrollmentStatus')+'</strong></font><span class="fa fa-flag" aria-hidden="true"></span>');
        // }
        // else{
        //     rec.set('@enrollmentStatus','<font color="red"><strong>'+rec.get('@enrollmentStatus')+'</strong></font><span class="fa fa-flag" aria-hidden="true"></span>');
        // }

        var flagTtem = me.getView().down('#enrollStatus');
        if (rec.get('@enrollmentStatus').indexOf('Active') > -1 )
        {
            flagTtem .removeCls('m-red-color');
            flagTtem .addCls('m-green-color');
            rec.set('@enrollmentStatus','<font color="green"><strong>'+rec.get('@enrollmentStatus')+'</strong></font>');
            flagTtem .setFieldStyle({color :'green' ,fontweight:'bold'});
        }
        else
        {
            flagTtem .removeCls('m-green-color');
            flagTtem .addCls('m-red-color');
            rec.set('@enrollmentStatus','<font color="red"><strong>'+rec.get('@enrollmentStatus')+'</strong></font>');
            flagTtem .setFieldStyle({color :'red' , fontweight:'bold'});
        }
        me.getView().loadRecord(rec);
    },

    displayMemberName: function(value) {
        var me = this,
            memberstore = me.getStore('memberinfodata').findRecord('firstname',value);

        if(memberstore.data.LetterName!=='undefined') {
            return memberstore.data.firstname + ' ' + memberstore.data.lastname;
        }
        else {
            return value;
        }

    },

    onResetAllFields: function() {
        var me = this,
            myView = me.getView();
        myView.getForm().reset();
    }

});