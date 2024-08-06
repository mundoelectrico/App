// Función para alternar la visibilidad del menú hamburguesa

function toggleMenu() {
  var mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.style.display = (mobileMenu.style.display === 'block') ? 'none' : 'block';
}


document.addEventListener('DOMContentLoaded', () => {
  const openPopup = document.getElementById('openPopup');
  const closePopup = document.getElementById('closePopup');
  const popup = document.getElementById('popup');

  openPopup.addEventListener('click', () => {
      popup.style.display = 'flex'; // Mostrar el popup
  });

  closePopup.addEventListener('click', () => {
      popup.style.display = 'none'; // Ocultar el popup
  });

  // Opcional: cerrar el popup si el usuario hace clic fuera del contenido
  window.addEventListener('click', (event) => {
      if (event.target === popup) {
          popup.style.display = 'none';
      }
  });
});




window.addEventListener("load",function(){

  document.getElementById("Alerta").hidden=true;
  document.getElementById("Resultado").hidden=true;
  document.getElementById("CalibreMCM").disabled = true;

  document.getElementById("FactorAgrupamiento").innerHTML = "<strong> (100%)  </strong>";
  document.getElementById("FactorTemperartura").innerHTML = "<strong>(" + 100*1.08 +"%)</strong>";

  document.getElementById("ConductoresActivos").disabled = true;
  document.getElementById("Temperatura"       ).disabled = true;

  document.getElementById("Enlace1"  ).style.color   = "darkgoldenrod";
  document.getElementById("Enlace2"  ).style.color   = "darkgoldenrod";
  document.getElementById("Enlace3"  ).style.color   = "darkgoldenrod";
  document.getElementById("openPopup").style.color   = "darkgoldenrod";

}); 


OtraLista.addEventListener("click",function(){

  var CambiarLista = document.getElementById("OtraLista").checked;

    if (CambiarLista == true){

      document.getElementById("CalibreMCM").disabled = false;
      document.getElementById("CalibreAWG").disabled = true;
      
    } else {

      document.getElementById("CalibreMCM").disabled = true;
      document.getElementById("CalibreAWG").disabled = false;

    }

    
}); 


ConductoresActivos.addEventListener("change",function(){

  var Nactivos = document.getElementById("ConductoresActivos").value;

    if (Nactivos =="1-3"){
      document.getElementById("FactorAgrupamiento").innerHTML = "<strong> (100%)  </strong>";
    }
    if (Nactivos =="4-6"){
      document.getElementById("FactorAgrupamiento").innerHTML = "<strong> (80%)  </strong>";
    }
    if (Nactivos =="7-9"){
      document.getElementById("FactorAgrupamiento").innerHTML = "<strong> (70%)  </strong>";
    }
    if (Nactivos =="10-20"){
      document.getElementById("FactorAgrupamiento").innerHTML = "<strong> (50%)  </strong>";
    }
    if (Nactivos =="21-30"){
      document.getElementById("FactorAgrupamiento").innerHTML = "<strong> (45%)  </strong>";
    }
    if (Nactivos =="31-40"){
      document.getElementById("FactorAgrupamiento").innerHTML = "<strong> (40%)  </strong>";
    }
    if (Nactivos =="41-mas"){
      document.getElementById("FactorAgrupamiento").innerHTML = "<strong> (35%)  </strong>";
    }

    
}); 


ListaTemperatura.addEventListener("change",function(){

  var TipoAislamiento = document.getElementById("Aislamiento").value;
  var TempAmbiente = document.getElementById("Temperatura").value;
  var Material = document.getElementById("Material").value;
  
  var Temp = 100*Math.round(1000*FTemp(TempAmbiente,TipoAislamiento, Material))/1000;

  document.getElementById("FactorTemperartura").innerHTML = "<strong>(" + Temp +"%)</strong>";   


}); 

Aislamiento.addEventListener("change",function(){

  var TipoAislamiento = document.getElementById("Aislamiento").value;
  var TempAmbiente = document.getElementById("Temperatura").value;
  var Material = document.getElementById("Material").value;

  var Temp = 100*Math.round(1000*FTemp(TempAmbiente,TipoAislamiento,Material))/1000;

  document.getElementById("FactorTemperartura").innerHTML = "<strong>(" + Temp +"%)</strong>";   

}); 


FGrupo.addEventListener("click",function(){

  var seleccionado = document.getElementById("FGrupo").checked;

  if (seleccionado == true){
    document.getElementById("ConductoresActivos").disabled = false;
  } 
  
  if (seleccionado == false){
    document.getElementById("ConductoresActivos").disabled = true;
  } 

      
}); 


