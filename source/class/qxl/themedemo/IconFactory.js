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
    this.__defaultIcons = qxl.themedemo.Icons;
  },

  members: {
    __customIcons: null,

    getIcon(name){
      if (this.__icons){
        const icon = this.__icons.getIcon(name);
        if (icon){
          return icon;
        }
      }
      return qxl.themedemo.Icons.getIcon(name);
    },

    setCustomIcons(icons){
      this.__customIcons = icons;
    }
  }
});