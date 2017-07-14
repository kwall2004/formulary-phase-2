// k3279 - Kevin Tabasan - 11/28/2016

Ext.define('Atlas.portals.view.provider.Formularies', {
  extend: 'Ext.panel.Panel',
  xtype: 'portalsproviderformularies',
  controller: 'portalsproviderformularies',
  title: 'Formularies',

  items: [{
    xtype: 'panel',
    cls: 'card-panel',
    title: 'Michigan Formularies',
    reference: 'miFormularies',
    width: 700,

    html: '<div style="margin: 15px;">Click each link below to open the PDF of the selected formulary.<br><br>' +
      '<b>Medicaid</b><br>' +
      '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=+nmIKZ4GkI5TZaXuUPQScQXACi+Z7EJ7i29raPGWkcGr' +
      'YkmgpTpCssp5LWVpOySJQZmE+zMe9m8eUfztcdKUww==" target="_blank">Meridian Health Plan 2016</a><br>' +
      '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=0buXjHB0WP0KGdyGgEF7XhFIrWulYBDy81gF2wOjWdira' +
      '0aaeBOWfJ30nBX5hIEi0fNoWiH3qtzMau+FqNBwDA==" target="_blank">Meridian Health Plan 2017</a><br><br>' +
      '<b>Medicaid Expansion</b><br>' +
      '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=+nmIKZ4GkI5TZaXuUPQScQXACi+Z7EJ7i29raPGWkcGrY' +
      'kmgpTpCssp5LWVpOySJQZmE+zMe9m8eUfztcdKUww==" target="_blank">Healthy Michigan Plan 2016</a><br>' +
      '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=0buXjHB0WP0KGdyGgEF7XhFIrWulYBDy81gF2wOjWdira' +
      '0aaeBOWfJ30nBX5hIEi0fNoWiH3qtzMau+FqNBwDA==" target="_blank">Healthy Michigan Plan 2017</a><br><br>' +
      '<b>Medicare</b><br>' +
      '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=ai7DjqW4q4kocjjoN1vn09V63OopUyXe7sAXYYunkVPZ/' +
      'jsMGJU8acl5PySuudZ0iXkbVpg2PD++KNa23sm0cw==" target="_blank">Meridian Advantage Plan of Michigan 2016</a><br>' +
      '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=B2mEXLLyF4jJCcUfNzJg1DTcTNtWw8DRJM/XPfdIrPbEE' +
      'tywNuNA/CORYdnL5HZED1O/ZX5FSr9HS9kDv4Q0ow==" target="_blank">Meridian Prime 2016</a><br>' +
      '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=egbQLpLsOHKs2CHvwRgFIGRIQUqWg3UBr/tT6Zv9fNMMv' +
      'PBvdsrcL6kVPW7kyrW/cpUCkUwWAza8SUtHeENPaA==" target="_blank">Meridian Complete 2016</a><br>' +
      '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=h2+DxNM7zTJAmpxAEll7CKpMVjcrqGd9PUEeWbUBWhaYq' +
      'nSfunRTnv8waNN68njVi3ePXUNAzdmO3d0eKfkVSQ==" target="_blank">Meridian Complete 2017</a><br>' +
      '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=9YJtpCzPnfE9GdiV/5NIBLplRRF0VgNECqoAP7ted7Ofr' +
      '3QXuxKHxk4+ZImPIGxcM/0ZOMB1Q5TQpU2O6JiluA==" target="_blank">Advantage-Plus Meridian 2016</a></b><br><br>' +
      '<b>Marketplace</b><br>' +
      '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=vhT0ucSI6a4F2W7m5GEF0zJpsprCgx6s+Vo/WdCNjdC72' +
      'g+z1/XEsYMBHqIWpgSlslequqJ4UY5QToAza83eWA==" target="_blank">Meridian Choice 2016</a><br>' +
      '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=hqMG7j16EcZG//v4tgZ6LJCBBo8DyeRiOf/KNsGe51bJS' +
      'C06kwExQ3QHH+dZIBTVHIZ+ddnccRP7f410lGjmiA==" target="_blank">Meridian Choice 2017</a><br></div>'
  }, {
    xtype: 'panel',
    cls: 'card-panel',
    title: 'Illinois Formularies',
    reference: 'ilFormularies',
    width: 700,

    html: '<div style="margin: 15px;">Click each link below to open the PDF of the selected formulary.<br><br>' +
        '<b>Medicaid</b><br>' +
        '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=1yzkKug9vEcWd8RmxnudpRnSffErDubYHuSDVcs7kAK' +
        'F2AkwvLPe8u6h6Gg/+LF8m7XTxiohVWkPAgkNGh501w==" target="_blank">Meridian Health Plan 2016</a><br>' +
        '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=jKVB3648PFI77CUgs4eQyFQzxuM6iecP0msIaAYqHRw' +
        'aY5uwCgrHUUJYaDhg7Vusbp4wZsFVVj6yG9rUKon3ew==" target="_blank">Meridian Health Plan 2016</a><br><br>' +
        '<b>Medicare</b><br>' +
        '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=D2m+MV6rtCYk6wad36Qnk7rtR0QsKPUC6JCyuPFr/CF' +
        '9g9Ao/tose5pCnGNz2nYLmHlwqnifpIo4nLz+cWrVVA==" target="_blank">Meridian Advantage Plan of Michigan 2016</a>' +
        '<br><a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=Wc+U0Dpe/rcgoCs6LgXZXLDY2mGQ61UY1NkEXus' +
        '9JDkH5wGN+tydJMyMuTkLg/Hqc2jMJ6ndp8kcHL0qZqlqVQ==" target="_blank">Meridian Prime 2016</a><br>' +
        '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=JQpxIhFwbsqretvuOkMqUAgqMxVujaUcObR9gxkkfMO' +
        'ursdKkoi2LhcBuMZ7e1Xfk6b9zZUrotRWCHjqYxgveA==" target="_blank">Meridian Complete 2016</a><br>' +
        '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=HmpmsuB8s58vevcdTjmI5WrsjZTmogGxzC6QoPnDOWE' +
        'gkSccZmThJJ06hRRtFU7vgs2ICJfq4U7RoKtWW335hg==" target="_blank">Meridian Complete 2017</a><br>' +
        '<a href="https://corp.mhplan.com/ContentDocuments/default.aspx?x=B0q5bdBwxWY8Cfey91m/sOU2Zbzc6TS3A2tZTSYIxwP' +
        'zUMrq2j1hcsyDkRAdXZgbKZZGPJARmDYMAakXmCmVPA==" target="_blank">Advantage-Plus Meridian 2016</a></b><br></div>'
  }]
});