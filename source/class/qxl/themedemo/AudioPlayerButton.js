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

        onOpenHomepage(e) {
            if (!this.homePageWindow) {
              this.homePageWindow = new qxl.themedemo.WebBrowser();
            //   this.desktop.add(this.homePageWindow);
            }
            const options = e.getData();
            this.homePageWindow.setIcon(options.icon);
            this.homePageWindow.setCaption(options.caption);
            this.homePageWindow.surfTo(options.url);
            this.homePageWindow.open();
        },

        onOpenWikipedia(e) {
            if (!this.wikipediaWindow) {
                this.wikipediaWindow = new qxl.themedemo.WebBrowser();
                // this.desktop.add(this.wikipediaWindow);
            }
            const options = e.getData();
            this.wikipediaWindow.setIcon(options.icon);
            this.wikipediaWindow.setCaption(options.caption);
            this.wikipediaWindow.surfTo(options.url);
            this.wikipediaWindow.open();
        },

        onOpenVideo(e) {
            if (!this.videoWindow) {
              this.videoWindow = new qxl.themedemo.VideoWindow();
            //   this.desktop.add(this.videoWindow, { top: 60, right: 20 });
            }
            const options = e.getData();
            this.videoWindow.setIcon(options.icon);
            this.videoWindow.setCaption(options.caption);
            this.videoWindow.setVideoLink(options.video);
            this.videoWindow.open();
        }
    }
});