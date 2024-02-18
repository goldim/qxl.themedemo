/* ************************************************************************

   Copyright:
     2024 Dmitrii Zolotov

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Dmitrii Zolotov (goldim)

************************************************************************ */

qx.Class.define("qxl.themedemo.window.Window", {
    extend: qx.ui.window.Window,

    construct() {
        super();
        this.__initWindow();
        this._createControls();
    },

    members: {
        __initWindow(){
            this.addListener("appear", () => {
                // this.center();
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