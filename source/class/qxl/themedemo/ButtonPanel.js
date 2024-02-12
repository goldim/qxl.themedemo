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
            return [
              {
                icon: "icon/32/apps/utilities-statistics.png",
                toolTip: "Widget Browser",
                name: "WidgetBrowser"
              },
              {
                icon: "icon/32/apps/utilities-calculator.png",
                toolTip: "Calculator",
                name: "Calculator"
              },
              {
                icon: "icon/32/apps/utilities-color-chooser.png",
                toolTip: "Color Selector",
                name: "ColorSelector"
              },
              {
                icon: "icon/32/apps/office-chart.png",
                toolTip: "Table",
                name: "Table"
              },
              {
                icon: "icon/32/categories/internet.png",
                toolTip: "Web Browser",
                name: "WebBrowser"
              },
              {
                icon: "icon/32/apps/media-audio-player.png",
                toolTip: "Audio Player",
                name: "AudioPlayer"
              },
            ];
          }
    }
});