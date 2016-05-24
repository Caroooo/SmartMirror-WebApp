sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
    "use strict";
    var Component = UIComponent.extend("sap.ui.demo.wt.Component", {
        metadata: {
            manifest: "json"
        }
    });

    Component.prototype.init = function () {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            this.getRouter().initialize();

        //model for new user --> needed when a new user wants to sign-up
        var newUserModel = new JSONModel({
            username: '',
            pass: '',
            fullName: '',
            gender: '',
            year: '',
            email: '',
            height: '',
            weight: ''
        });
        this.setModel(newUserModel, "newUserModel");

        //model for current loged In user
        var userModel = new JSONModel({
            userId: '',
            username: '',
            pass: '',
            fullName: '',
            gender: '',
            year: '',
            email: '',
            height: '',
            weight: '',
            reminders: ''
        })
        this.setModel(userModel, "userModel");

    };

});