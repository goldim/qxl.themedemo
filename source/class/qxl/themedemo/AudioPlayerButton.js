/* ************************************************************************

   Copyright:
     2015-2024 Norbert Schröder

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Norbert Schröder (scro34)
     * Dmitrii Zolotov (goldim)

************************************************************************ */

qx.Class.define("qxl.themedemo.AudioPlayerButton", {
    extend: qxl.themedemo.PanelButton,

    members: {
        _onPress(e) {
            super._onPress(e);
            this.window.addListener(
                "openHomepage",
                this.onOpenHomepage,
                this
            );
            this.window.addListener(
                "openWikipedia",
                this.onOpenWikipedia,
                this
            );
            this.window.addListener(
                "openVideo",
                this.onOpenVideo,
                this
            );
        },

        openPage(page, options){
            page.setIcon(options.icon);
            page.setCaption(options.caption);
            page.open();
        },

        openWebPage(page, options){
            page.surfTo(options.url);
            this.openPage(page, options);
        },

        openVideoPage(page, options){
            page.setVideoLink(options.video);
            this.openPage(page, options);
        },

        onOpenHomepage(e) {
            if (!this.homePageWindow) {
              this.homePageWindow = qxl.themedemo.window.Factory.getWindow("WebBrowser");
              this.homePageWindow.center();
              qxl.themedemo.Desktop.getInstance().add(this.homePageWindow);
            }
            this.openWebPage(this.homePageWindow, e.getData());
        },

        onOpenWikipedia(e) {
            if (!this.wikipediaWindow) {
                this.wikipediaWindow = qxl.themedemo.window.Factory.getWindow("WebBrowser");
                this.wikipediaWindow.center();
                qxl.themedemo.Desktop.getInstance().add(this.wikipediaWindow);
            }
            this.openWebPage(this.wikipediaWindow, e.getData());
        },

        onOpenVideo(e) {
            if (!this.videoWindow) {
              this.videoWindow = new qxl.themedemo.window.Video();
              qxl.themedemo.Desktop.getInstance().add(this.videoWindow, { top: 60, right: 20 });
            }
            this.openVideoPage(this.videoWindow, e.getData());
        }
    }
});