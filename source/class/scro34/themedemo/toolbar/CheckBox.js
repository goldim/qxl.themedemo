/* ************************************************************************

   Copyright:
     2015 Norbert Schröder, http://scro34.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

qx.Class.define("scro34.themedemo.toolbar.CheckBox", {
  extend: qx.ui.toolbar.CheckBox,

  construct(label, iconDefault, iconHovered, iconPressedDefault, iconPressedHovered){
    super(label, iconDefault);
    
    this._iconDefault = iconDefault;
    this._iconHovered = iconHovered ? iconHovered : iconDefault;
    this._iconPressedDefault = iconPressedDefault ? iconPressedDefault : iconDefault;
    this._iconPressedHovered = iconPressedHovered ? iconPressedHovered : iconHovered;
    
    this.addListener("pointerover", () => {
      this.setIcon(this.getValue() ? this._iconPressedHovered : this._iconHovered);
    });
    
    this.addListener("pointerout", () => {
      this.setIcon(this.getValue() ? this._iconPressedDefault : this._iconDefault);
    });
  }
});