/* ************************************************************************

   Copyright:
     2024 Dmitrii Zolotov

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Dmitrii Zolotov (goldim)

************************************************************************ */

qx.Class.define("scro34.themedemo.PanelButton", {
  extend: qx.ui.form.ToggleButton,

  construct(options) {
    super(null, options.icon);
    this.set({
      padding: 10,
      toolTip: new qx.ui.tooltip.ToolTip(options.toolTip),
    });
    this.addState("circle");
    this.__name = options.name;
    this.__position = options.position;
    this.__center = options.center;
    this.addListener("changeValue", this._onPress, this);
  },

  events: {
    "windowClose": "qx.event.type.Event"
  },

  members: {
    __name: null,

    _onPress() {
      this.__clickButton(() => {
        if (!this.window) {
          this.__createWindow();
        }
        this.window.open();
      });
    },

    getName(){
      return this.__name;
    },

    __createWindow(){
      this.window = scro34.themedemo.window.Factory.getWindow(this.__name);
      this.window.addListener("close", () => {
        this.setValue(false);
        this.fireEvent("windowClose");
      });
      scro34.themedemo.Desktop.getInstance().add(this.window, this.__position);
      if (this.__center){
        this.window.center();
      }
    },

    __clickButton(openFunc) {
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