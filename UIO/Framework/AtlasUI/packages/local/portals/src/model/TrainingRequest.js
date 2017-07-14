/**
 * Created by c4147 on 12/4/2016.
 */
Ext.define('Atlas.portals.model.TrainingRequest', {
  extend: 'Atlas.common.model.Base',
  proxy: {
    url: 'member/hp/listitems'
  }
});