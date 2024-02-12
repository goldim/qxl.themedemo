/* ************************************************************************

   Copyright:
     2015-2021 Norbert Schröder

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

qx.Class.define("qxl.themedemo.window.About", {
  extend: qxl.themedemo.window.Window,

  construct(link) {
    this._aboutTextUrl = link;
    super();
  },

  members: {
    _aboutTextUrl: null,

    _createControls() {
      this.set({
        layout: new qx.ui.layout.VBox(0),
        caption: "About",
        contentPadding: 5,
        showMaximize: false,
        showMinimize: false,
        resizable: false,
      });

      if (this._aboutTextUrl) {
        const appName = qx.core.Environment.get("qx.application");
        const nsName = appName.replace(".Application", "");
        const OPTION_NAME = "resourceUri";
        const libManager = qx.util.LibraryManager.getInstance();
        const resourcePath = libManager.get(nsName, OPTION_NAME);
        this._aboutTextUrl = resourcePath + "/" + this._aboutTextUrl;
      } else {
        this._aboutTextUrl = "resource/qxl/themedemo/blank.html";
      }

      var url = qx.util.ResourceManager.getInstance().toUri(this._aboutTextUrl);

      var textBox = new qx.ui.embed.ThemedIframe(url).set({
        width: 580,
        height: 350
      });

      this.add(textBox, { flex: 1 });
      this.add(
        new qx.ui.menu.Separator().set({
          margin: 5,
        })
      );
      this.add(this._getButtonBox());

      this.addListenerOnce("appear", this.center, this);
    },

    _getButtonBox() {
      var btnClose = new qx.ui.form.Button("Close").set({ width: 100 });
      btnClose.addState("circle");
      btnClose.addListener("execute", this.close, this);

      var container = new qx.ui.container.Composite(
        new qx.ui.layout.HBox().set({
          alignX: "center",
        })
      );
      container.add(btnClose);

      return container;
    },
  },
});
