/* ************************************************************************

   Copyright:
     2015-2024 Norbert Schröder, Dmitrii Zolotov

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

/**
 * @asset(qxl/themedemo/*)
 *
 * @asset(qx/icon/${qx.icontheme}/32/apps/media-audio-player.png)
 * @asset(qx/icon/${qx.icontheme}/32/apps/media-photo-album.png)
 * @asset(qx/icon/${qx.icontheme}/32/apps/office-address-book.png)
 * @asset(qx/icon/${qx.icontheme}/32/apps/office-chart.png)
 * @asset(qx/icon/${qx.icontheme}/32/apps/utilities-calculator.png)
 * @asset(qx/icon/${qx.icontheme}/32/apps/utilities-color-chooser.png)
 * @asset(qx/icon/${qx.icontheme}/32/apps/utilities-statistics.png)
 * @asset(qx/icon/${qx.icontheme}/32/apps/utilities-text-editor.png)
 * @asset(qx/icon/${qx.icontheme}/32/categories/internet.png)
 *
 * @asset(qx/icon/${qx.icontheme}/48/devices*)
 * @usefont(JosefinSlab)
 */
qx.Class.define("qxl.themedemo.Application", {
  extend: qx.application.Standalone,

  members: {
    desktop: null,

    main(options) {
      super.main();

      if (qx.core.Environment.get("qx.debug")) {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      /***************************************************************************/

      var doc = this.getRoot();

      var desktop = (this.desktop = new qx.ui.window.Desktop());
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
      desktop.add(this.createTitle(title), { top: 10, left: 10 });

      var mainContainer = (this.mainContainer =
        new qx.ui.container.Composite());
      mainContainer.setLayout(new qx.ui.layout.Canvas());
      mainContainer.add(desktop, { top: 0, left: 0, bottom: 0, right: 0 });
      mainContainer.add(this.createDock(), { left: 5, bottom: 0, right: 5 });

      doc.add(mainContainer, { edge: 0 });

      var about = (this.about = new qxl.themedemo.About(
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
      themeLabel.addListener("mouseover", () => themeLabel.setTextColor("text-textfield"));
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

    createDock() {
      return new qxl.themedemo.BottomPanel(this.getRoot()._computeSizeHint().height);
    }
  }
});
