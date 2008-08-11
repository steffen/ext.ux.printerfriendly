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
  
  // private
  renderUI : function(){
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
  
});