Ext.define('Atlas.finance.model.CheckDates', {
    extend: 'Atlas.common.model.Base',

    fields: [
        {name: 'dbRowID', type: 'string'},
        {
            name: 'checkDate',
            type: 'date',
            convert: function(v) {
                if (v !== 'All') {
                    //return Ext.util.Format.date(v, 'm/d/Y');
                    var arrDate = v.split('-');
                    var res = '';
                    if(arrDate.length == 3) {
                        res = arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0];
                    }
                    else{
                        res = Ext.util.Format.date(v, 'm/d/Y');
                    }
                    return res;
                } else {
                    return v;
                }
            }
        },
        {name: 'RowNum', type: 'int'}
    ],

    proxy: {
        url: 'finance/{0}/checkdate'
    }
});