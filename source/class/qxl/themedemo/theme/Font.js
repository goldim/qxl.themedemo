/* ************************************************************************

   Copyright: 2024 

   License: MIT license

   Authors: Dmitrii Zolotov (goldim) zolotovdy@yandex.ru

************************************************************************ */

/**
 * @usefont(JosefinSlab Regular)
 * @usefont(JosefinSlab Bold)
 */
qx.Theme.define("qxl.themedemo.theme.Font", {
  extend: qx.theme.indigo.Font,

  fonts: {
    title:
    {
      size: 36,
      family: ["serif"],
      fontName: "JosefinSlab Regular"
    },
    qooxdoo: {
      size: 19,
      family: ["serif"],
      fontName: "JosefinSlab Bold"
    }
  }
});
