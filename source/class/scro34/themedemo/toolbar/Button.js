/* ************************************************************************

   Copyright:
     2015 Norbert Schröder, http://scro34.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php

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