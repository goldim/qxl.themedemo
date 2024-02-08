qx.Class.define("qxl.themedemo.window.Factory", {
    type: "static",

    statics: {
        getWindow(name){
            switch (name){
                case "WidgetBrowser":
                    return new qxl.themedemo.WidgetBrowser();
                case "WebBrowser":
                    return new qxl.themedemo.WebBrowser();
                case "Table":
                    return new qxl.themedemo.TableWindow();
                case "Calculator":
                    return new qxl.themedemo.Calculator();
                case "ColorSelector":
                    return new qxl.themedemo.ColorChooser();
                case "AudioPlayer":
                    return new qxl.themedemo.PlayerWindow();
            }
        }
    }
});