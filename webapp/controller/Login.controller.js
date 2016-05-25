sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'

], function(Controller, JSONModel) {
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.Login", {
        onInit: function() {
            var userModel = new JSONModel({
                username: '',
                password: '',
                fullName: '',
                gender: '',
                year: '',
                email: '',
                height: '',
                weight: ''
            });
            this.getView().setModel(userModel);
            this.config = new sap.ui.core.Configuration();
        },

        onRegister: function(oEvent) {
            this.getOwnerComponent().getRouter().navTo("register");
        },
        onLogin: function(oEvent) {
            var userModel = this.getView().getModel().oData;
            $.ajax({
                url: "log-in",
                method: "post",
                contentType: "application/json",
                data: JSON.stringify(userModel)
            }).done(function(data, statusText, xhr) {
                // Redirect to the page of the logged in user
                if (xhr.status != 200) {
                    // The authentication failed
                    // Display error or something else
                    console.log(statusText);
                } else {
                    // Update the user model
                    console.log(data);
                    this.getOwnerComponent().getRouter().navTo("main");
                }
            });
        }
    });
});
