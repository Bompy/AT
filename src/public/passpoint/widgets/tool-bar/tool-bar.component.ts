module ToolBarWidget {

  import interfaces = ToolBarWidgetInterfaces;

  export class Widget implements interfaces.Instance {

    /***************************************************/

    constructor( private readonly $mdSidenav: ng.material.ISidenavService ) { }

    /***************************************************/

    public toggleSideNav () {
      this.$mdSidenav( "left" ).toggle();
    }

    /***************************************************/
  }

}