FTemp.addEventListener("click",function(){

  var seleccionado = document.getElementById("FTemp").checked;

  if (seleccionado == true){
    document.getElementById("Temperatura").disabled = false;
  } 
  
  if (seleccionado == false){
    document.getElementById("Temperatura").disabled = true;
  } 

      
}); 




// Inicio de Busqueda 


BotonBuscar.addEventListener("click",function(){

  var TipoMaterial = document.getElementById("Material").value;
  var TipoAislamiento = document.getElementById("Aislamiento").value;
  var TempAmbiente = document.getElementById("Temperatura").value;
  var CondActivos = document.getElementById("ConductoresActivos").value;
  var OtraLista = document.getElementById("OtraLista").checked;
  var Temperatura = document.getElementById("FTemp").checked;
  var Agrupamiento = document.getElementById("FGrupo").checked;
  var AWG = document.getElementById("CalibreAWG").value;
  var MCM = document.getElementById("CalibreMCM").value;

  var FT, FA;
  var i = 0;
  var IZ;
  
  var Tabla = CorrienteCalibre(TipoMaterial, TipoAislamiento,);
  var Calibre = Tabla[0];
  var CorrienteTabla = Tabla[1];

  document.getElementById("Alerta"   ).hidden=true;
  document.getElementById("Resultado").hidden=true;

  if (Temperatura  == true){ FT = FTemp(TempAmbiente,TipoAislamiento,TipoMaterial); }
  else { FT = 1;}

  if (Agrupamiento == true){ FA = FAgrup(CondActivos);                 }
  else { FA = 1;}


  

   if (FT == 0){
     document.getElementById("Alerta").hidden=false;
     document.getElementById("Alerta").innerHTML = "<strong> Para este rango de Temperatura y Tipo de Aislamiento no esta definido ningun factor de temperatura, pruebe con otros valores! </strong>";
   } else {
       for (i=0;i<=25;i++) {   
         if (OtraLista == false){
           if ( AWG == Calibre[i] ){ IZ = Math.round(1000*FA*FT*CorrienteTabla[i])/1000; }        
         } else {
           if ( MCM == Calibre[i] ){ IZ = Math.round(1000*FA*FT*CorrienteTabla[i])/1000; }        
           }      
         }
   }


   if (IZ == 0){
  
    document.getElementById("Alerta").hidden=false;
    document.getElementById("Alerta").innerHTML = "<strong> Para este Calibre, Material del Conductor y Tipo de Aislamiento no esta definido ningun valor de corriente, pruebe con otros valores! </strong>";   

    } else {

      document.getElementById("Resultado").hidden=false;
      document.getElementById("Resultado").innerHTML = "<strong><center>" + IZ + " Amp </center></strong>";
      

    } 
   


}); 


