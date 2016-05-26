sap.ui.define([
    'sap/ui/core/mvc/Controller',

], function(Controller) {
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.Main", {

        onInit: function() {
            this.config = new sap.ui.core.Configuration
            var userModel = this.getOwnerComponent().getModel("userModel");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            if (!userModel) {
                oRouter.navTo("login");
                return;
            } else {
                var userId = userModel.userId;
                console.log(userId);
                if (!userId) {
                    console.log("Navigate to Login");
                    oRouter.navTo("login");
                    return;
                }
            }
            $.ajax({
                url: userId,
                method: "get"
            }).done(function(data) {
                // Redirect to the page of the newly created users
                // msg.id is the id of the newly created user
                var model = JSON.parse(data);
                oRouter.navTo("main");
            });
        },
        onAfterRendering: {

        },
        onLogout: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("login");
        }

    });
});
