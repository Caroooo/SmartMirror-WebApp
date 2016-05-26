sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'
], function(Controller, JSONModel) {
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.Login", {
        onInit: function() {
            this.config = new sap.ui.core.Configuration();
        },
        onBeforeRendering: function() {
            var userModel = this.getOwnerComponent().getModel("user");
            this.getView().setModel(userModel);
        },
        onRegister: function(oEvent) {
            this.getOwnerComponent().getRouter().navTo("register");
        },
        onLogin: function(oEvent) {
            var userModel = this.getOwnerComponent().getModel("user");
            this.getOwnerComponent().setModel(userModel, "user");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            $.ajax({
                url: "log-in",
                method: "post",
                contentType: "application/json",
                data: JSON.stringify(userModel.oData)
            }).done(function(data, statusText, xhr) {
                // Redirect to the page of the logged in user
                if (xhr.status != 200) {
                    // The authentication failed
                    // Display error or something else
                    console.log(statusText);
                } else {
                    // Update the user model
                    console.log(data);
                    oRouter.navTo("main");
                }
            });
        }
    });
});
