require([
    "esri/Map",
    "esri/views/MapView", 
    "esri/widgets/Home", 
    "esri/widgets/ScaleBar", 
    "esri/layers/FeatureLayer", 
    "esri/widgets/Legend",
    "esri/widgets/AreaMeasurement2D", 
    "esri/widgets/DistanceMeasurement2D", 
    "esri/Graphic", 
    "esri/core/watchUtils",
    "esri/widgets/Search",
    "esri/widgets/BasemapToggle",
    "esri/widgets/LayerList",



], function (Map, MapView, Home, ScaleBar, FeatureLayer, Legend, 
        AreaMeasurement2D, DistanceMeasurement2D, Graphic, watchUtils, Search, BasemapToggle, LayerList,) 
    {
      var activeWidget = null;
       var map = new Map({
       basemap: "osm"
      });


      var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [56,58],
        zoom: 10
      });


      var homeWidget = new Home
      ({
        view: view,
      });
      
       view.ui.add(homeWidget, "top-left");


      var scaleBar = new ScaleBar({
        view: view,
        unit:'metric',
        style:'line'
       }); 
        view.ui.add(scaleBar, {
        position: "bottom-right"
      });



      const searchWidget = new Search({
          view: view,
          container: "search"
      });

      view.ui.add(searchWidget, {
      position: "top-left",
      index: 2
      });




     var BasemapToggle = new BasemapToggle({
            view: view,
            container:"tog",
            nextBasemap: "hybrid"  
      });


      //координаты
            
      var coordsWidget = document.createElement("div");
        coordsWidget.id = "coordsWidget";
        coordsWidget.className = "esri-widget esri-component";
        coordsWidget.style.padding = "7px 15px 5px";

        view.ui.add(coordsWidget);

      function showCoordinates(pt) {
      var coords = "Lat°/Lon° " + pt.latitude.toFixed(3) + " " + pt.longitude.toFixed(3);
        coordsWidget.innerHTML = coords;
      };

        view.watch("stationary", function(Sationary) {
        showCoordinates(view.center);
      });

        view.on("pointer-move", function(evt) {
        showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
      });

      //всплывающие окна
      var popuparea = {
     title: "Районы города",
     content: [{
      type: "fields",
      fieldInfos: [{
        fieldName: "Name",
        label: "Название",
        visible: true
        }, {
        fieldName: "Экотр",
        label: "Количество Экотроп на район",
        visible: true
        }, {
        fieldName: "трасс",
        label: "Количество лыжнгых трасс",
        visible: true
        },{
        fieldName: "отдых",
        label: "Количество мест отдыха",
        visible: true 
        },{
        fieldName: "реки",
        label: "Малые реки протекающие на территоии района",
        visible: true 
        }]
       }]
    };

    var popupecoroad = {
     title: "Экологические тропы",
     content: [{
        type: "fields",
        fieldInfos: [{
          fieldName: "Name",
          label: "Название тропы",
          visible: true
        }, {
          fieldName: "Длинн",
          label: "Длина маршрута, км",
          visible: true
        }, {
          fieldName: "Район",
          label: "Месторасположение",
          visible: true
        },{
          fieldName: "Сезон",
          label: "Сезонность",
          visible: true
        },{
          fieldName: "Тип",
          label: "Тип маршрута",
          visible: true
        },{
          fieldName: "Возр",
          label: "Возростная направленность",
          visible: true
        },{
          fieldName: "инфо",
          label: "Краткая информация",
          visible: true
        },{
          fieldName: "Ост",
          label: "Количество остановок на маршруте",
          visible: true
        },{
          fieldName: "Места",
          label: "Наличие мест отдыха",
          visible: true
        }]
      }]
    };
    var popupinfo = {
     title: "Информационные стенды",
     content: [{
        type: "fields",
        fieldInfos: [{
          fieldName: "Назва",
          label: "Название стенда",
          visible: true
        },{
          fieldName: "Инфо",
          label: "Краткая информация",
          visible: true
        },{
          fieldName: "троп",
          label: "Название тропы",
          visible: true
        },]
      }]
    };
    var popupdog = {
     title: "Места выгула собак",
     content: [{
        type: "fields",
        fieldInfos: [{
          fieldName: "Адрес",
          label: "Адрес",
          visible: true
        }]
      }]
    };
    var popupduck = {
        title: "Места обитания уток",
        content: [{
            type: "fields",
        fieldInfos: [{
          fieldName: "Распо",
          label: "Расположение",
          visible: true
        }]
      }]
    };
    var popupkids= {
        title: "Детские площадки",
        content: [{
            type: "fields",
        fieldInfos: [{
          fieldName: "Назва",
          label: "Название",
          visible: true
        }]
      }]
    };
    var popuppicnic= {
        title: "Пикниковые места отдыха",
        content: [{
            type: "fields",
        fieldInfos: [{
          fieldName: "Назва",
          label: "Название",
          visible: true
        }]
      }]
    };
    var popupsports= {
        title: "Спортивные площадки",
        content: [{
            type: "fields",
        fieldInfos: [{
          fieldName: "Тип_п",
          label: "Тип спортивной площадки",
          visible: true
        }]
      }]
    };
    var popupski={
     title: "Лыжные трассы",
     content: [{
        type: "fields",
        fieldInfos: [{
          fieldName: "имя",
          label: "Название трассы",
          visible: true
        },{
          fieldName: "Длинн",
          label: "Длина трассы",
          visible: true
        },{
          fieldName: "Переп",
          label: "Разница высот",
          visible: true
        },{
          fieldName: "макс",
          label: "Суммарный подъем",
          visible: true
        },]
      }]
    };
    var popupriver ={
     title: "Малые реки",
     content: [{
        type: "fields",
        fieldInfos: [{
          fieldName: "NAME",
          label: "Название",
          visible: true
        },{
          fieldName: "Длин",
          label: "Протяженность реки",
          visible: true
        },]
      }]
    };
    var popupvalley ={
     title: "Долины малых рек",
     content: [{
        type: "fields",
        fieldInfos: [{
          fieldName: "Area",
          label: "Площадь, км.кв",
          visible: true
        },{
          fieldName: "Назва",
          label: "Название",
          visible: true
        },{
          fieldName: "описа",
          label: "Описание",
          visible: true
        },{
          fieldName: "прито",
          label: "Основные притоки",
          visible: true
        },]
      }]
    };
    //продключенные слои
    var layer1 = new FeatureLayer({
     url: "https://services5.arcgis.com/6Ka1GzVVr3OS3dEg/arcgis/rest/services/%D0%AD%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BF%D1%8B/FeatureServer/9?token=JyqnFyqfRnAgNtRGchYQYXeLGcQBO-sVfGIW5fIulZMod0z_ifblolyn2xkY13lsbHEz0JJRBrC1pCJnsgIUOpwyDgJwlYjNM0NAIx77mt0G6O89eT0pYtilXkUK54jNALBPgNPVqkVIZnPHfmo4OOBisut9xNJXnr1n8p0ynAlhQ5iRvqeOtJzGngN8PPxWf8964OTq9LvtSp5aY0Mqkjy95L0AAWfOmXcYdoK-pT2-tMwzthD3RjRiCRm9Q5wE",
     outFields: ["*"],
     title: "Районы города",
     popupTemplate: popuparea
    });
    
    var layer2 = new FeatureLayer({
     url: "https://services5.arcgis.com/6Ka1GzVVr3OS3dEg/arcgis/rest/services/%D0%AD%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BF%D1%8B/FeatureServer/6?token=JyqnFyqfRnAgNtRGchYQYXeLGcQBO-sVfGIW5fIulZMod0z_ifblolyn2xkY13lsbHEz0JJRBrC1pCJnsgIUOpwyDgJwlYjNM0NAIx77mt0G6O89eT0pYtilXkUK54jNALBPgNPVqkVIZnPHfmo4OOBisut9xNJXnr1n8p0ynAlhQ5iRvqeOtJzGngN8PPxWf8964OTq9LvtSp5aY0Mqkjy95L0AAWfOmXcYdoK-pT2-tMwzthD3RjRiCRm9Q5wE",
     outFields: ["*"],
     title: "Экологические тропы",
     popupTemplate: popupecoroad
    });

    var layer3 = new FeatureLayer({
     url: "https://services5.arcgis.com/6Ka1GzVVr3OS3dEg/arcgis/rest/services/%D0%AD%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BF%D1%8B/FeatureServer/2?token=JyqnFyqfRnAgNtRGchYQYXeLGcQBO-sVfGIW5fIulZMod0z_ifblolyn2xkY13lsbHEz0JJRBrC1pCJnsgIUOpwyDgJwlYjNM0NAIx77mt0G6O89eT0pYtilXkUK54jNALBPgNPVqkVIZnPHfmo4OOBisut9xNJXnr1n8p0ynAlhQ5iRvqeOtJzGngN8PPxWf8964OTq9LvtSp5aY0Mqkjy95L0AAWfOmXcYdoK-pT2-tMwzthD3RjRiCRm9Q5wE",
     outFields: ["*"],
     title: "Информационные стенды",
     popupTemplate: popupinfo
    });
    
    var layer4 = new FeatureLayer({
     url: "https://services5.arcgis.com/6Ka1GzVVr3OS3dEg/arcgis/rest/services/%D0%AD%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BF%D1%8B/FeatureServer/0?token=JyqnFyqfRnAgNtRGchYQYXeLGcQBO-sVfGIW5fIulZMod0z_ifblolyn2xkY13lsbHEz0JJRBrC1pCJnsgIUOpwyDgJwlYjNM0NAIx77mt0G6O89eT0pYtilXkUK54jNALBPgNPVqkVIZnPHfmo4OOBisut9xNJXnr1n8p0ynAlhQ5iRvqeOtJzGngN8PPxWf8964OTq9LvtSp5aY0Mqkjy95L0AAWfOmXcYdoK-pT2-tMwzthD3RjRiCRm9Q5wE",
     outFields: ["*"],
     title: "Места выгула собак",
     popupTemplate: popupdog

    });var layer5 = new FeatureLayer({
     url: "https://services5.arcgis.com/6Ka1GzVVr3OS3dEg/arcgis/rest/services/%D0%AD%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BF%D1%8B/FeatureServer/1?token=JyqnFyqfRnAgNtRGchYQYXeLGcQBO-sVfGIW5fIulZMod0z_ifblolyn2xkY13lsbHEz0JJRBrC1pCJnsgIUOpwyDgJwlYjNM0NAIx77mt0G6O89eT0pYtilXkUK54jNALBPgNPVqkVIZnPHfmo4OOBisut9xNJXnr1n8p0ynAlhQ5iRvqeOtJzGngN8PPxWf8964OTq9LvtSp5aY0Mqkjy95L0AAWfOmXcYdoK-pT2-tMwzthD3RjRiCRm9Q5wE",
     outFields: ["*"],
     title: "Места обитания уток",
     popupTemplate: popupduck

    });var layer6 = new FeatureLayer({
     url: "https://services5.arcgis.com/6Ka1GzVVr3OS3dEg/arcgis/rest/services/%D0%AD%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BF%D1%8B/FeatureServer/3?token=JyqnFyqfRnAgNtRGchYQYXeLGcQBO-sVfGIW5fIulZMod0z_ifblolyn2xkY13lsbHEz0JJRBrC1pCJnsgIUOpwyDgJwlYjNM0NAIx77mt0G6O89eT0pYtilXkUK54jNALBPgNPVqkVIZnPHfmo4OOBisut9xNJXnr1n8p0ynAlhQ5iRvqeOtJzGngN8PPxWf8964OTq9LvtSp5aY0Mqkjy95L0AAWfOmXcYdoK-pT2-tMwzthD3RjRiCRm9Q5wE",
     outFields: ["*"],
     title: "Детские площадки",
     popupTemplate: popupkids

    });var layer7 = new FeatureLayer({
        url: "https://services5.arcgis.com/6Ka1GzVVr3OS3dEg/arcgis/rest/services/%D0%AD%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BF%D1%8B/FeatureServer/4?token=ROiXCsKQfn755brxfEQuBgnfcPmc9ginN_mL3HvCyZdazy46d9wkvPemV2q3S-2yXBmCfhF8AfSDAH3v_HGr9zkjD-V-O-UbRIrdV_LEcEIBvF0aZULtUioVYhVj2dprqanrEF9AuEsKXagL-pAvMjR9KDROxHNsWWQzOtT93NyGH8XYy1W9Z9bLcLqU-QxDJ7tAei8atINr3w_XPmvZPnsEoEkMf2OGNRXHlOjLhsDByvjdktFmsv-N77dY--ZW",
     outFields: ["*"],
     title: "Пикниковые места отдыха",
     popupTemplate: popuppicnic

    });var layer8 = new FeatureLayer({
     url: "https://services5.arcgis.com/6Ka1GzVVr3OS3dEg/arcgis/rest/services/%D0%AD%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BF%D1%8B/FeatureServer/5?token=JyqnFyqfRnAgNtRGchYQYXeLGcQBO-sVfGIW5fIulZMod0z_ifblolyn2xkY13lsbHEz0JJRBrC1pCJnsgIUOpwyDgJwlYjNM0NAIx77mt0G6O89eT0pYtilXkUK54jNALBPgNPVqkVIZnPHfmo4OOBisut9xNJXnr1n8p0ynAlhQ5iRvqeOtJzGngN8PPxWf8964OTq9LvtSp5aY0Mqkjy95L0AAWfOmXcYdoK-pT2-tMwzthD3RjRiCRm9Q5wE",
     outFields: ["*"],
     title: "Спортивные площадки",
     popupTemplate: popupsports

    });var layer9 = new FeatureLayer({
     url: "https://services5.arcgis.com/6Ka1GzVVr3OS3dEg/arcgis/rest/services/%D0%AD%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BF%D1%8B/FeatureServer/7?token=JyqnFyqfRnAgNtRGchYQYXeLGcQBO-sVfGIW5fIulZMod0z_ifblolyn2xkY13lsbHEz0JJRBrC1pCJnsgIUOpwyDgJwlYjNM0NAIx77mt0G6O89eT0pYtilXkUK54jNALBPgNPVqkVIZnPHfmo4OOBisut9xNJXnr1n8p0ynAlhQ5iRvqeOtJzGngN8PPxWf8964OTq9LvtSp5aY0Mqkjy95L0AAWfOmXcYdoK-pT2-tMwzthD3RjRiCRm9Q5wE",
     outFields: ["*"],
     title: "Лыжные трассы",
     popupTemplate: popupski

    });var layer10 = new FeatureLayer({
     url: "https://services5.arcgis.com/6Ka1GzVVr3OS3dEg/arcgis/rest/services/%D0%AD%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BF%D1%8B/FeatureServer/8?token=JyqnFyqfRnAgNtRGchYQYXeLGcQBO-sVfGIW5fIulZMod0z_ifblolyn2xkY13lsbHEz0JJRBrC1pCJnsgIUOpwyDgJwlYjNM0NAIx77mt0G6O89eT0pYtilXkUK54jNALBPgNPVqkVIZnPHfmo4OOBisut9xNJXnr1n8p0ynAlhQ5iRvqeOtJzGngN8PPxWf8964OTq9LvtSp5aY0Mqkjy95L0AAWfOmXcYdoK-pT2-tMwzthD3RjRiCRm9Q5wE",
     outFields: ["*"],
     title: "Малые реки",
     popupTemplate: popupriver
    });
    var layer11 = new FeatureLayer({
     url: "https://services5.arcgis.com/6Ka1GzVVr3OS3dEg/arcgis/rest/services/%D0%AD%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D0%BF%D1%8B/FeatureServer/10?token=JyqnFyqfRnAgNtRGchYQYXeLGcQBO-sVfGIW5fIulZMod0z_ifblolyn2xkY13lsbHEz0JJRBrC1pCJnsgIUOpwyDgJwlYjNM0NAIx77mt0G6O89eT0pYtilXkUK54jNALBPgNPVqkVIZnPHfmo4OOBisut9xNJXnr1n8p0ynAlhQ5iRvqeOtJzGngN8PPxWf8964OTq9LvtSp5aY0Mqkjy95L0AAWfOmXcYdoK-pT2-tMwzthD3RjRiCRm9Q5wE",
     outFields: ["*"],
     title: "Долины малых рек",
     popupTemplate: popupvalley
    });


    map.add(layer1);
    map.add(layer11);
    map.add(layer9);
    map.add(layer2);
    map.add(layer10);
    map.add(layer3);
    map.add(layer4);
    map.add(layer5);
    map.add(layer6);
    map.add(layer7);
    map.add(layer8);
    
    

    //легенда
    var legend = new Legend({
        container:"legend",
     view: view,
     layerInfos: [{
       layer: layer1,
       title: "Районы города"
      },{
       layer: layer11,
       title: "Долины малых рек"
      }, {
       layer: layer10,
       title: "Малые реки"
      },{
       layer: layer9,
       title: "Лыжные трассы"
      }, {
       layer: layer2,
       title: "Экологические тропы"
      }, {
       layer: layer3,
       title: "Информационные стенды"
      }, {
       layer: layer4,
       title: "Места выгула собак"
      }, {
       layer: layer5,
       title: "Места обитания уток"
      }, {
       layer: layer6,
       title: "Детские площадки"
      }, {
       layer: layer7,
       title: "Пикниковые места отдыха"
      }, {
       layer: layer8,
       title: "Спортивные площадки"
      }, 
     ]
    });








