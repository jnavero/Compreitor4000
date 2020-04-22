var compreitor = compreitor || {};

//Core del motor.
(function() {

    var DELIVERYFORM = 'delivery-slot-form';
    var DELIVERYRADIOWINDOW = 'delivery-window-radio';
    var FINISHSHOP = 'spc-form-place-order-top';

	compreitor.Main = function() {
	   try
	   {

           var compreitor4000S = sessionStorage.getItem('compreitor4000S');
           
           if(!compreitor4000S == null || !compreitor4000S){
               var deliveryForm = document.getElementById(DELIVERYFORM);

               if(deliveryForm){

                    var inputs = deliveryForm.getElementsByTagName('input');
                    var index;
                    var found = false;
                    console.log('Buscando horas disponibles...');
                    for (index = 0; index < inputs.length; index++) {
                        if (inputs[index].type == "radio" && 
                            inputs[index].name == DELIVERYRADIOWINDOW && 
                            inputs[index].disabled == false) {
                            inputs[index].checked = true;
                            inputs[index].click();
                             console.log('Hora seleccionada...');
                                found = true;
                                break;
                        }
                    }

                    if(found){
                        
                        var btnContinue = document.getElementById('delivery-slot-panel-continue-button-bottom');
                        if(btnContinue){
                            console.log('Se hace el submit del formulario...');
                            sessionStorage.setItem('compreitor4000S', 'true');
                            compreitor4000S = true;
                            btnContinue.click();
                            sleep(2000);
                            setTimeout(function(){ compreitor.Shopping(); }, 500);

                        }

                    }else{
                        console.log('Refrescando la pagina...');
                        setTimeout(function(){ location.reload() }, 50);
                    }
               }
           }

	   }catch(err){
	       console.log(err);
	   }
	}

    compreitor.Shopping = function() {

        var compreitor4000S = sessionStorage.getItem('compreitor4000S');
        if(compreitor4000S){

            var submitForm = document.getElementById(FINISHSHOP);
            if(submitForm){
                sessionStorage.removeItem('compreitor4000S');
                sessionStorage.removeItem('compreitor4000');
 
                var btn = document.getElementById('houdini-checkout-place-order-button');
                if(btn && btn.className.indexOf('disabled') == -1){
                        //btn.click();
                        alert('PEDIDO REALIZADO');
                        console.log('Pedido Realizado...');
 
                }
            }
        }
    }

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

})(compreitor);

setTimeout(function(){ 

        var autoShopping = sessionStorage.getItem('compreitor4000');
        if(autoShopping == null){
            autoShopping = false;
        }

        if(!autoShopping){
            var response = confirm("¿Automatizar la compra?");
            if (response == true) {
                sessionStorage.setItem('compreitor4000', 'true');
                autoShopping = true;
            } else {
                alert('Compra no automazada...');
            }
        }

        if(autoShopping){

            setTimeout(function(){ 
               //check bug fix***
               var btnContinue = document.getElementById('delivery-slot-panel-continue-button-bottom');
               if(btnContinue == null){    
                   var btnchk = document.getElementById('houdini-checkout-place-order-button');
                   if(btnchk){
                        if(btnchk.className.indexOf('disabled') != -1){
                             console.log('BUG: Refrescando la pagina...');
                             setTimeout(function(){ location.reload() }, 50);
                        }
                    }
               }
            }, 8000);


            console.log('Iniciando el proceso...');
            compreitor.Main();
        }    


}, 500);



