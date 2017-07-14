Ext.define('Atlas.atlasformulary.store.DrugCategoriesView', {
  extend: 'Atlas.atlasformulary.store.Base',
  alias: 'store.drugcategoriesview',
  model: 'Atlas.atlasformulary.model.DrugCategory',

  proxy: {
    url: '/drugcategory',
    limitParam: 'pagesize',
    pageParam: 'page',

    extraParams: {
      formularysk: null,
      isnewrequest: true
    }
  }
});
