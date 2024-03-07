/* ************************************************************************

   Copyright:
     2015-2021 Norbert Schröder

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Norbert Schröder (scro34)
     * Dmitrii Zolotov (goldim)

************************************************************************ */

/**
 * @usefont(MaterialIcons)
 */
qx.Class.define("qxl.themedemo.window.WidgetBrowser", {
  extend: qxl.themedemo.window.Window,

  members: {
    _tabView: null,

    _createControls() {
      this.set({
        layout: new qx.ui.layout.VBox(),
        contentPadding: [10, 0, 0, 0],
        caption: "WidgetBrowser",
        icon: qxl.themedemo.IconFactory.getInstance().getIcon("WIDGET_BROWSER_SMALL"),
      });

      this._tabView = new qxl.widgetbrowser.view.TabView();
      const tabsToRemove = ["Table", "Basic", "Control"];
      this._tabView.getChildren().forEach((page) => {
        if (tabsToRemove.includes(page.getLabel())) {
          this._tabView.remove(page);
        }
      });
      this._tabView.set({
        minWidth: 880,
        minHeight: 610,
        padding: 5,
      });

      this.add(this._tabView, { flex: 1 });
    },
  },
});
