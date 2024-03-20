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

  construct(label, iconDefault, iconHovered){
    super(label, iconDefault);

    this._iconDefault = iconDefault;
    this._iconHovered = iconHovered;

    this.addListener("pointerover", () => this.setIcon(this._iconHovered));
    this.addListener("pointerout", () => this.setIcon(this._iconDefault));
  }
});