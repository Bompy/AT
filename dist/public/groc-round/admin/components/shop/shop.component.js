var GrocRoundAdminShopComponent;!function(o){var e=function(){return function(o,e,n,i,t,s,r){var h=this;this.$q=o,this.$location=e,this.$routeParams=n,this.$mdDialog=i,this.ToastService=t,this.DialogService=s,this.ShopsService=r,this.initMembers=function(){h.shop={}},this.deriveShopId=function(){h.$routeParams.shopId?h.getShopRecord(h.$routeParams.shopId):window.history.back()},this.getShopRecord=function(o){h.loading=!0;var e=h.ShopsService.shops.filter(function(e){return e.id===o});e.length?(h.shop=h.ShopsService.shops[h.ShopsService.shops.indexOf(e[0])],h.errorMessage=null,h.loading=!1):h.ShopsService.getShop(o).then(function(o){angular.copy(o,h.shop),h.errorMessage=null}).catch(function(o){h.errorMessage=o&&o.message?o.message:"Couldn't get shop record"}).finally(function(){h.loading=!1})},this.deleteShop=function(){h.deleting=!0,h.DialogService.showConfirm("Delete Shop","Are you sure?",null).then(function(o){return o?h.ShopsService.removeShop(h.shop.id):h.$q.reject()}).then(function(o){h.$location.path("/shops")}).finally(function(){h.deleting=!1})},this.initMembers(),this.deriveShopId()}}();o.Component=e}(GrocRoundAdminShopComponent||(GrocRoundAdminShopComponent={}));