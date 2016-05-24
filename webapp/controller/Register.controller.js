sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/ui/model/SimpleType',
    'sap/ui/model/ValidateException'

], function (jQuery, Controller, JSONModel, SimpleType, ValidateException) {
    "use strict";
    return Controller.extend("sap.ui.demo.wt.controller.Register", {

        onInit: function () {

            this.config = new sap.ui.core.Configuration();


            // attach handlers for validation errors
            sap.ui.getCore().attachValidationError(function (evt) {
                var control = evt.getParameter("element");
                if (control && control.setValueState) {
                    control.setValueState("Error");
                }
            });
            sap.ui.getCore().attachValidationSuccess(function (evt) {
                var control = evt.getParameter("element");
                if (control && control.setValueState) {
                    control.setValueState("None");
                }
            });
        },
        onSignUp : function(oEvent) {



        var that = this;
            var userModel = this.getOwnerComponent().getModel("newUserModel").oData;
            $.ajax({
                url: "sign-up",
                method: "post",
                contentType: "application/json",
                data : JSON.stringify(userModel)
            }).done(function(msg) {
                // Redirect to the page of the newly created users
                // msg.id is the id of the newly created user
                var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                oRouter.navTo("main");
            });
        },
        typeEMail : SimpleType.extend("email", {
            formatValue: function (oValue) {
                return oValue;
            },
            parseValue: function (oValue) {
                //parsing step takes place before validating step, value can be altered
                return oValue;
            },
            validateValue: function (oValue) {
                // The following Regex is NOT a completely correct one and only used for demonstration purposes.
                // RFC 5322 cannot even checked by a Regex and the Regex for RFC 822 is very long and complex.
                var mailregex = '\\S+@\\S+\\.\\S+';
                if (!oValue.match(mailregex)) {
                    throw new ValidateException("'" + oValue + "' is not a valid email address");
                }
            }
        })

    });
});


