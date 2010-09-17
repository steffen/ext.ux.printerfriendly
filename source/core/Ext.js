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

Ext.ux.PrinterFriendly.getHtml = function() {
    return Ext.get(document.getElementsByTagName('html')[0]);
};
    
Ext.ux.PrinterFriendly.getQueryString = function() {
    return window.location.href.split('?')[1];
};
    
Ext.ux.PrinterFriendly.isPrinting = function() {
    return (Ext.urlDecode(Ext.ux.PrinterFriendly.getQueryString())._format == "printerfriendly");
};
    
// Not working as expected yet, hope to fix this for the next release
// print : function() {
//     this.printer_window = new Ext.ux.PrinterWindow();
//     this.printer_window.show();
//     this.printer_window.print();
//     this.printer_window.close();
// };
    
Ext.ux.PrinterFriendly.printPreview = function(config) {
    this.printer_window = new Ext.ux.PrinterWindow(config);
    this.printer_window.show();
};