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
            const found = buttons.find(button => button.getUserData("name") == name);
            if (found){
                found.setValue(true);
            }
        },

        getButtonData() {
            const icons = qxl.themedemo.IconFactory.getInstance().getIcons()
            return [
              {
                icon: icons.WIDGET_BROWSER,
                toolTip: "Widget Browser",
                name: "WidgetBrowser"
              },
              {
                icon: icons.CALCULATOR,
                toolTip: "Calculator",
                name: "Calculator"
              },
              {
                icon: icons.COLOR_SELECTOR,
                toolTip: "Color Selector",
                name: "ColorSelector"
              },
              {
                icon: icons.TABLE,
                toolTip: "Table",
                name: "Table"
              },
              {
                icon: icons.WEB_BROWSER,
                toolTip: "Web Browser",
                name: "WebBrowser"
              },
              {
                icon: icons.MEDIA_PLAYER,
                toolTip: "Audio Player",
                name: "AudioPlayer"
              },
            ];
          }
    }
});