//измерение 
  document.getElementById("distanceButton").addEventListener("click",
  function () {
      setActiveWidget(null);
      if (!this.classList.contains('active')) {
          setActiveWidget('distance');
      } else {
          setActiveButton(null);
      }
  });

 

  document.getElementById("areaButton").addEventListener("click",
  function () {
      setActiveWidget(null);
      if (!this.classList.contains('active')) {
          setActiveWidget('area');
      } else {
          setActiveButton(null);
      }
  });

  function setActiveWidget(type) {
      switch (type) {
      case "distance":
          activeWidget = new DistanceMeasurement2D({
              view: view,
          });

          activeWidget.viewModel.newMeasurement();

              view.ui.add(activeWidget, "top-left");
          setActiveButton(document.getElementById('distanceButton'));
      break;
      case "area":
          activeWidget = new AreaMeasurement2D({
              view: view
          });

          activeWidget.viewModel.newMeasurement();

              view.ui.add(activeWidget, "top-left");
          setActiveButton(document.getElementById('areaButton'));
      break;
      case null:
          if (activeWidget) {
              view.ui.remove(activeWidget);
              activeWidget.destroy();
              activeWidget = null;
          }
      break;
      }	
  }

  function setActiveButton(selectedButton) {
      view.focus();
      var elements = document.getElementsByClassName("active");
      for (var i = 0; i < elements.length; i++) {
          elements[i].classList.remove("active");
      }
      if (selectedButton) {
          selectedButton.classList.add("active");
      }
  }




    //обзорная карта
    var overviewMap = new Map({
      basemap: "topo"
    });


    var mapView = new MapView({
     container: "overviewDiv",
     map: overviewMap,
     constraints: {
      rotationEnabled: false
      }
    });

    mapView.ui.components = [];

    mapView.when(function() {
      view.when(function() {
        setup();
      });
    });

    function setup() {
      const extent3Dgraphic = new Graphic({
        geometry: null,
        symbol: {
          type: "simple-fill",
          color: [0, 0, 0, 0],
          outline: {
              width: 0.5,
              color: "green"
          }
        }
      });
      mapView.graphics.add(extent3Dgraphic);

      watchUtils.init(view, "extent", function (extent) {
        mapView.goTo({
            center: view.center,
            scale:
                view.scale *
                3 *
                Math.max(
                    view.width / mapView.width,
                    view.height / mapView.height
                )
        });
        extent3Dgraphic.geometry = extent;
    });
    };


        var layerList = new LayerList({
            container: "List1",
            view: view,
        });

        view.ui.add(layerList, {
            position: "top-right"
        });
        var show = () => {
            document.querySelector('#List1').classList.toggle("show1")
        };
        document.getElementById('LayerList1').addEventListener('click', show);
        var show = () => {
            document.querySelector('#legend').classList.toggle("show2")
        };
        document.getElementById('leg').addEventListener('click', show);

        var dialog = document.querySelector('dialog');
        document.querySelector('#show').onclick = function () {
            dialog.showModal();
        };
        document.querySelector('#close').onclick = function () {
            dialog.close();
        };





});
