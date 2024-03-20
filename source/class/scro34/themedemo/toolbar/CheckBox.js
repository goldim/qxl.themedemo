/* ************************************************************************

   Copyright:
     2015 Norbert Schröder, http://scro34.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Norbert Schröder (scro34)

************************************************************************ */

qx.Class.define("scro34.themedemo.toolbar.CheckBox", {
  extend: qx.ui.toolbar.CheckBox,

  construct(name, namePressed){
    const icons = scro34.themedemo.IconFactory.getInstance();
    const iconDefault = icons.getIcon(name);
    super(null, iconDefault);

    const iconHovered = icons.getIcon(name + "_HOVER");
    this._iconDefault = iconDefault;
    this._iconHovered = iconHovered ? iconHovered : iconDefault;

    const iconPressedDefault = icons.getIcon(namePressed);
    const iconPressedHovered = icons.getIcon(namePressed + "_HOVER");
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