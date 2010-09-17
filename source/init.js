/*  Ext.ux.PrinterFriendly
 *  (c) 2008 Steffen Hiller (http://www.extjswithrails.com)
 *
 *  License: Ext.ux.PrinterFriendly is licensed under the terms of
 *  the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 *  that the code/component(s) do NOT become part of another Open Source or Commercially
 *  licensed development library or toolkit without explicit permission.
 *
 *  License details: http://www.gnu.org/licenses/lgpl.html
 *
 *  This is an extension for the Ext JS Library, for more information see http://www.extjs.com.
 *--------------------------------------------------------------------------*/

Ext.ux.PrinterFriendly.addJavaScript = function(url) {
      var js = document.createElement('script');
      js.setAttribute('type', 'text/javascript');
      js.setAttribute('src', url);
      document.getElementsByTagName("head")[0].appendChild(js);
   };


Ext.ux.PrinterFriendly.addJavaScript(Ext.ux.PrinterFriendly.ROOT + '/core/Ext.js');
Ext.ux.PrinterFriendly.addJavaScript(Ext.ux.PrinterFriendly.ROOT + '/core/EventManager.js');
Ext.ux.PrinterFriendly.addJavaScript(Ext.ux.PrinterFriendly.ROOT + '/util/CSS.js');
Ext.ux.PrinterFriendly.addJavaScript(Ext.ux.PrinterFriendly.ROOT + '/grid/PrinterGridPanel.js');
Ext.ux.PrinterFriendly.addJavaScript(Ext.ux.PrinterFriendly.ROOT + '/grid/PrinterGridView.js');
Ext.ux.PrinterFriendly.addJavaScript(Ext.ux.PrinterFriendly.ROOT + '/PrinterWindow.js');
Ext.ux.PrinterFriendly.addJavaScript(Ext.ux.PrinterFriendly.ROOT + '/Shortcuts.js');
Ext.ux.PrinterFriendly.addJavaScript(Ext.ux.PrinterFriendly.ROOT + '/init_css.js');
