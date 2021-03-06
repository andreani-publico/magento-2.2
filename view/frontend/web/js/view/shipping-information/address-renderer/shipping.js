/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'underscore',
    'uiComponent',
    'Magento_Customer/js/customer-data',
    'Temando_Shipping/js/model/collection-points'
], function (_, Component, customerData, collectionPoints) {
    'use strict';

    var countryData = customerData.get('directory-data');

    return Component.extend({
        defaults: {
            template: 'Magento_Checkout/shipping-information/address-renderer/default'
        },
        collectionPoints: collectionPoints,

        /**
         * @param {*} countryId
         * @return {String}
         */
        getCountryName: function (countryId) {
            return countryData()[countryId] != undefined ? countryData()[countryId].name : ''; //eslint-disable-line
        },

        getAltura: function ()
        {
            if(!isCustomerLoggedIn && jQuery('#shipping-new-address-form input[name="altura"]').val())
            {
                return jQuery('#shipping-new-address-form input[name="altura"]').val();
            }

            if(typeof this.address() != "undefined" && typeof this.address().customAttributes != "undefined")
            {
                if(typeof this.address().customAttributes.altura != "undefined"
                    && typeof this.address().customAttributes.altura.value != "undefined")
                    return this.address().customAttributes.altura.value;
                if(typeof this.address().customAttributes.altura != "undefined")
                    return this.address().customAttributes.altura;

                return '';
            }
        },
        getPiso: function ()
        {
            if(!isCustomerLoggedIn && jQuery('#shipping-new-address-form input[name="piso"]').val())
            {
                return ', Piso: ' + jQuery('#shipping-new-address-form input[name="piso"]').val();
            }

            if(typeof this.address() != "undefined" && typeof this.address().customAttributes != "undefined")
            {
                if(typeof this.address().customAttributes.piso != "undefined"
                    && typeof this.address().customAttributes.piso.value != "undefined")
                    return ', Piso: ' + this.address().customAttributes.piso.value;
                if(typeof this.address().customAttributes.piso != "undefined")
                    return ', Piso: ' + this.address().customAttributes.piso;

                return '';
            }
        },
        getDepartamento: function ()
        {
            if(!isCustomerLoggedIn && jQuery('#shipping-new-address-form input[name="departamento"]').val())
            {
                return ', Departamento: ' + jQuery('#shipping-new-address-form input[name="departamento"]').val();
            }

            if(typeof this.address() != "undefined" && typeof this.address().customAttributes != "undefined")
            {
                if(typeof this.address().customAttributes.departamento != "undefined"
                    && typeof this.address().customAttributes.departamento.value != "undefined")
                    return ', Departamento: ' + this.address().customAttributes.departamento.value;
                if(typeof this.address().customAttributes.departamento != "undefined")
                    return ', Departamento: ' + this.address().customAttributes.departamento;

                return '';
            }

        },

        getRegionNameByCode: function (countryId, regionCode) {
            var result = regionCode;
            var countryRegions = countryData()[countryId].regions || {};

            if (_.size(countryRegions) > 0) {
                var region = _.filter(countryRegions, (function (element) {
                        return element.code === regionCode;
                    })
                );

                if (region.length > 0) {
                    result = region[0].name;
                }
            }

            return result;
        },

        getTemplate: function () {
            var collectionPoint = collectionPoints.getSelectedCollectionPoint();
            if (collectionPoint) {
                return 'Temando_Shipping/checkout/shipping/address-renderer/collection-point';
            }
            // handle other specific adresses here
            return this.template;
        }
    });
});
