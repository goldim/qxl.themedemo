qx.Class.define("qxl.themedemo.window.Factory", {
    type: "static",

    statics: {
        getWindow(name){
            switch (name){
                case "WidgetBrowser":
                    return new qxl.themedemo.WidgetBrowser();
                case "WebBrowser":
                    return new qxl.themedemo.window.WebBrowser();
                case "Table":
                    return new qxl.themedemo.window.Table();
                case "Calculator":
                    return new qxl.themedemo.window.Calculator();
                case "ColorSelector":
                    return new qxl.themedemo.window.ColorChooser();
                case "AudioPlayer":
                    return new qxl.themedemo.window.Player();
            }
        }
    }
});