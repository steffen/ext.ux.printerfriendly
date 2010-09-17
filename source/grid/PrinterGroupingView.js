/*  Ext.ux.PrinterFriendly
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
  
});