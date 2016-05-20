
sap.ui.define([
    'sap/ui/core/mvc/Controller',

], function (Controller) {
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.Login", {

        onInit: function () {
            this.config = new sap.ui.core.Configuration();
        },

        onRegister : function(oEvent){
            this.getOwnerComponent().getRouter().navTo("register");
        },
        onLogin : function(oEvent){
            this.getOwnerComponent().getRouter().navTo("main");
        }
    });
});


