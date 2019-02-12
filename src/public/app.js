$(document).ready(function(){
  //Inicializador del elemento Slider
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 1000,
    to: 20000,
    prefix: "$"
  })

  function setSearch() {
    let busqueda = $('#checkPersonalizada')
    busqueda.on('change', (e) => {
      if (this.customSearch == false) {
        this.customSearch = true
      } else {
        this.customSearch = false
      }
      $('#personalizada').toggleClass('invisible')
    })
  }


  function Init(){
    $.ajax({
      url : 'http://localhost:8081/filterO',
      type : 'GET',
      dataType : 'json'
    }).done(function(data){
        if(!data.error){
          console.log(data);
          $('#ciudad').append(renderSelect(data.ciudades));
          $('#tipo').append(renderSelect(data.tipos));
          $('#ciudad').material_select();
          $('#tipo').material_select();
        }
    });
  }

  function renderSelect(data){
    var html = '';
    data.forEach(function(key, id){
      html += `<option value = "${key}"> ${key}</option>`;
    });
    return html;
  }

  $('#buscar').on('click', function(){
    if($("#checkPersonalizada")[0].checked){
      var values = $('#rangoPrecio').val();
      values = values.split(";");
      var urls = `http://localhost:8081/ciudad/${$("#ciudad").val()}/tipo/${$("#tipo").val()}/desde/${values[0]}/hasta/${values[1]}`;
    } else {
      var urls = "http://localhost:8081/search";
    }

    $.ajax({
      url : urls,
      type : 'GET',
      dataType : 'json'
    }).done(function(data){
      if(!data.error){
        $('.lista').html(renderAll(data.datos));
      }
    });

  })

  function renderAll(objArr){
    var html = '';
    objArr.forEach(function(key, id){
      html += `<div class="card horizontal">
                  <div class="card-image">
                    <img src="img/home.jpg">
                  </div>
                  <div class="card-stacked">
                    <div class="card-content">
                      <div>
                        <p><b>Direccion: </b>${key.Direccion}</p>
                      </div>
                      <div>
                        <p><b>Ciudad: </b>${key.Ciudad}</p>
                      </div>
                      <div>
                        <p><b>Telefono: </b>${key.Telefono}</p>
                      </div>
                      <div>
                        <p><b>Código postal: </b>${key.Codigo_Postal}</p>
                      </div>
                      <div>
                        <p><b>Precio: </b>${key.Precio}</p>
                      </div>
                      <div>
                        <p><b>Tipo: </b>${key.Tipo}</p>
                      </div>
                    </div>
                    <div class="card-action right-align">
                      <a href="#">Ver más</a>
                    </div>
                  </div>
                </div>`
    });
    return html;
  }

  setSearch();
  Init();

});
