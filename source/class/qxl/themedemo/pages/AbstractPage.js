/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Tristan Koch (tristankoch)

************************************************************************ */

qx.Class.define("qxl.themedemo.pages.AbstractPage",
{
  type: "abstract",

  extend: qx.ui.container.Composite,

  construct: function()
  {
    this.base(arguments);
    this.setLayout(new qx.ui.layout.Canvas());

    this._widgets = new qx.type.Array();
    
    this.addListener("appear", function() {
      this.fadeIn(200);
    }, this);
  },

  members:
  {
    _widgets: null,

    getWidgets: function()
    {
      return this._widgets;
    }
  }
});
