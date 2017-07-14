Ext.define('Atlas.portals.provider.ContactController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.portalsprovidercontact',

  init: function () {
    if ('MI' === Ext.first('viewport').getViewModel().get('user').providerStateSelected) {
      Ext.getCmp('mycontact').items.items[0].setHtml('<b>Contact Information for Meridian Health Plan</b><br/>' +
      'We are located at : 1 Campus Martius, Detroit, MI 48226 <br/> ' +
      'Phone : 313-324-3700  <br/> ' +
      'Fax : 313-202-0006');

      Ext.getCmp('mycontact').items.items[1].setHtml('<p><b>For Members:</b><br/>' +
      'Call Member Services at 888-437-0606<br/>' +
      'Non-Emergency Transportation Service: 800-821-9369 <br/>' +
      'Behavioral Health Services: 888-222-8041</p>');

      Ext.getCmp('mycontact').items.items[2].setHtml('<p><b>For Physicians:</b><br/>' +
      'To contact the Care Management department, please locate your county from the list below.<br/>' +
      'Care Management Region 1 - 1-888-322-8843 (Allegan, Barry, Berrien, Calhoun, Cass, Kalamazoo, Ottawa, St. ' +
      'Joseph, Van Buren and Washtenaw)<br/>' +
      'Care Management Region 2 - 1-800-845-8959 (Branch, Clinton, Crawford, Eaton, Hillsdale, Jackson, Lake, ' +
      'Lenawee, Mason, Mecosta, Monroe, Osceola, Otsego, Shiawassee and Wayne)<br/>' +
      'Care Management Region 3 - 1-888-322-8844 (Genesee, Huron, Kent, Livingston, Macomb, Manistee, Muskegon, ' +
      'Montcalm, Newaygo, Oakland, Oceana, Ogemaw, Oscoda, Roscommon, Saginaw, Sanilac, St. Clair and Tuscola)</p>');

      Ext.getCmp('mycontact').items.items[3].setHtml('<p><b>For Behavioral Health Providers:</b><br/>' +
      'Contact the Behavioral Health Care Management Department at 888-222-8041</p>');

      Ext.getCmp('mycontact').items.items[4].setHtml('<p><b>Pharmacy Prior Authorization Requests:</b> <br/>' +
      'Submit your request by fax to MeridianRx at 1-877-355-8070. <br/>' +
      'You may call MeridianRx at 1-866-984-6462 with any questions or concerns 24 hours a day.</p>');

      Ext.getCmp('mycontact').items.items[5].setHtml('<p><b>There is a new fax number to submit all PA requests. ' +
      'You will also see the appropriate number on the printed prior authorization form.</b> </br>' +
      '313-309-8580</p>');
    } else if ('IL' === Ext.first('viewport').getViewModel().get('user').providerStateSelected) {
      Ext.getCmp('mycontact').items.items[0].setHtml('<b>Contact Information for Meridian Health Plan</b><br/>' +
      'We are located at : 333 S. Wabash Ave. Suite 2900, Chicago, IL 60604<br/> ' +
      'Phone : 312-705-2900<br/> ' +
      'Fax : 312-980-0404');

      Ext.getCmp('mycontact').items.items[1].setHtml('<p><b>Michigan Office : 1 Campus Martius, Detroit, MI ' +
      '48226</b></p>');

      Ext.getCmp('mycontact').items.items[2].setHtml('<p><b>For Members</b><br/>Call Member Services at ' +
      '866-606-3700<br/>' +
      'Transportation Services: 866-796-1165</p>');

      Ext.getCmp('mycontact').items.items[3].setHtml('<p><b>For Physicians:</b><br/>' +
      'If you are interested in becoming a Meridian Health Plan participating provider, please contact Derek ' +
      'Punzalan, Director of Network Development at 312-980-2371, or e-mail at Derek.punzalan@mhplan.com.</p>');

      Ext.getCmp('mycontact').items.items[4].setHtml('<p><b>For Behavioral Health Providers:</b><br/>' +
      'Contact the Behavioral Health Care Management Department at 866-796-1167</p>');

      Ext.getCmp('mycontact').items.items[5].setHtml('<p><b>There is a new fax number to submit all PA requests. You ' +
      'will also see the appropriate number on the printed prior authorization form.</b> </br>' +
      '312-508-7299</p>');
    }
  }
});
