var GrocRoundAdminSideNavWidget;
(function (GrocRoundAdminSideNavWidget) {
    var Widget = (function () {
        /***************************************************/
        function Widget() {
            this.apps = [];
            this.locals = [];
            this.locals.push({
                href: "#/shops",
                icon: "business",
                caption: "Shops"
            });
            this.locals.push({
                href: "#/add-edit-shop",
                icon: "plus_one",
                caption: "Add Shop"
            });
            this.locals.push({
                href: "#/products",
                icon: "loyalty",
                caption: "Products"
            });
            this.locals.push({
                href: "#/add-edit-product",
                icon: "plus_one",
                caption: "Add Product"
            });
            this.apps.push({
                href: "/call263/admin",
                icon: "call",
                caption: "Call263"
            });
            this.apps.push({
                href: "/powertel/admin",
                icon: "web",
                caption: "Powertel"
            });
            this.apps.push({
                href: "/routers/admin",
                icon: "router",
                caption: "Routers"
            });
        }
        return Widget;
    }());
    GrocRoundAdminSideNavWidget.Widget = Widget;
})(GrocRoundAdminSideNavWidget || (GrocRoundAdminSideNavWidget = {}));
/*******************************************************************/ 
