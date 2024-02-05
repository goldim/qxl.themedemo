/* ************************************************************************

   Copyright:
     2015-2021 Norbert Schröder

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
 * @@asset(qx/icon/${qx.icontheme}/48/devices*)
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
      var separator = new qxl.themedemo.Separator(80);
      const font = new qx.bom.Font(36, ["serif"]);

      var themeLabel = new qx.ui.basic.Label(title).set({
        font,
        textColor: "text-label",
        cursor: "pointer",
      });
      themeLabel.addListener(
        "mouseover",
        function () {
          this.setTextColor("text-textfield");
        },
        themeLabel
      );
      themeLabel.addListener(
        "mouseout",
        function () {
          this.setTextColor("text-label");
        },
        themeLabel
      );
      themeLabel.addListener("click", () => {
        this.about.open();
      });

      var container = new qx.ui.container.Composite(
        new qx.ui.layout.VBox(0).set({
          alignX: "center",
        })
      );
      container.add(themeLabel);
      container.add(separator);
      container.add(new qx.ui.basic.Label("Theme Demo"));

      return container;
    },

    createVersionInfo() {
      const font = new qx.bom.Font(19, ["serif"]);
      var qooxdoo = new qx.ui.basic.Label("qooxdoo").set({
        font,
        paddingBottom: 3,
        cursor: "pointer",
      });
      qooxdoo.addListener(
        "mouseover",
        function () {
          this.setTextColor("text-selected");
        },
        qooxdoo
      );
      qooxdoo.addListener(
        "mouseout",
        function () {
          this.setTextColor("text-label");
        },
        qooxdoo
      );
      qooxdoo.addListener("click", () => {
        this.pressButton("WebBrowser");
      });

      var container = new qx.ui.container.Composite(
        new qx.ui.layout.HBox(5).set({ alignY: "middle" })
      );
      container.add(new qx.ui.basic.Label("powered by").set({ font: "small" }));
      container.add(qooxdoo);
      container.add(
        new qx.ui.basic.Label(qx.core.Environment.get("qx.version")).set({
          font: "small",
        })
      );

      return container;
    },

    createDock() {
      var container = new qx.ui.container.Composite(
        new qx.ui.layout.HBox(10).set({
          alignX: "center",
        })
      ).set({
        paddingBottom: 5,
      });
      container.addListener(
        "appear",
        function () {
          this.fadeIn(200);
        },
        container
      );

      var button;
      var buttonData = this.getButtonData();
      for (var i = 0; i < buttonData.length; i++) {
        button = new qx.ui.form.ToggleButton(null, buttonData[i].icon).set({
          padding: 10,
          toolTip: new qx.ui.tooltip.ToolTip(buttonData[i].toolTip),
        });
        button.addState("circle");
        button.setUserData("name", buttonData[i].name);
        button.addListener("changeValue", buttonData[i].action, this);
        container.add(button);
      }

      var buttonDock = (this.buttonDock = new qx.ui.container.Composite(
        new qx.ui.layout.Canvas()
      ));
      buttonDock.add(container, { top: 0, left: 0, bottom: 0, right: 0 });
      buttonDock.add(this.createVersionInfo(), { bottom: 2, right: 0 });

      buttonDock.addListener("mousemove", (e) => {
        var docHeight = this.getRoot()._computeSizeHint().height;
        var buttonDockHeight = this.buttonDock._computeSizeHint().height;
        var buttonDockContainer = this.buttonDock.getChildren()[0];

        if (
          !this.hasActiveButtons(buttonDockContainer) ||
          (e.getDocumentTop() >= docHeight - 20 &&
            e.getDocumentTop() <= docHeight - 3)
        ) {
          buttonDockContainer.setVisibility("visible");
        } else if (
          e.getDocumentTop() <= docHeight - buttonDockHeight + 10 ||
          e.getDocumentTop() >= docHeight - 3
        ) {
          buttonDockContainer.setVisibility("excluded");
        }
      });

      return buttonDock;
    },

    hasActiveButtons(container) {
      var buttonDockButtons = container.getChildren();

      for (var i = 0; i < buttonDockButtons.length; i++) {
        if (buttonDockButtons[i].getValue()) {
          return true;
        }
      }

      return false;
    },

    checkShowDock() {
      var container = this.buttonDock.getChildren()[0];

      if (!this.hasActiveButtons(container)) {
        container.setVisibility("visible");
      }
    },

    pressButton(buttonName) {
      var buttonDockContainer = this.buttonDock.getChildren()[0];
      var buttonDockButtons = buttonDockContainer.getChildren();

      for (var i = 0; i < buttonDockButtons.length; i++) {
        if (buttonDockButtons[i].getUserData("name") == buttonName) {
          buttonDockButtons[i].setValue(true);
          break;
        }
      }
    },

    dockButtonClick(button, targetWindow, openFunc) {
      if (button.getValue()) {
        openFunc();
      } else {
        if (
          targetWindow.getVisibility() == "visible" &&
          !targetWindow.getActive()
        ) {
          button.setValue(true);
        } else {
          targetWindow.close();
        }
      }
    },

    onCalculator(e) {
      var button = e.getTarget();
      var that = this;

      this.dockButtonClick(button, this.calculator, function () {
        if (!that.calculator) {
          that.calculator = new qxl.themedemo.Calculator();
          that.calculator.addListener(
            "close",
            function () {
              button.setValue(false);
              this.checkShowDock();
            },
            that
          );
          that.desktop.add(that.calculator, { top: 20, right: 50 });
        }
        that.calculator.open();
      });
    },

    onColorChooser(e) {
      var button = e.getTarget();
      var that = this;

      this.dockButtonClick(button, this.colorChooser, function () {
        if (!that.colorChooser) {
          that.colorChooser = new qxl.themedemo.ColorChooser();
          that.colorChooser.addListener(
            "close",
            function () {
              button.setValue(false);
              this.checkShowDock();
            },
            that
          );
          that.desktop.add(that.colorChooser, { bottom: 30, right: 10 });
        }
        that.colorChooser.open();
      });
    },

    onTableWindow(e) {
      var button = e.getTarget();
      var that = this;

      this.dockButtonClick(button, this.tableWindow, function () {
        if (!that.tableWindow) {
          that.tableWindow = new qxl.themedemo.TableWindow();
          that.tableWindow.addListener(
            "close",
            function () {
              button.setValue(false);
              this.checkShowDock();
            },
            that
          );
          that.desktop.add(that.tableWindow, { left: 50, bottom: 20 });
        }
        that.tableWindow.open();
      });
    },

    onWebBrowser(e) {
      var button = e.getTarget();
      var that = this;

      this.dockButtonClick(button, this.webBrowser, function () {
        if (!that.webBrowser) {
          that.webBrowser = new qxl.themedemo.WebBrowser();
          that.webBrowser.addListener(
            "close",
            function () {
              button.setValue(false);
              this.checkShowDock();
            },
            that
          );
          that.desktop.add(that.webBrowser);
        }
        that.webBrowser.open();
      });
    },

    onWidgetBrowser(e) {
      var button = e.getTarget();
      var that = this;

      this.dockButtonClick(button, this.widgetBrowser, function () {
        if (!that.widgetBrowser) {
          that.widgetBrowser = new qxl.themedemo.WidgetBrowser();
          that.widgetBrowser.addListener(
            "close",
            function () {
              button.setValue(false);
              this.checkShowDock();
            },
            that
          );
          that.desktop.add(that.widgetBrowser);
        }
        that.widgetBrowser.open();
      });
    },

    onAudioPlayerWindow(e) {
      var button = e.getTarget();
      var that = this;

      this.dockButtonClick(button, this.audioPlayerWindow, function () {
        if (!that.audioPlayerWindow) {
          that.audioPlayerWindow = new qxl.themedemo.PlayerWindow();
          that.audioPlayerWindow.addListener(
            "openHomepage",
            that.onOpenHomepage,
            that
          );
          that.audioPlayerWindow.addListener(
            "openWikipedia",
            that.onOpenWikipedia,
            that
          );
          that.audioPlayerWindow.addListener(
            "openVideo",
            that.onOpenVideo,
            that
          );
          that.audioPlayerWindow.addListener(
            "close",
            function () {
              button.setValue(false);
              this.checkShowDock();
            },
            that
          );
          that.desktop.add(that.audioPlayerWindow, { top: 110, left: 20 });
        }
        that.audioPlayerWindow.open();
      });
    },

    onOpenHomepage(e) {
      if (!this.homePageWindow) {
        this.homePageWindow = new qxl.themedemo.WebBrowser();
        this.desktop.add(this.homePageWindow);
      }
      this.homePageWindow.setIcon(e.getData().icon);
      this.homePageWindow.setCaption(e.getData().caption);
      this.homePageWindow.surfTo(e.getData().url);
      this.homePageWindow.open();
    },

    onOpenWikipedia(e) {
      if (!this.wikipediaWindow) {
        this.wikipediaWindow = new qxl.themedemo.WebBrowser();
        this.desktop.add(this.wikipediaWindow);
      }
      this.wikipediaWindow.setIcon(e.getData().icon);
      this.wikipediaWindow.setCaption(e.getData().caption);
      this.wikipediaWindow.surfTo(e.getData().url);
      this.wikipediaWindow.open();
    },

    onOpenVideo(e) {
      if (!this.videoWindow) {
        this.videoWindow = new qxl.themedemo.VideoWindow();
        this.desktop.add(this.videoWindow, { top: 60, right: 20 });
      }
      this.videoWindow.setIcon(e.getData().icon);
      this.videoWindow.setCaption(e.getData().caption);
      this.videoWindow.setVideoLink(e.getData().video);
      this.videoWindow.open();
    },

    getButtonData() {
      return [
        {
          icon: "icon/32/apps/utilities-statistics.png",
          toolTip: "Widget Browser",
          name: "WidgetBrowser",
          action: this.onWidgetBrowser,
        },
        {
          icon: "icon/32/apps/utilities-calculator.png",
          toolTip: "Calculator",
          name: "Calculator",
          action: this.onCalculator,
        },
        {
          icon: "icon/32/apps/utilities-color-chooser.png",
          toolTip: "Color Selector",
          name: "ColorSelector",
          action: this.onColorChooser,
        },
        {
          icon: "icon/32/apps/office-chart.png",
          toolTip: "Table",
          name: "Table",
          action: this.onTableWindow,
        },
        {
          icon: "icon/32/categories/internet.png",
          toolTip: "Web Browser",
          name: "WebBrowser",
          action: this.onWebBrowser,
        },
        {
          icon: "icon/32/apps/media-audio-player.png",
          toolTip: "Audio Player",
          name: "AudioPlayer",
          action: this.onAudioPlayerWindow,
        },
      ];
    },
  },
});
