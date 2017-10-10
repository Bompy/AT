module GrocRoundAdminAddEditDeliveryFeeComponent {

  import interfaces = GrocRoundAdminAddEditDeliveryFeeComponentInterfaces;
  import toastService = ToastServiceInterfaces;
  import dialogService = DialogServiceInterfaces;

  import deliveryFeesService = GrocRoundAdminDeliveryFeesServiceInterfaces;
  import autoCompleteService = GrocRoundAdminAutoCompleteServiceInterfaces;
  import selectService = GrocRoundAdminSelectServiceInterfaces;
  import usersService = GrocRoundAdminUsersServiceInterfaces;
  import roundsService = GrocRoundAdminRoundsServiceInterfaces;
  import superInfoService = GrocRoundAdminSuperInfoServiceInterfaces;

  import deliveryFee = DeliveryFee;
  import user = User;
  import round = Round;

  export class Component implements interfaces.Instance {

    /***************************************************/

    public editMode: boolean;
    public errorMessage: string;

    public loading: boolean;
    public adding: boolean;
    public updating: boolean;
    public deleting: boolean;

    public addDetails: deliveryFeesService.AddDetails;
    public updateDetails: deliveryFeesService.UpdateDetails;

    public metaUser: user.UserInfo;

    public users: user.UserInfo[];
    public rounds: round.RoundInfo[];

    public userText: string;
    public roundId: string;
    public productText: string;

    /***************************************************/

    constructor(
      private readonly $q: ng.IQService,
      private readonly $routeParams: ng.route.IRouteParamsService,
      private readonly $location: ng.ILocationService,
      private readonly ToastService: toastService.Instance,
      private readonly DeliveryFeesService: deliveryFeesService.Instance,
      private readonly AutoCompleteService: autoCompleteService.Instance,
      private readonly SelectService: selectService.Instance,      
      private readonly UsersService: usersService.Instance,
      private readonly RoundsService: roundsService.Instance,
      private readonly SuperInfoService: superInfoService.Instance
    ) {

      this.clearMembers();
      this.determineModeAndGetData();

    }

    /***************************************************/

    private clearMembers = () => {

      this.users = [];
      this.rounds = [];

      this.userText = "";
      this.roundId = "";
      this.productText = "";

      this.addDetails = {
        user: null,
        round: null,
        payment: {
          identifier: "",
          amount: 0,
          method: ""
        }
      };

      this.updateDetails = {
        round: null,
        payment: {
          identifier: "",
          amount: 0,
          method: ""
        }
      };

    }

    /***************************************************/

    private determineModeAndGetData = () => {

      if ( this.$routeParams.deliveryFeeId ) {

        this.editMode = true;

        this.loading = true;

        this.$q.all( [
          this.getDeliveryFeeInfo( this.$routeParams.deliveryFeeId ),
          this.getRounds()
        ] )
          .finally( () => {

            this.loading = false;

          } );

      } else {

        this.editMode = false;

        this.$q.all( [
          this.getUsers(),
          this.getRounds()
        ] )
          .then( ( results: any[] ) => {

            let qs = this.$location.search();

            if ( qs && qs.userId ) {
              this.userText = this.AutoCompleteService.reflectUser( qs.userId, this.users );
            }

            if ( qs && qs.roundId ) {
              this.roundId = this.AutoCompleteService.reflectRound( qs.roundId, this.rounds );
            }

          } )
          .finally( () => {

            this.loading = false;

          } );

      }

    }

    /***************************************************/

    private getUsers = () => {

      this.loading = true;

      this.UsersService.getUsers()
        .then( ( response: any ) => {

          this.users = [];

          this.SuperInfoService.users( this.UsersService.users ).forEach( ( user ) => {

            this.users.push( user );

          } );

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get deliveryFee record";

        } )
        .finally( () => {

          this.loading = false;

        } );


    }

    /***************************************************/

    private getRounds = () => {

      this.loading = true;

      this.RoundsService.getRounds()
        .then( ( foundRounds: round.Super[] ) => {

          this.rounds = [];

          foundRounds.forEach( ( round ) => {

            this.rounds.push( {
              roundId: round.id,
              roundName: round.roundName
            } );

          } );

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get deliveryFee record";

        } )
        .finally( () => {

          this.loading = false;

        } );


    }

    /***************************************************/

    private getDeliveryFeeInfo = ( id: string ) => {

      this.loading = true;

      this.DeliveryFeesService.getDeliveryFee( id )
        .then( ( foundDeliveryFee: deliveryFee.Super ) => {

          this.metaUser = foundDeliveryFee.user;

          angular.copy( foundDeliveryFee.round, this.updateDetails.round );
          this.AutoCompleteService.reflectRound( foundDeliveryFee.round.roundId, this.rounds );

          angular.copy( foundDeliveryFee.payment, this.updateDetails.payment );

        } )
        .catch( ( reason: any ) => {

          this.errorMessage = ( reason && reason.message ) ? reason.message : "Couldn't get deliveryFee record";

        } )
        .finally( () => {

          this.loading = false;

        } );

    }

    /***************************************************/

    public addDeliveryFee = (): any => {

      let user: user.UserInfo = this.AutoCompleteService.getUser( this.userText, this.users );
      if ( user ) {
        this.addDetails.user.userId = user.userId;
        this.addDetails.user.emailAddress = user.emailAddress;
        if ( user.fullName ) this.addDetails.user.fullName = user.fullName;
      } else {
        return this.ToastService.showSimple( "User info is missing" );
      }

      let round = this.SelectService.getRound( this.roundId, this.rounds );
      if ( round ) {
        this.addDetails.round.roundId = this.roundId;
        this.addDetails.round.roundName = round.roundName;
      } else {
        return this.ToastService.showSimple( "Round info is missing" );
      }

      if ( !this.addDetails.payment.identifier ) {
        return this.ToastService.showSimple( "Payment identifier is missing" );
      }

      if ( !this.addDetails.payment.amount ) {
        return this.ToastService.showSimple( "Payment amount is missing" );
      }

      if ( !this.addDetails.payment.method ) {
        return this.ToastService.showSimple( "Payment method is missing" );
      }

      this.adding = true;

      return this.DeliveryFeesService.addDeliveryFee( this.addDetails )
        .then( ( response: any ) => {

          this.$location.path( "/deliveryFees?userId=" + this.addDetails.user.userId );

        } )
        .finally( () => {

          this.adding = false;

        } );

    }

    /***************************************************/

    public updateDeliveryFee = (): any => {

      let round = this.SelectService.getRound( this.roundId, this.rounds );
      if ( round ) {
        this.updateDetails.round.roundId = round.roundId;
        this.updateDetails.round.roundName = round.roundName;
      } else {
        return this.ToastService.showSimple( "Round info is missing" );
      }

      if ( !this.updateDetails.payment.identifier ) {
        return this.ToastService.showSimple( "Payment identifier is missing" );
      }

      if ( !this.updateDetails.payment.amount ) {
        return this.ToastService.showSimple( "Payment amount is missing" );
      }

      if ( !this.updateDetails.payment.method ) {
        return this.ToastService.showSimple( "Payment method is missing" );
      }

      this.updating = true;

      return this.DeliveryFeesService.updateDeliveryFee( this.$routeParams.deliveryFeeId, this.updateDetails )
        .then( ( response: any ) => {

          window.history.back();

        } )
        .finally( () => {

          this.updating = false;

        } );

    }

    /***************************************************/

  }

}

    /*******************************************************************/