qx.Class.define("qxl.themedemo.PanelButton", {
    extend: qx.ui.form.ToggleButton,

    construct(options) {
        super(null, options.icon);
        this.set({
            padding: 10,
            toolTip: new qx.ui.tooltip.ToolTip(options.toolTip),
        });
        this.addState("circle");
        this.__name = options.name;
        this.addListener("changeValue", this._onPress, this);
    },

    events: {
        "windowClose": "qx.event.type.Event"
    },

    members: {
        __name: null,

        _onPress(e) {
            this.dockButtonClick(() => {
                if (!this.window) {
                  this.window = qxl.themedemo.window.Factory.getWindow(this.__name);
                  this.window.addListener("close", () => {
                      this.setValue(false);
                      this.fireEvent("windowClose");
                  });
                  qxl.themedemo.Desktop.getInstance().add(this.window, { top: 20, right: 50 });
                }
                this.window.open();
            });
        },

        dockButtonClick(openFunc) {
            if (this.getValue()) {
              openFunc();
            } else {
              if (
                this.window.getVisibility() == "visible" && !this.window.getActive()
              ) {
                this.setValue(true);
              } else {
                this.window.close();
              }
            }
        }
    }
});