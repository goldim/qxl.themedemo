qx.Class.define("qxl.themedemo.Window", {
    extend: qx.ui.window.Window,

    construct() {
        super();
        this.__initWindow();
    },

    members: {
        __initWindow(){
            this.addListener("appear", () => {
                this.center();
                this.fadeIn(200);
            });
            this.addListener("keypress", (e) => {
                if (e.getKeyIdentifier() == "Escape") {
                    this.close();
                }
            });
        }
    }
});