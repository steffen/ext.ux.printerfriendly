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
};/*  Ext.ux.PrinterFriendly
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

Ext.ux.PrinterFriendly.onReady = function(fn, scope, options) {
  if (!Ext.ux.PrinterFriendly.isPrinting()) {
    Ext.EventManager.onDocumentReady(fn, scope, options);
  }
};
  
Ext.ux.PrinterFriendly.onPrinting = function(fn, scope, options){
  if (Ext.ux.PrinterFriendly.isPrinting()) {
    Ext.util.CSS.removeStyleSheet('hide-body-css');
    Ext.EventManager.onDocumentReady(fn, scope, options);
  }   
};/*  Ext.ux.PrinterFriendly
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

Ext.namespace('Ext.ux.PrinterFriendly.util.CSS');

Ext.ux.PrinterFriendly.util.CSS.addStyleSheet = function(url, options){
    // var ss = { tag: 'link', rel: 'stylesheet', type: 'text/css', href: url };
    // Not working in Safari (DOM Exception 9):
    // Ext.DomHelper.append(document.getElementsByTagName("head")[0], ss);
    
    var defaults = { rel: 'stylesheet', type: 'text/css', media: 'all' };
    var options = Ext.apply(defaults, options || {});
  
    var ss = document.createElement("link");
    ss.setAttribute("rel", options.rel);
    ss.setAttribute("type", options.type);
    ss.setAttribute("media", options.media);
    ss.setAttribute("href", url);
    document.getElementsByTagName("head")[0].appendChild(ss);
};/*  Ext.ux.PrinterFriendly
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

Ext.namespace("Ext.ux.grid");

Ext.ux.grid.PrinterGridPanel = Ext.extend(Ext.grid.GridPanel, {
  getView : function(){
      if(!this.view){
          this.view = new Ext.ux.grid.PrinterGridView(this.viewConfig);
      }
      return this.view;
  }
});/*  Ext.ux.PrinterFriendly
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

Ext.ux.grid.PrinterGridView = Ext.extend(Ext.grid.GridView, {

  init: function(grid){
    var ts = this.templates || {};
    if(!ts.master){
      ts.master = new Ext.Template('<table border="0" cellspacing="0" cellpadding="0" class="x-printer-grid3">',
                                      '{header}',
                                      '<tbody>',
                                        '{body}',
                                      '</tbody>',
                                    '</table>');
    }
    
    if(!ts.header){
        ts.header = new Ext.Template(
                '<thead><tr class="x-grid3-hd-row">{cells}</tr></thead>'
                );
    }
    
    if(!ts.hcell){
        ts.hcell = new Ext.Template(
                '<td class="x-grid3-hd x-grid3-cell {css}x-grid3-td-{id}" style="{style}">',
                '{value}',
                "</td>"
                );
    }
    
    if(!ts.row){
        ts.row = new Ext.Template(
                '<tr class="x-grid3-row">{cells}</tr>'
                );
    }

    if(!ts.cell){
        ts.cell = new Ext.Template(
                '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} x-grid3-cell-inner {css}" style="{style}" tabIndex="0" {cellAttr}>',
                '{value}',
                "</td>"
                );
    }
    
    this.templates = ts;
    
    Ext.ux.grid.PrinterGridView.superclass.init.call(this, grid);
  },
  
  initElements : Ext.emptyFn,
  
  // private
  layout : Ext.emptyFn,
  
  refresh : function(headersToo){
      this.fireEvent("beforerefresh", this);
      this.grid.stopEditing();

      this.renderMaster();

      if(headersToo === true){
          this.updateHeaders();
          this.updateHeaderSortState();
      }
      // this.processRows(0, true);
      this.layout();
      this.applyEmptyText();
      this.fireEvent("refresh", this);
  },
  
  // private
  renderHeaders : function(){
      var cm = this.cm, ts = this.templates;
      var ct = ts.hcell;

      var cb = [], sb = [], p = {};
      
      var len = cm.getColumnCount();
      var last = len - 1;
      for(var i = 0; i < len; i++){
          p.id = cm.getColumnId(i);
          p.css = i == 0 ? 'x-grid3-cell-first ' : (i == last ? 'x-grid3-cell-last ' : '');
          p.value = cm.getColumnHeader(i) || "&nbsp;";
          p.style = this.getColumnStyle(i, true);
          cb[cb.length] = ct.apply(p);
      }
      return ts.header.apply({cells: cb.join("")});
  },
  
  // private
  renderMaster : function(){
    var header = this.renderHeaders();
    var rows = this.renderRows();
    var body = this.templates.body.apply({rows: rows});
    
    var html = this.templates.master.apply({
        header: header,
        body: body
    });
    
    this.mainBody = this.grid.getGridEl();
    this.mainBody.update(html);
  },
  
  afterRender : Ext.emptyFn,
  
  // private
  afterRenderUI : function(){
      this.renderMaster();
  },
  
  // private
  getColumnStyle : function(col, isHeader){
      var style = !isHeader ? (this.cm.config[col].css || '') : '';
      // remove width style
      // style += 'width:'+this.getColumnWidth(col)+';';
      if(this.cm.isHidden(col)){
          style += 'display:none;';
      }
      var align = this.cm.config[col].align;
      if(align){
          style += 'text-align:'+align+';';
      }
      return style;
  },
  
  // disabled methods
  
  scrollToTop : Ext.emptyFn,
  
  updateSortIcon : function(col, dir){},
  
  updateAllColumnWidths : Ext.emptyFn,
  
  updateColumnWidth : function(col, width){},
  
  updateColumnHidden : function(col, hidden){}
  
});/*  Ext.ux.PrinterFriendly
 *  (c) 2009 Steffen Hiller (http://www.extjswithrails.com)
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

Ext.ux.grid.PrinterGroupingView = Ext.extend(Ext.ux.grid.PrinterGridView, {

  // private
  initTemplates : function(){
      Ext.ux.grid.PrinterGroupingView.superclass.initTemplates.call(this);

      if(!this.startGroup){
          this.startGroup = new Ext.XTemplate(
              '<tr id="{groupId}" class="x-grid-group {cls}">',
                  // '<div id="{groupId}-hd" class="x-grid-group-hd" style="{style}"><div>', this.groupTextTpl ,'</div></div>',
                  '<td colspan="', this.grid.colModel.getColumnCount(true), '"><div id="{groupId}-hd" class="x-grid-group-hd" style="{style}"><div>', this.groupTextTpl ,'</div></div></td>'// ,
                  // '<div id="{groupId}-bd" class="x-grid-group-body">'
          );
      }
      this.startGroup.compile();
      this.endGroup = '';
  },

  getGroup : Ext.grid.GroupingView.prototype.getGroup,

  getGroupField : Ext.grid.GroupingView.prototype.getGroupField,

  doGroupStart : Ext.grid.GroupingView.prototype.doGroupStart,

  doGroupEnd : Ext.grid.GroupingView.prototype.doGroupEnd,

  renderRows : function(){
      var groupField = this.getGroupField();
      var eg = !!groupField;
      // if they turned off grouping and the last grouped field is hidden
      if(this.hideGroupedColumn) {
          var colIndex = this.cm.findColumnIndex(groupField);
          if(!eg && this.lastGroupField !== undefined) {
              this.mainBody.update('');
              this.cm.setHidden(this.cm.findColumnIndex(this.lastGroupField), false);
              delete this.lastGroupField;
          }else if (eg && this.lastGroupField === undefined) {
              this.lastGroupField = groupField;
              this.cm.setHidden(colIndex, true);
          }else if (eg && this.lastGroupField !== undefined && groupField !== this.lastGroupField) {
              this.mainBody.update('');
              var oldIndex = this.cm.findColumnIndex(this.lastGroupField);
              this.cm.setHidden(oldIndex, false);
              this.lastGroupField = groupField;
              this.cm.setHidden(colIndex, true);
          }
      }
      return Ext.ux.grid.PrinterGroupingView.superclass.renderRows.apply(
                  this, arguments);
  },
  
  // private
  doRender : function(cs, rs, ds, startRow, colCount, stripe){
      if(rs.length < 1){
          return '';
      }
      var groupField = this.getGroupField();
      var colIndex = this.cm.findColumnIndex(groupField);

      this.enableGrouping = !!groupField;

      if(!this.enableGrouping || this.isUpdating){
          return Ext.grid.GroupingView.superclass.doRender.apply(
                  this, arguments);
      }
      var gstyle = 'width :100%;';

      var gidPrefix = this.grid.getGridEl().id;
      var cfg = this.cm.config[colIndex];
      var groupRenderer = cfg.groupRenderer || cfg.renderer;
      var prefix = this.showGroupName ?
                   (cfg.groupName || cfg.header)+': ' : '';

      var groups = [], curGroup, i, len, gid;
      for(i = 0, len = rs.length; i < len; i++){
          var rowIndex = startRow + i;
          var r = rs[i],
              gvalue = r.data[groupField],
              g = this.getGroup(gvalue, r, groupRenderer, rowIndex, colIndex, ds);
          if(!curGroup || curGroup.group != g){
              gid = gidPrefix + '-gp-' + groupField + '-' + Ext.util.Format.htmlEncode(g);
             	// if state is defined use it, however state is in terms of expanded
			// so negate it, otherwise use the default.
			var isCollapsed  = this.state && typeof this.state[gid] !== 'undefined' ? !this.state[gid] : this.startCollapsed;
			var gcls = isCollapsed ? 'x-grid-group-collapsed' : '';	
              curGroup = {
                  group: g,
                  gvalue: gvalue,
                  text: prefix + g,
                  groupId: gid,
                  startRow: rowIndex,
                  rs: [r],
                  cls: gcls,
                  style: gstyle
              };
              groups.push(curGroup);
          }else{
              curGroup.rs.push(r);
          }
          r._groupId = gid;
      }

      var buf = [];
      for(i = 0, len = groups.length; i < len; i++){
          var g = groups[i];
          this.doGroupStart(buf, g, cs, ds, colCount);
          buf[buf.length] = Ext.grid.GroupingView.superclass.doRender.call(
                  this, cs, g.rs, ds, g.startRow, colCount, stripe);

          this.doGroupEnd(buf, g, cs, ds, colCount);
      }
      return buf.join('');
  },
  
});/*  Ext.ux.PrinterFriendly
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
  
});/*  Ext.ux.PrinterFriendly
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
}/*  Ext.ux.PrinterFriendly
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

if (Ext.ux.PrinterFriendly.isPrinting()) {
  Ext.ux.PrinterFriendly.util.CSS.addStyleSheet(Ext.ux.PrinterFriendly.ROOT + '/resources/css/printer-friendly.css');
  Ext.util.CSS.createStyleSheet('body { display: none }', 'hide-body-css');
}