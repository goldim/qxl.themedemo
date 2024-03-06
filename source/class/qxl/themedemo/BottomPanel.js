/* ************************************************************************

   Copyright:
     2024 Dmitrii Zolotov

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Dmitrii Zolotov (goldim)

************************************************************************ */

/**
 * @usefont(JosefinSlabBold)
 */
qx.Class.define("qxl.themedemo.BottomPanel", {
    extend: qx.ui.container.Composite,

    construct(docHeight) {
        super();
        this.__docHeight = docHeight;
        this.setLayout(new qx.ui.layout.Canvas());
        const buttonPanel = this.__buttonPanel = new qxl.themedemo.ButtonPanel();
        this.add(buttonPanel, { top: 0, left: 0, bottom: 0, right: 0 });
        this.add(this.createVersionInfo(), { bottom: 2, right: 0 });
        this.addListener("mousemove", this._onMouseMove, this);
    },

    members: {
        _onMouseMove(e){
            const docHeight = this.__docHeight;
            const buttonDockHeight = this._computeSizeHint().height;
            const buttonPanel = this.__buttonPanel;
            const topHeight = e.getDocumentTop();

            if (
                !buttonPanel.hasActiveButtons() ||
                (topHeight >= docHeight - 20 && topHeight <= docHeight - 3)
            ) {
                buttonPanel.setVisibility("visible");
            } else if (
                topHeight <= docHeight - buttonDockHeight + 10 ||
                topHeight >= docHeight - 3
            ) {
                buttonPanel.setVisibility("excluded");
            }
        },

        createVersionInfo() {
            const font = new qx.bom.Font(19, ["JosefinSlab Bold"]);
            const qooxdoo = new qx.ui.basic.Label("qooxdoo").set({
                font,
                paddingBottom: 3,
                cursor: "pointer",
            });
            qooxdoo.addListener("mouseover", () => qooxdoo.setTextColor("text-selected"));
            qooxdoo.addListener("mouseout", () => qooxdoo.setTextColor("text-label"));
            qooxdoo.addListener("click", () => this.__buttonPanel.pressButton("WebBrowser"));

            const container = new qx.ui.container.Composite(
                new qx.ui.layout.HBox(5).set({ alignY: "middle" })
            );
            container.add(new qx.ui.basic.Label("powered by").set({ font: "small" }));
            container.add(qooxdoo);
            container.add(
                new qx.ui.basic.Label(qx.core.Environment.get("qx.version")).set({
                    font: "small",
                })
            );
            return container;
        },
    }
});