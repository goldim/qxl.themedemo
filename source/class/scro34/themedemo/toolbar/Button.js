/* ************************************************************************

   Copyright:
     2015 Norbert Schröder, http://scro34.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

qx.Class.define("scro34.themedemo.toolbar.Button", {
  extend: qx.ui.toolbar.Button,

  construct(name){
    const icons = scro34.themedemo.IconFactory.getInstance();
    const iconDefault = icons.getIcon(name);
    super(null, iconDefault);

    this._iconDefault = iconDefault;
    this._iconHovered = icons.getIcon(name + "_HOVER");

    this.addListener("pointerover", () => this.setIcon(this._iconHovered));
    this.addListener("pointerout", () => this.setIcon(this._iconDefault));
  }
});