/* ************************************************************************

   Copyright:
     2024 Dmitrii Zolotov

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Dmitrii Zolotov (goldim)

************************************************************************ */

qx.Class.define("qxl.themedemo.ButtonPanel", {
    extend: qx.ui.container.Composite,

    construct() {
        super();
        this.setLayout(new qx.ui.layout.HBox(10).set({ alignX: "center" }));
        this.setPaddingBottom(5);
        this.addListener("appear", () => this.fadeIn(200));
        this.getButtonData().forEach(options => {
          let button;
          if (options.name === "AudioPlayer"){
            button = new qxl.themedemo.AudioPlayerButton(options)
          } else {
            button = new qxl.themedemo.PanelButton(options)
          }
          button.addListener("windowClose", () => {
            this.checkShow();
          });
          this.add(button);
        });
    },

    members: {
        hasActiveButtons() {
            const buttonDockButtons = this.getChildren();
            return buttonDockButtons.some(button => button.getValue());
        },

        checkShow(){
            if (!this.hasActiveButtons()) {
                this.setVisibility("visible");
            }
        },

        pressButton(name){
            const buttons = this.getChildren();
            const found = buttons.find(button => button.getName() == name);
            found?.setValue(true);
        },

        getButtonData() {
            const icons = qxl.themedemo.IconFactory.getInstance().getIcons();
            return [
              {
                icon: icons.WIDGET_BROWSER,
                toolTip: "Widget Browser",
                name: "WidgetBrowser",
                center: true
              },
              {
                icon: icons.CALCULATOR,
                toolTip: "Calculator",
                name: "Calculator",
                position: {top: 20, right: 50}
              },
              {
                icon: icons.COLOR_SELECTOR,
                toolTip: "Color Selector",
                name: "ColorSelector",
                position:  {bottom: 30, right: 10}
              },
              {
                icon: icons.TABLE,
                toolTip: "Table",
                name: "Table",
                position: {left: 50, bottom: 20}
              },
              {
                icon: icons.WEB_BROWSER,
                toolTip: "Web Browser",
                name: "WebBrowser",
                center: true
              },
              {
                icon: icons.MEDIA_PLAYER,
                toolTip: "Audio Player",
                name: "AudioPlayer",
                position: {top: 110, left: 20}
              },
            ];
          }
    }
});