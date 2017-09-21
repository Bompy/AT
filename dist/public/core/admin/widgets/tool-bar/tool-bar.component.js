var CoreAdminToolBarWidget;
(function (CoreAdminToolBarWidget) {
    var Widget = (function () {
        /***************************************************/
        function Widget($mdSidenav, ProfileService) {
            this.$mdSidenav = $mdSidenav;
            this.ProfileService = ProfileService;
            /***************************************************/
            this.signOut = function () {
            };
            this.progress = this.ProfileService.progress;
        }
        /***************************************************/
        Widget.prototype.toggleSideNav = function () {
            this.$mdSidenav("left").toggle();
        };
        return Widget;
    }());
    CoreAdminToolBarWidget.Widget = Widget;
})(CoreAdminToolBarWidget || (CoreAdminToolBarWidget = {}));