CorrienteCalibre = function (Material, Aislamiento) {

  const Corriente = Array.of(26);
  const Calibre = Array.of(26);
  const Resultado = Array.of(2);


  Calibre[0] =  "#18";
  Calibre[1] =  "#16";
  Calibre[2] =  "#14";
  Calibre[3] =  "#12";
  Calibre[4] =  "#10";
  Calibre[5] =  "#8";
  Calibre[6] =  "#6";
  Calibre[7] =  "#4";
  Calibre[8] =  "#3";
  Calibre[9] =  "#2";
  Calibre[10] = "#1";
  Calibre[11] = "#1/0";
  Calibre[12] = "#2/0";
  Calibre[13] = "#3/0";
  Calibre[14] = "#4/0";
  Calibre[15] = "250 MCM";
  Calibre[16] = "300 MCM";
  Calibre[17] = "350 MCM";
  Calibre[18] = "400 MCM";
  Calibre[19] = "500 MCM";
  Calibre[20] = "600 MCM";
  Calibre[21] = "700 MCM";
  Calibre[22] = "750 MCM";
  Calibre[23] = "800 MCM";
  Calibre[24] = "900 MCM";
  Calibre[25] = "1000 MCM";

  if (Material =="Cobre"){

    if (Aislamiento =="TW"){
      
      Corriente[0] =0; 
      Corriente[1] =0;
      Corriente[2] =15; 
      Corriente[3] =20; 
      Corriente[4] =30; 
      Corriente[5] =40; 
      Corriente[6] =55; 
      Corriente[7] =70; 
      Corriente[8] = 85;
      Corriente[9] = 95;
      Corriente[10] = 110;
      Corriente[11] =125;
      Corriente[12] = 145;
      Corriente[13] = 165;
      Corriente[14] = 195;
      Corriente[15] = 215;
      Corriente[16] = 240;
      Corriente[17] = 260;
      Corriente[18] = 280;
      Corriente[19] = 320;
      Corriente[20] =350;
      Corriente[21] =385;
      Corriente[22] =400;
      Corriente[23] =410;
      Corriente[24] =435;
      Corriente[25] =455;
         
      const Resultado = [Calibre,Corriente];
      return Resultado;     
    } 

    if (Aislamiento =="THW"){
      
      Corriente[0] =0; 
      Corriente[1] =0;
      Corriente[2] =20; 
      Corriente[3] =25; 
      Corriente[4] =35; 
      Corriente[5] =50; 
      Corriente[6] =65; 
      Corriente[7] =85; 
      Corriente[8] =100;
      Corriente[9] =115;
      Corriente[10] =130;
      Corriente[11] =150;
      Corriente[12] =175;
      Corriente[13] =200;
      Corriente[14] =230;
      Corriente[15] =255;
      Corriente[16] =285;
      Corriente[17] =310;
      Corriente[18] =335;
      Corriente[19] =380;
      Corriente[20] =420;
      Corriente[21] =460;
      Corriente[22] =475;
      Corriente[23] =490;
      Corriente[24] =520;
      Corriente[25] =545;
         
      const Resultado = [Calibre,Corriente];
      return Resultado;     
    } 

    if (Aislamiento =="THHW"){
      
      Corriente[0] =14; 
      Corriente[1] =18;
      Corriente[2] =25; 
      Corriente[3] =30; 
      Corriente[4] =40; 
      Corriente[5] =55; 
      Corriente[6] =75; 
      Corriente[7] =95; 
      Corriente[8] =115;
      Corriente[9] =130;
      Corriente[10] =145;
      Corriente[11] =170;
      Corriente[12] =195;
      Corriente[13] =225;
      Corriente[14] =260;
      Corriente[15] =290;
      Corriente[16] =320;
      Corriente[17] =350;
      Corriente[18] =380;
      Corriente[19] =430;
      Corriente[20] =475;
      Corriente[21] =520;
      Corriente[22] =535;
      Corriente[23] =555;
      Corriente[24] =585;
      Corriente[25] =615;
         
      const Resultado = [Calibre,Corriente];
      return Resultado;     
    } 

  } 


  if (Material =="Aluminio"){

    if (Aislamiento =="TW"){
      
      Corriente[0] =0; 
      Corriente[1] =0;
      Corriente[2] =0; 
      Corriente[3] =15; 
      Corriente[4] =25; 
      Corriente[5] =35; 
      Corriente[6] =40; 
      Corriente[7] =55; 
      Corriente[8] = 65;
      Corriente[9] = 75;
      Corriente[10] =85;
      Corriente[11] =100;
      Corriente[12] = 115;
      Corriente[13] = 130;
      Corriente[14] = 150;
      Corriente[15] = 170;
      Corriente[16] = 195;
      Corriente[17] = 210;
      Corriente[18] = 225;
      Corriente[19] = 260;
      Corriente[20] =285;
      Corriente[21] =315;
      Corriente[22] =320;
      Corriente[23] =330;
      Corriente[24] =355;
      Corriente[25] =375;
         
      const Resultado = [Calibre,Corriente];
      return Resultado;     
    } 

    if (Aislamiento =="THW"){
      
      Corriente[0] =0; 
      Corriente[1] =0;
      Corriente[2] =0; 
      Corriente[3] =20; 
      Corriente[4] =30; 
      Corriente[5] =40; 
      Corriente[6] =50; 
      Corriente[7] =65; 
      Corriente[8] =75;
      Corriente[9] =90;
      Corriente[10] =100;
      Corriente[11] =120;
      Corriente[12] =135;
      Corriente[13] =155;
      Corriente[14] =180;
      Corriente[15] =205;
      Corriente[16] =230;
      Corriente[17] =250;
      Corriente[18] =270;
      Corriente[19] =310;
      Corriente[20] =340;
      Corriente[21] =375;
      Corriente[22] =385;
      Corriente[23] =395;
      Corriente[24] =425;
      Corriente[25] =445;
         
      const Resultado = [Calibre,Corriente];
      return Resultado;     
    } 

    if (Aislamiento =="THHW"){
      
      Corriente[0] =0; 
      Corriente[1] =0;
      Corriente[2] =0; 
      Corriente[3] =25; 
      Corriente[4] =35; 
      Corriente[5] =45; 
      Corriente[6] =55; 
      Corriente[7] =75; 
      Corriente[8] =85;
      Corriente[9] =100;
      Corriente[10] =115;
      Corriente[11] =135;
      Corriente[12] =150;
      Corriente[13] =175;
      Corriente[14] =205;
      Corriente[15] =230;
      Corriente[16] =260;
      Corriente[17] =280;
      Corriente[18] =305;
      Corriente[19] =350;
      Corriente[20] =385;
      Corriente[21] =425;
      Corriente[22] =435;
      Corriente[23] =445;
      Corriente[24] =480;
      Corriente[25] =500;
         
      const Resultado = [Calibre,Corriente];
      return Resultado;     
    } 

  }   


};


