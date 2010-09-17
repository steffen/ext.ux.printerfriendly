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

Ext.ux.PrinterWindow = Ext.extend(Ext.Window, {
  
  plain: true,
  
  modal: true,
  
  maximizable: true,
  
  initComponent : function() {
    this.id = 'printer-window';
    this.width = this.width || 800;
    this.height = this.height || 600;
    this.title = this.title || 'Print Preview';
    this.closeText = this.closeText || 'Close';
    this.printText = this.printText || 'Print';
    
    this.html = { id: 'printer-iframe', name: 'printer-iframe', tag: 'iframe', src: this.iframeSrc(), width: '100%', height: '100%', frameborder: '0' }
    
    this.buttons = [{ text: this.closeText, handler: this.close, scope: this }, { text: this.printText, handler: this.print, scope: this }]
    
    Ext.ux.PrinterWindow.superclass.initComponent.call(this);
  },
  
  show : function(animateTarget, cb, scope) {
    Ext.ux.PrinterWindow.superclass.show.call(this, animateTarget, cb, scope);
    this.maximize();
    this.tools.restore.hide();
  },
  
  print : function() {
    var iframe_window = this.getIframeWindow();
    if (Ext.isIE) { iframe_window.focus(); }
    iframe_window.print();
  },
  
  getIframe : function() {
    return Ext.get('printer-iframe');
  },
  
  getIframeWindow : function() {
    return this.getIframe().dom.contentWindow;
  },
  
  // private
  iframeSrc : function() {
    var href = window.location.href.split('#')[0];
    return href + (href.match(/\?/) ? '&' : '?' ) + '_format=printerfriendly';
  }
  
});