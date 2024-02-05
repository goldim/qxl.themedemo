/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2010 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * ???

************************************************************************ */

/**
 * @asset(qx/icon/${qx.icontheme}/16/apps/utilities-calculator.png)
 */

qx.Class.define("qxl.themedemo.Calculator", {
  extend: qx.ui.window.Window,

  construct() {
    super();

    this._createControls();
  },

  members: {
    __display: null,
    __cal: null,

    _createControls() {
      this.__cal = new qxl.themedemo.CalculatorLogic();

      const layout = new qx.ui.layout.VBox(16);
      this.set({
        layout: layout,
        width: 260,
        minWidth: 260,
        height: 260,
        caption: "Calculator",
        icon: "icon/16/apps/utilities-calculator.png",
        allowStretchX: false,
        allowStretchY: false,
      });

      this.addListenerOnce("appear", () => {
        this.add(this._createCalculator(), { flex: 1 });
        this.center();
      });

      this.addListener("appear", () => {
        this.fadeIn(200);
      });

      this.addListener("keypress", (e) => {
        if (e.getKeyIdentifier() == "Escape") {
          this.close();
        }
      });
    },

    _createCalculator() {
      const box = new qx.ui.container.Composite().set({
        minWidth: 140,
        minHeight: 260,
        padding: 3,
        allowGrowX: true,
        allowGrowY: true,
      });

      const gridLayout = new qx.ui.layout.Grid(5, 5);

      box.setLayout(gridLayout);

      this.__display = new qx.ui.basic.Label(
        this.__cal.getCurrentValue().toString()
      ).set({
        decorator: "input",
        allowGrowX: true,
        allowGrowY: true,
        minWidth: 140,
        height: 32,
        paddingRight: 8,
        textColor: "text-active",
        enabled: false,

        font: new qx.bom.Font().set({
          size: 20,
          family: ["Verdana", "sans-serif"],
          bold: true,
        }),

        textAlign: "right",
      });

      this.__display.setEnabled(false);

      var fontButton = this.__fontButton = new qx.bom.Font().set({
        size: 12,
        family: ["Verdana", "sans-serif"],
        bold: true,
      });

      this.__createAndAddNumbersToBox(box);
      this.__createAndAddMathActionsToBox(box);

      var buttonC = new qx.ui.form.Button("C").set({
        font: fontButton,
        minWidth: 30,
      });

      var buttonCE = new qx.ui.form.Button("CE").set({
        font: fontButton,
        minWidth: 30,
      });

      var buttonDelete = new qx.ui.form.Button("Del").set({
        font: fontButton,
        minWidth: 30,
      });

      var buttonChangeSign = new qx.ui.form.Button("+/-").set({
        font: fontButton,
        minWidth: 30,
      });

      var buttonComma = new qx.ui.form.Button(".").set({
        font: fontButton,
        minWidth: 30,
      });

      var buttonResult = new qx.ui.form.Button("=").set({
        font: fontButton,
        minWidth: 30,
      });

      gridLayout.setColumnFlex(0, 1);
      gridLayout.setColumnFlex(1, 1);
      gridLayout.setColumnFlex(2, 1);
      gridLayout.setColumnFlex(3, 1);

      gridLayout.setRowFlex(1, 1);
      gridLayout.setRowFlex(2, 1);
      gridLayout.setRowFlex(3, 1);
      gridLayout.setRowFlex(4, 1);
      gridLayout.setRowFlex(5, 1);
      gridLayout.setRowFlex(6, 1);

      box.add(this.__display, {
        row: 0,
        column: 0,
        rowSpan: 0,
        colSpan: 4,
      });

      box.add(buttonC, {
        row: 1,
        column: 2,
        rowSpan: 1,
        colSpan: 2,
      });

      box.add(buttonCE, {
        row: 1,
        column: 1,
      });

      box.add(buttonDelete, {
        row: 1,
        column: 0,
      });

      box.add(buttonChangeSign, {
        row: 5,
        column: 1,
      });

      box.add(buttonComma, {
        row: 5,
        column: 2,
      });

      box.add(buttonResult, {
        row: 6,
        column: 0,
        rowSpan: 1,
        colSpan: 4,
      });

      buttonC.addListener("execute", (e) => {
        this.__cal.cleanDisplay();
        this.__display.setValue(this.__cal.getCurrentValue().toString());
      });

      buttonCE.addListener("execute", (e) => {
        this.__cal.clearEntry();

        if (this.__cal.getResult() != null) {
          this.__display.setValue(this.__cal.getCurrentValue().toString());
        }
      });

      buttonDelete.addListener("execute", (e) => {
        this.__cal.deleteNumber();
        this.__display.setValue(this.__cal.getCurrentValue().toString());
      });

      buttonChangeSign.addListener("execute", (e) => {
        this.__cal.setSign();

        if (this.__cal.getResult() != null) {
          this.__display.setValue(this.__cal.getResult().toString());
        }
      });

      buttonResult.addListener("execute", (e) => {
        this.__cal.calculate("=");

        if (this.__cal.getResult() != null) {
          this.__display.setValue(this.__cal.getResult().toString());
        }

        this.__cal.resetCurrentValue();
      });

      buttonComma.addListener("execute", (e) => {
        this.__cal.setComma();
      });

      return box;
    },

    __createAndAddMathActionsToBox(box){
      let actionOptions = [
        { label: "+", position: {row: 5, column: 3} },
        { label: "-", position:  { row: 2, column: 3 }},
        { label: "*", position: { row: 3, column: 3 } },
        { label: "/", position: { row: 4, column: 3 } }
      ];

      actionOptions.forEach(options => {
        const handler = () => {
          this.__cal.calculate(options.label);
          if (this.__cal.getResult() != null) {
            this.__display.setValue(this.__cal.getResult().toString());
          }
          this.__cal.resetCurrentValue();
        }
        const button = this.__createButton(options.label, handler);
        box.add(button, options.position);
      });
    },

    __createAndAddNumbersToBox(box){
      const numberButtonOptions = [
        { label: "1", position: { row: 4, column: 0 } },
        { label: "2", position: { row: 4, column: 1 } },
        { label: "3", position: { row: 4, column: 2 } },
        { label: "4", position: { row: 3, column: 0 } },
        { label: "5", position: { row: 3, column: 1 } },
        { label: "6", position: { row: 3, column: 2 } },
        { label: "7", position: { row: 2, column: 0 } },
        { label: "8", position: { row: 2, column: 1 } },
        { label: "9", position: { row: 2, column: 2 } },
      ];

      const button0 = this.__createButton("0", () => {
        this.__cal.setCurrentValue(0);
        this.__display.setValue(
          this.__cal
            .getCurrentValue()
            .toFixed(this.__cal.getZeroCounter())
            .toString()
        );
      });
      box.add(button0, { row: 5, column: 0 });

      numberButtonOptions.forEach(options => {
        const button = this.__createNumberButton(options.label, options.value);
        box.add(button, options.position);
      });
    },

    __createNumberButton(label){
      const value = Number(label);
      const handler = () => {
        this.__cal.setCurrentValue(value);
        this.__display.setValue(this.__cal.getCurrentValue().toString());
      }
      return this.__createButton(label, handler);
    },

    __createButton(label, handler){
      const button = new qx.ui.form.Button(label).set({
        font: this.__fontButton,
        minWidth: 30
      });
      button.addListener("execute", handler);
      return button;
    }
  },

  destruct() {
    this._disposeObjects("__cal", "__display");
  },
});
