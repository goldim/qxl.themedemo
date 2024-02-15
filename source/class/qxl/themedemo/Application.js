/* ************************************************************************

   Copyright:
     2015-2024 Norbert Schröder, Dmitrii Zolotov

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

qx.Class.define("qxl.themedemo.Application", {
  extend: qx.application.Standalone,

  members: {
    main(options) {
      super.main();

      if (qx.core.Environment.get("qx.debug")) {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      /***************************************************************************/

      const desktop = qxl.themedemo.Desktop.getInstance();
      const title = this.__defineThemeTitle(options);
      desktop.add(this.createTitle(title), { top: 10, left: 10 });

      const mainContainer = (this.mainContainer =
        new qx.ui.container.Composite());
      mainContainer.setLayout(new qx.ui.layout.Canvas());
      mainContainer.add(desktop, { top: 0, left: 0, bottom: 0, right: 0 });
      mainContainer.add(this.createDock(), { left: 5, bottom: 0, right: 5 });

      this.getRoot().add(mainContainer, { edge: 0 });

      const about = (this.about = new qxl.themedemo.window.About(
        options ? options.about_url : ""
      ));
      about.open();

      desktop.add(about);
    },

    createTitle(title) {
      const separator = new qxl.themedemo.Separator(80);
      const font = new qx.bom.Font(36, ["serif"]);

      const themeLabel = new qx.ui.basic.Label(title).set({
        font,
        textColor: "text-label",
        cursor: "pointer",
      });
      themeLabel.addListener("mouseover", () => themeLabel.setTextColor("text-selected"));
      themeLabel.addListener("mouseout", () => themeLabel.setTextColor("text-label"));
      themeLabel.addListener("click", () => this.about.open());

      const container = new qx.ui.container.Composite(
        new qx.ui.layout.VBox(0).set({
          alignX: "center",
        })
      );
      container.add(themeLabel);
      container.add(separator);
      container.add(new qx.ui.basic.Label("Theme Demo"));

      return container;
    },

    __defineThemeTitle(options){
      let title;
      if (!options || !options.title) {
        const currentTheme =
          qx.theme.manager.Meta.getInstance().getTheme().name;
        let themePart = currentTheme.substring(0, currentTheme.indexOf("."));
        if (themePart === "qxl") {
          themePart = currentTheme.substring(
            currentTheme.lastIndexOf(".") + 1,
            currentTheme.length
          );
        }
        title = qx.lang.String.firstUp(themePart);
      } else if (options && options.title) {
        title = options.title;
      }
      return title;
    },

    createDock() {
      const height = this.getRoot()._computeSizeHint().height;
      return new qxl.themedemo.BottomPanel(height);
    }
  }
});
