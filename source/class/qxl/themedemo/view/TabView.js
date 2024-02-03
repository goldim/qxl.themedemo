/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */

qx.Class.define("qxl.themedemo.view.TabView",
{
  extend: qx.ui.tabview.TabView,


  construct: function()
  {
    this.base(arguments);

    this.init();
    this.addListener("changeSelection", this.__rememberCurrentTab, this);
    this.__setCurrentTab();
  },

  members:
  {
    init: function() 
    {
      var controls, classname;

      // Form
      classname = "qxl.themedemo.pages.Form";
      controls = {disabled: true, hovered: true, focused: true, invalid: true};
      var form = new qxl.themedemo.view.TabPage("Form", classname, controls);
      this.add(form);

      // Tree
      classname = "qxl.themedemo.pages.Tree";
      controls = {disabled: true};
      var tree = new qxl.themedemo.view.TabPage("Tree", classname, controls);
      this.add(tree);

      // List
      classname = "qxl.themedemo.pages.List";
      controls = {disabled: true};
      var list = new qxl.themedemo.view.TabPage("List", classname, controls);
      this.add(list);

      // Menu
      classname = "qxl.themedemo.pages.ToolBar";
      controls = {disabled: true, hovered: true, selected: true, hidesome: true};
      var menu = new qxl.themedemo.view.TabPage("Toolbar/Menu", classname, controls);
      this.add(menu);

      // Window
      classname = "qxl.themedemo.pages.Window";
      controls = {disabled: true};
      var win = new qxl.themedemo.view.TabPage("Window", classname, controls);
      this.add(win);

      // Tab
      classname = "qxl.themedemo.pages.Tab";
      controls = {disabled: true, overflow: true};
      var tab = new qxl.themedemo.view.TabPage("Tab", classname, controls);
      this.add(tab);

      // EmbedFrame
      classname = "qxl.themedemo.pages.EmbedFrame";
      controls = {};
      var embedFrame = new qxl.themedemo.view.TabPage("EmbedFrame", classname, controls);
      this.add(embedFrame);

      // Misc
      classname = "qxl.themedemo.pages.Misc";
      controls = {disabled: true};
      var misc = new qxl.themedemo.view.TabPage("Misc", classname, controls);
      this.add(misc);
    },

    __rememberCurrentTab: function(e) {
      qx.bom.Cookie.set("currentTab", e.getData()[0].getLabel());
    },

    __setCurrentTab: function() {
      var cookie = qx.bom.Cookie.get("currentTab") ||
                   qx.bom.Cookie.set("currentTab", "basic");

      var currentTab = new qx.type.Array().append(this.getSelectables()).filter(function(tab) {
        return tab.getLabel() == cookie;
      })[0];

      if (currentTab) {
        this.setSelection([currentTab]);
      }
    }
  }
});
