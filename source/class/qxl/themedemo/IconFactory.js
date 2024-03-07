/* ************************************************************************

   Copyright:
     2024 Dmitrii Zolotov

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Dmitrii Zolotov (goldim)

************************************************************************ */

qx.Class.define("qxl.themedemo.IconFactory", {
    extend: qx.core.Object,
    type: "singleton",

    construct(){
      this.__icons = qxl.themedemo.Icons;
    },

    members: {
        __icons: null,

        getIcon(name){
          return qxl.themedemo.Icons.getIcon(name);
        },

        setSource(icons){
          this.__icons = icons;
        }
    }
});