FTemp = function (Temperatura, Aislamiento, Material) {  

  if (Material =="Cobre"){

    if (Aislamiento =="TW"){
      if (Temperatura =="21-25"){return 1.08; } 
      if (Temperatura =="26-30"){return 1.00; } 
      if (Temperatura =="31-35"){return 0.91; } 
      if (Temperatura =="36-40"){return 0.82; } 
      if (Temperatura =="41-45"){return 0.71; } 
      if (Temperatura =="46-50"){return 0.58; } 
      if (Temperatura =="51-55"){return 0.41; } 
      if (Temperatura =="56-60"){return    0; } 
      if (Temperatura =="61-70"){return    0; }
      if (Temperatura =="71-80"){return    0; }
  
    } 
  
    if (Aislamiento =="THW"){
      if (Temperatura =="21-25"){return 1.05; } 
      if (Temperatura =="26-30"){return 1.00; } 
      if (Temperatura =="31-35"){return 0.94; } 
      if (Temperatura =="36-40"){return 0.88; } 
      if (Temperatura =="41-45"){return 0.82; } 
      if (Temperatura =="46-50"){return 0.75; } 
      if (Temperatura =="51-55"){return 0.67; } 
      if (Temperatura =="56-60"){return 0.58; } 
      if (Temperatura =="61-65"){return 0.33; } 
      if (Temperatura =="66-70"){return    0; } 
  
    } 

    if (Aislamiento =="THHW"){
      if (Temperatura =="21-25"){return 1.04; } 
      if (Temperatura =="26-30"){return 1.00; } 
      if (Temperatura =="31-35"){return 0.96; } 
      if (Temperatura =="36-40"){return 0.91; } 
      if (Temperatura =="41-45"){return 0.87; } 
      if (Temperatura =="46-50"){return 0.82; } 
      if (Temperatura =="51-55"){return 0.76; } 
      if (Temperatura =="56-60"){return 0.71; } 
      if (Temperatura =="61-65"){return 0.56; } 
      if (Temperatura =="66-70"){return 0.41; } 

    } 

  }


  if (Material =="Aluminio"){

    if (Aislamiento =="TW"){
      if (Temperatura =="21-25"){return 1.08; } 
      if (Temperatura =="26-30"){return 1.00; } 
      if (Temperatura =="31-35"){return 0.91; } 
      if (Temperatura =="36-40"){return 0.82; } 
      if (Temperatura =="41-45"){return 0.71; } 
      if (Temperatura =="46-50"){return 0.58; } 
      if (Temperatura =="51-55"){return 0.41; } 
      if (Temperatura =="56-60"){return    0; } 
      if (Temperatura =="61-70"){return    0; } 
      if (Temperatura =="71-80"){return    0; } 
  
    } 
  
    if (Aislamiento =="THW"){
      if (Temperatura =="21-25"){return 1.05; } 
      if (Temperatura =="26-30"){return 1.00; } 
      if (Temperatura =="31-35"){return 0.94; } 
      if (Temperatura =="36-40"){return 0.88; } 
      if (Temperatura =="41-45"){return 0.82; } 
      if (Temperatura =="46-50"){return 0.75; } 
      if (Temperatura =="51-55"){return 0.67; } 
      if (Temperatura =="56-60"){return 0.58; } 
      if (Temperatura =="61-65"){return 0.33; } 
      if (Temperatura =="66-70"){return    0; } 
  
    } 

    if (Aislamiento =="THHW"){
      if (Temperatura =="21-25"){return 1.04; } 
      if (Temperatura =="26-30"){return 1.00; } 
      if (Temperatura =="31-35"){return 0.98; } 
      if (Temperatura =="36-40"){return 0.91; } 
      if (Temperatura =="41-45"){return 0.87; } 
      if (Temperatura =="46-50"){return 0.82; } 
      if (Temperatura =="51-55"){return 0.78; } 
      if (Temperatura =="56-60"){return 0.71; } 
      if (Temperatura =="61-65"){return 0.58; } 
      if (Temperatura =="66-70"){return 0.41; } 

    } 

  }


};


FAgrup = function (Conductores) {  

if (Conductores =="1-3"   ) { return 1.00;} 
if (Conductores =="4-6"   ) { return 0.80;} 
if (Conductores =="7-9"   ) { return 0.70;} 
if (Conductores =="10-20" ) { return 0.50;} 
if (Conductores =="21-30" ) { return 0.45;} 
if (Conductores =="31-40" ) { return 0.40;} 
if (Conductores =="41-mas") { return 0.35;} 

};