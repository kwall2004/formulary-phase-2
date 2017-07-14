Ext.define('Atlas.portals.hpmember.model.MemberLob', {
    extend: 'Atlas.common.model.Base',
    //extend: 'Atlas.common.model.StaticBase',

    fields: [
        { name: 'name' }
    ],

    proxy: {
        url: 'member/hp/memberloblist'
        //url: 'resources/data/dummydata/portals/member/memberLobList.json'
    }
});