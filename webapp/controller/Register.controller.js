
sap.ui.define([
    'sap/ui/core/mvc/Controller'

], function (Controller) {
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.Register", {

        onInit: function () {
            this.config = new sap.ui.core.Configuration();
        },
        onSend : function(oEvent){
            this.getOwnerComponent().getRouter().navTo("main");
        }

    });
});


