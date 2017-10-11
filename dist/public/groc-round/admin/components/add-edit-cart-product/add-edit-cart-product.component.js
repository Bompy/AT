var GrocRoundAdminAddEditCartProductComponent;!function(t){var e=function(){return function(t,e,r,o,d,a,i,u){var c=this;this.$q=t,this.$routeParams=e,this.$location=r,this.ToastService=o,this.CartProductsService=d,this.AutoCompleteService=a,this.CartsService=i,this.ProductsService=u,this.clearMembers=function(){c.loading=!1,c.adding=!1,c.updating=!1,c.productText="",c.addDetails={user:null,round:null,cartId:null,product:{productId:"",label:"",quantity:0,value:0}},c.updateDetails={product:null}},this.determineModeAndGetData=function(){if(c.$routeParams.cartProductId)c.editMode=!0,c.loading=!0,c.getCartProductInfo(c.$routeParams.cartProductId).finally(function(){c.loading=!1});else{var t=c.$location.search();if(!t.cartId)return void window.history.back();c.editMode=!1,c.loading=!0,c.getCartInfo(t.cartId).finally(function(){c.loading=!1})}},this.attachToPromises=function(){c.ProductsService.promises.getProducts.then(function(t){t&&(c.errorMessage=null,c.ProductsService.products.forEach(function(t){c.products.push({productId:t.id,label:t.label})}))}).catch(function(t){c.errorMessage=t&&t.message?t.message:"Couldn't get shops"})},this.getCartInfo=function(t){return c.CartsService.getCart(t).then(function(e){c.addDetails.user=e.user,c.addDetails.round=e.round,c.addDetails.cartId=t}).catch(function(t){c.errorMessage=t&&t.message?t.message:"Couldn't get cartProduct record"})},this.getCartProductInfo=function(t){return c.CartProductsService.getCartProduct(t).then(function(t){c.metaUser=t.user,c.metaRound=t.round,c.updateDetails={product:t.product}}).catch(function(t){c.errorMessage=t&&t.message?t.message:"Couldn't get cartProduct record"})},this.queryProducts=function(t){c.AutoCompleteService.queryProducts(t,c.products)},this.addCartProduct=function(){var t=c.AutoCompleteService.getProduct(c.productText,c.products);return t?(c.addDetails.product.productId=t.productId,c.addDetails.product.label=t.label,c.addDetails.product.quantity?c.addDetails.product.value?(c.adding=!0,c.CartProductsService.addCartProduct(c.addDetails).then(function(t){c.$location.path("/cartProducts/"+c.addDetails.cartId)}).finally(function(){c.adding=!1})):c.ToastService.showSimple("Product value is missing"):c.ToastService.showSimple("Product quantity is missing")):c.ToastService.showSimple("Product info is missing")},this.updateCartProduct=function(){var t=c.AutoCompleteService.getProduct(c.productText,c.products);return t?(c.updateDetails.product.productId=t.productId,c.updateDetails.product.label=t.label,c.updateDetails.product.quantity?c.updateDetails.product.value?(c.updating=!0,c.CartProductsService.updateCartProduct(c.$routeParams.cartProductId,c.updateDetails).then(function(t){window.history.back()}).finally(function(){c.updating=!1})):c.ToastService.showSimple("Product value is missing"):c.ToastService.showSimple("Product quantity is missing")):c.ToastService.showSimple("Product info is missing")},this.clearMembers(),this.determineModeAndGetData(),this.attachToPromises()}}();t.Component=e}(GrocRoundAdminAddEditCartProductComponent||(GrocRoundAdminAddEditCartProductComponent={}));