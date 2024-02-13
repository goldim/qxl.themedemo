qx.Class.define("qxl.themedemo.IconFactory", {
    extend: qx.core.Object,
    type: "singleton",

    construct(){
        this.__icons = qxl.themedemo.Icons;
    },

    members: {
        __icons: null,

        getIcons(){
            return this.__icons;
        },

        setSource(icons){
            this.__icons = icons;
        }
    }
});