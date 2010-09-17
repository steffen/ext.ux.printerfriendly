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

if (Ext.ux.PrinterFriendly.ENABLE_SHORTCUTS) {
  Ext.onReady = Ext.ux.PrinterFriendly.onReady;
  Ext.onPrinting = Ext.ux.PrinterFriendly.onPrinting;
  Ext.isPrinting = Ext.ux.PrinterFriendly.isPrinting;
  // Ext.print = Ext.ux.PrinterFriendly.print;
  Ext.printPreview = Ext.ux.PrinterFriendly.printPreview;
  Ext.addStyleSheet = Ext.ux.PrinterFriendly.util.CSS.addStyleSheet;
}