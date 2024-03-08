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
     * Dmitrii Zolotov

************************************************************************ */

qx.Class.define("scro34.themedemo.window.Calculator", {
  extend: scro34.themedemo.window.Window,

  members: {
    __display: null,
    __cal: null,

    _createControls() {
      this.__cal = new scro34.themedemo.CalculatorLogic();

      const layout = new qx.ui.layout.VBox(16);
      this.set({
        layout: layout,
        width: 260,
        minWidth: 260,
        height: 260,
        caption: "Calculator",
        icon: scro34.themedemo.IconFactory.getInstance().getIcon("CALCULATOR_SMALL"),
        allowStretchX: false,
        allowStretchY: false,
      });

      this.addListenerOnce("appear", () => {
        this.add(this._createCalculator(), { flex: 1 });
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

      box.setLayout(this.__createGridLayout());

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

      this.__fontButton = new qx.bom.Font().set({
        size: 12,
        family: ["Verdana", "sans-serif"],
        bold: true,
      });

      this.__createAndAddNumbersToBox(box);
      this.__createAndAddMathActionsToBox(box);
      this.__createAndAddSpecialActions(box);

      box.add(this.__display, {
        row: 0,
        column: 0,
        rowSpan: 0,
        colSpan: 4,
      });

      return box;
    },

    __createGridLayout(){
      const layout = new qx.ui.layout.Grid(5, 5);
      for (let i = 0; i <= 3; i++) { 
        layout.setColumnFlex(i, 1);
      }
      for (let i = 1; i <= 6; i++) { 
        layout.setRowFlex(i, 1);
      }
      return layout;
    },

    __createAndAddSpecialActions(box){
      const actions = [
        {
          label: "C",
          handler: () => {
            this.__cal.cleanDisplay();
            this.__display.setValue(this.__cal.getCurrentValue().toString());
          },
          position: {
            row: 1,
            column: 2,
            rowSpan: 1,
            colSpan: 2,
          }
        },
        {
          label: "CE",
          handler: () => {
            this.__cal.clearEntry();
            if (this.__cal.getResult() != null) {
              this.__display.setValue(this.__cal.getCurrentValue().toString());
            }
          },
          position: {
            row: 1,
            column: 1,
          }
        },
        {
          label: "Del",
          handler: () => {
            this.__cal.deleteNumber();
            this.__display.setValue(this.__cal.getCurrentValue().toString());
          },
          position: {
            row: 1,
            column: 0,
          }
        },
        {
          label: "+/-",
          handler: () => {
            this.__cal.setSign();
            if (this.__cal.getResult() != null) {
              this.__display.setValue(this.__cal.getResult().toString());
            }
          },
          position: {
            row: 5,
            column: 1,
          }
        },
        {
          label: ".",
          handler: () => {
            this.__cal.setComma();
          },
          position: {
            row: 5,
            column: 2,
          }
        }
      ];

      actions.forEach(action => {
        const button = this.__createButton(action.label, action.handler);
        box.add(button, action.position);
      });
    },

    __createAndAddMathActionsToBox(box){
      let operations = [
        { label: "+", position: {row: 5, column: 3} },
        { label: "-", position:  { row: 2, column: 3 }},
        { label: "*", position: { row: 3, column: 3 } },
        { label: "/", position: { row: 4, column: 3 } },
        { label: "=", position: { row: 6, column: 0, rowSpan: 1, colSpan: 4 } }
      ];

      operations.forEach(operation => {
        const handler = () => {
          this.__cal.calculate(operation.label);
          if (this.__cal.getResult() != null) {
            this.__display.setValue(this.__cal.getResult().toString());
          }
          this.__cal.resetCurrentValue();
        }
        const button = this.__createButton(operation.label, handler);
        box.add(button, operation.position);
      });
    },

    __createAndAddNumbersToBox(box){
      const numbers = [
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

      numbers.forEach(number => {
        const button = this.__createNumberButton(number.label, number.value);
        box.add(button, number.position);
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
