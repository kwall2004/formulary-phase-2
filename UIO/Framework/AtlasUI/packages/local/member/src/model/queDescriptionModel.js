/**
 * Created by j2487 on 11/9/2016.
 */
Ext.define('Atlas.member.model.queDescriptionModel', {
    extend: 'Atlas.common.model.Base',
    proxy: {
        url: 'shared/{0}/quedescription',
        extraParams: {
            //pagination: true
        },
    reader: {
        metaProperty: 'metadata',
        rootProperty: function (record) {
            var strQueId = '';
            var localDescriptionList = [];
            for (var i = 0; i < record.data.length; i++) {
                if(record.data[i].FaxId!=""){
                    record.data[i].FaxIdCheck=true;
                }
                else {record.data[i].FaxIdCheck=false;}

                if (strQueId.indexOf(',' + record.data[i].QueID + '#') < 0) {
                record.data[i].isUpdated=false;
                localDescriptionList.push(record.data[i]);
                strQueId = strQueId + ',' + record.data[i].QueID + '#';

            }
            }
            record.total=localDescriptionList.length;
           // var firstBy=(function(){function e(f){f.thenBy=t;return f}function t(y,x){x=this;return e(function(a,b){return x(a,b)||y(a,b)})}return e})();
           //  localDescriptionList.sort(
           //      firstBy(function (v1, v2) { return v1.QueID - v2.QueID; })
           //      // .thenBy(function (v1, v2) { return v1.name > v2.name; })
           //  );
            return localDescriptionList;
        }
    }
}

});