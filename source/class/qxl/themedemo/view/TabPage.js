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

/**
 *
 * @asset(qxl/themedemo/loader.gif)
 * @use(qxl.themedemo.pages.Tree)
 * @use(qxl.themedemo.pages.List)
 * @use(qxl.themedemo.pages.Form)
 * @use(qxl.themedemo.pages.ToolBar)
 * @use(qxl.themedemo.pages.Window)
 * @use(qxl.themedemo.pages.Tab)
 * @use(qxl.themedemo.pages.EmbedFrame)
 * @use(qxl.themedemo.pages.Misc)
 */

qx.Class.define("qxl.themedemo.view.TabPage",
{
  extend: qx.ui.tabview.Page,

  include: qxl.themedemo.MControls,

  construct: function(label, classname, controls)
  {
    this.base(arguments);

    this.setLabel(label);
    this.setLayout(new qx.ui.layout.VBox(10));

    // Load content of tab on "appear"
    this.addListenerOnce("appear", function() {

      // Require part
      var part = classname.split(".").pop().toLowerCase();

      qx.io.PartLoader.require([part], function() {
        
        // Finally, instantiate class
        var clazz = qx.Class.getByName(classname);
        var pageContent = new clazz();

        // Hotfix for browser bug [#BUG #4666]
        if (qx.core.Environment.get("browser.name") == "opera" &&
            qx.core.Environment.get("browser.version") == "11.0") {
          var scroll = qx.core.Init.getApplication().getScroll().getChildControl("pane").
                   getContentElement().getDomElement();
          pageContent.addListenerOnce("appear", function() {
            if (scroll) {
              scroll.scrollTop = 0;
            }
          });
        }
        
        // Init controls for widgets of page
        this.initControls(pageContent.getWidgets(), controls);
        
        var pageContentScroller = new qx.ui.container.Scroll();
        pageContentScroller.add(pageContent);
        
        // Add to page
        this.add(pageContentScroller, {flex: 1});

        // Exclude loading indicator
        loading.setVisibility("excluded");

      }, this);
    }, this);

    // Show centered loading indicator
    var loading = new qx.ui.container.Composite(new qx.ui.layout.VBox(8).set({
      alignX: "center",
      alignY: "middle"
    }));

    var inner = new qxl.themedemo.Separator(80);

    loading.add(new qx.ui.core.Spacer(), {flex: 1});
    loading.add(new qx.ui.basic.Label("Loading page..."));
    loading.add(inner);
    loading.add(new qx.ui.core.Spacer(), {flex: 1});

    this.add(loading, {flex: 1});
  }

});
