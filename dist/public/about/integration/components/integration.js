var AboutComponentsIntegration;
(function (AboutComponentsIntegration) {
    AboutComponentsIntegration.integrate = function () {
        /*******************************************************************/
        angular.module("homeComponent", [
            "toolBarWidget",
            "sideNavWidget",
            "toastService",
            "descLimit"
        ]);
        angular.module("homeComponent").component("homeComponent", {
            templateUrl: "/about/components/home/home.template.html",
            controller: home
        });
        home.$inject = [
            "$q",
            "ToastService"
        ];
        function home($q, ToastService) {
            return new AboutHomeComponent.Component($q, ToastService);
        }
        /*******************************************************************/
        angular.module("sideNavWidget", []);
        angular.module("sideNavWidget").component("sideNavWidget", {
            templateUrl: "/about/widgets/side-nav/side-nav.template.html",
            controller: sideNav
        });
        function sideNav() {
            return new AboutSideNavWidget.Widget();
        }
        /*******************************************************************/
        angular.module("toolBarWidget", []);
        angular.module("toolBarWidget").component("toolBarWidget", {
            templateUrl: "/about/widgets/tool-bar/tool-bar.template.html",
            controller: toolBar,
            bindings: {
                title: "@"
            }
        });
        toolBar.$inject = [
            "$mdSidenav"
        ];
        function toolBar($mdSidenav) {
            return new AboutToolBarWidget.Widget($mdSidenav);
        }
        /*******************************************************************/
    };
})(AboutComponentsIntegration || (AboutComponentsIntegration = {}));
