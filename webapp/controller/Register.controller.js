sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'

], function (Controller, JSONModel) {
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.Register", {

        onInit: function () {
            var userModel = new JSONModel({
                username: '',
                pass: '',
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
        onSignUp : function(oEvent) {
            var userModel = this.getView().getModel().oData;
            $.ajax({
                url: "sign-up",
                method: "post",
                contentType: "application/json",
                data : JSON.stringify(userModel)
            }).done(function(msg) {
                // Redirect to the page of the newly created users
                // msg.id is the id of the newly created user
                this.getOwnerComponent().getRouter().navTo("main");
            });
        }

    });
});


