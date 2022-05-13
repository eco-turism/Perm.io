window.onload = init;
function init(){
    const house = document.createElement('span');
    house.innerHTML = '<img src="./data/icon/home.png" width="20" height="15">';

    const zoomSlider = new ol.control.ZoomSlider();
    const zoomToExtent = new ol.control.ZoomToExtent({
      extent: ([6199349,7932461,6324018,8006452]),
      tipLabel: 'Домой', 
      label: house
    });
    const scaleLine = new ol.control.ScaleLine();
    const overViewMap = new ol.control.OverviewMap({
      collapsed: false,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()      
        })
      ],
      tipLabel: 'Обзорная карта',
      view: new ol.View({
        zoom: 7,
        minZoom: 7,
        rotation: 0,
  })
    });
    const mousePosition_4326 = new ol.control.MousePosition({
        coordinateFormat: function(coordinate) {
          return ol.coordinate.toStringHDMS(coordinate,1);
        },
        projection: 'EPSG:4326',
        className: 'mouseposition4326',
      });
      const map = new ol.Map({
        view: new ol.View({
          center: ol.proj.fromLonLat([56.30, 58.01]),
          zoom: false,
          maxZoom: 18,
          minZoom: 11,
        }),
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        target: 'js-map',
        keyboardEventTarget: document,
        controls: ol.control.defaults().extend([
            new ol.control. Zoom({
           className: "ol-zoom new",
           zoomInTipLabel: 'Приблизить',
           zoomOutTipLabel: 'Отдалить'
            }),
          scaleLine,
          overViewMap,
          zoomSlider,
          zoomToExtent,
          mousePosition_4326
        ])
      })
      const osmStd = new ol.layer.Tile({
        source: new ol.source.OSM(),
        visible: true,
        title: 'osmStd'        
      })
    
      const osmHmt = new ol.layer.Tile({
        source: new ol.source.OSM({
          url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        visible: false,
        title: 'osmHum'
      })
    
      var yaExtent = [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244];
      proj4.defs('EPSG:3395', '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
      ol.proj.proj4.register(proj4);
      ol.proj.get('EPSG:3395').setExtent(yaExtent);
    
      const YandexStd = new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: 'https://core-renderer-tiles.maps.yandex.net/tiles?l=map&lang=ru_RU&v=2.26.0&x={x}&y={y}&z={z}',
          type: 'base',
          attributions: '© Yandex',
          projection: 'EPSG:3395',
          tileGrid: ol.tilegrid.createXYZ({
            extent: yaExtent
          }),
        }),
        visible: false,
        title: 'YandexStd'
      })
    
      const YandexSat = new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: 'http://sat0{1-4}.maps.yandex.net/tiles?l=sat&x={x}&y={y}&z={z}',
          attributions: '© Yandex',
          projection: 'EPSG:3395',
          tileGrid: ol.tilegrid.createXYZ({
            extent: yaExtent
          }),
        }),
        visible: false,
        title: 'YandexSAT'
      })
    
      const geoswms = new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url:"http://ssc.psu.ru:8080/geoserver/st2021/wms",
          params:{
            LAYERS: 'st2021:grp2_all_group',
            FORMAT: 'image/png',
            TRANSPARENT: false
          },
          attributions: '<a href=http://ssc.psu.ru:8080/geoserver/>© iKraken<a/>'
        }),
        visible: false,
        title: 'geoserver'
      })
    
      const BingSat = new ol.layer.Tile({
        source: new ol.source.BingMaps({
          key: "AoYlbWDVZ83wp0SnRSx6j_y-WJ_5JSAUY0JXs_oRD8WpzSNLaJbFkwzbQoXOc4A5",
          imagerySet: 'Aerial'  
        }),
        visible: false,
        title: 'BingSAT'
      })
      
    
      const baseMapsLayerGroup = new ol.layer.Group({
        layers: [
          osmStd,osmHmt,YandexStd,
          YandexSat,geoswms,BingSat
        ]
      })
      map.addLayer(baseMapsLayerGroup);
  
      const baseLayerElements = document.querySelectorAll('.sidebar > input[type=radio]')
      baseLayerElements[0].checked = true;
      for(let baseLayerElement of baseLayerElements){
        baseLayerElement.addEventListener('change', function(){
          let baseLayerElementValue = this.value;
          baseMapsLayerGroup.getLayers().forEach(function(element, index, array){
            let baseLayerName = element.get('title');
            element.setVisible(baseLayerName === baseLayerElementValue)
          })
        })
      }

      


        // Кнопка списка слоев
  const sidebar_element = document.getElementById('sidebar');
  const l_but = document.getElementById('layer-button');
  function layer_button() {
    if (sidebar_element.style.display != 'block') {
      l_but.style.backgroundColor = 'rgba(7, 83, 23, 0.616)';
      sidebar_element.style.display = 'block';
      info_element.style.display = 'none';
      i_but.style.backgroundColor = 'rgba(7, 83, 23, 0.616)';
      tematic_element.style.display = 'none';
      t_but.style.backgroundColor = 'rgba(7, 83, 23, 0.616)'
    } else {
      l_but.style.backgroundColor = 'rgba(7, 83, 23, 0.616)';
      sidebar_element.style.display = 'none'
    }
  }
  document.getElementById('layer-button').addEventListener("click", layer_button);
  document.getElementById('layer-button').addEventListener("mouseover", function(){
    this.style.backgroundColor = 'rgba(7, 10, 23, 0.616)'
  });
  document.getElementById('layer-button').addEventListener("mouseout", function(){
    if (sidebar_element.style.display != 'block') {
      this.style.backgroundColor = 'rgba(7, 83, 23, 0.616)'
    }
  });
  // Измерительные инструменты
  const measuretype = document.querySelectorAll('.measuretype > input[type=radio]')
  measuretype[2].checked = true;
  var mes_Source = new ol.source.Vector();
  var mes_Layer = new ol.layer.Vector({
    source: mes_Source,
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(7, 150, 40, 0.616)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgba(7, 150, 40, 0.616)',
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: 'rgba(7, 150, 40, 0.616)'
        })
      })
    })
  });
  map.addLayer(mes_Layer);

  var draw;
  var sketch;
  var measureTooltipElement;
  var measureTooltip;

  // Формат линии
  var formatLength = function (line) {
    let length = line.getLength();
    let output;
    length2 = length/2;
    if (length2 > 1000) {
      output = (Math.round(length2 / 1000 * 100) / 100 ) + ' ' + 'км';
    } else {
      output = (Math.round(length2)) + ' ' + 'м';
    }
    return output;
  };

  // Формат полигона
  var formatArea = function (polygon) {
    let area = polygon.getArea();
    let output;
    area4 = area/3.5;
    if (area4 > 10000) {
      output = (Math.round(area4 / 1000000 * 100) / 100) + ' ' + 'км<sup>2</sup>';
    } else {
      output = (Math.round(area4 * 100) / 100) + ' ' + 'м<sup>2</sup>';
    }
    return output;
  };

  // Функция измерения
  function addInteraction() {
    let type = (measuretype[1].checked == true ? 'Polygon' : 'LineString');
    if (measuretype[1].checked == true) { type = 'Polygon'; }
    else if (measuretype[0].checked == true) { type = 'LineString'; }
    console.log(type)
    draw = new ol.interaction.Draw({
      source: mes_Source,
      type: type,
      style: new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'rgba(7, 150, 40, 0.616)',
        }),
        stroke: new ol.style.Stroke({
          color: 'rgba(7, 150, 40, 0.616)',
          lineDash: [10, 10],
          width: 2
        }),
        image: new ol.style.Circle({
          radius: 5,
          stroke: new ol.style.Stroke({
            color: 'rgba(7, 150, 40, 0.616)',
          }),
          fill: new ol.style.Fill({
            color: 'rgba(7, 150, 40, 0.616)',
          })
        })
      })
    });
    if (measuretype[2].checked == true /*|| measuretype.value == 'clear'*/) {
      map.removeInteraction(draw);
      if (mes_Layer) { mes_Layer.getSource().clear(); }
      if (measureTooltipElement) {
        let elem = document.getElementsByClassName("tooltip tooltip-static");
        for (let i = elem.length - 1; i >= 0; i--) {
          elem[i].remove();
        }
      }
    } else if (measuretype[1].checked == true || measuretype[0].checked == true) {
      map.addInteraction(draw);
      createMeasureTooltip();
      let listener;
      draw.on('drawstart',
        function (evt) {
          sketch = evt.feature;
          let tooltipCoord = evt.coordinate;
          listener = sketch.getGeometry().on('change', function (evt) {
            let geom = evt.target;
            let output;
            if (geom instanceof ol.geom.Polygon) {
              output = formatArea(geom);
              tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof ol.geom.LineString) {
              output = formatLength(geom);
              tooltipCoord = geom.getLastCoordinate();
            }
            measureTooltipElement.innerHTML = output;
            measureTooltip.setPosition(tooltipCoord);
          });
        }, this
      );
      draw.on('drawend',
        function () {
          measureTooltipElement.className = 'tooltip tooltip-static';
          measureTooltip.setOffset([0, -7]);
          sketch = null;
          measureTooltipElement = null;
          createMeasureTooltip();
          ol.Observable.unByKey(listener);
        }, this
      );
    }
  }

  // Подсказка измерений
  function createMeasureTooltip() {
    if (measureTooltipElement) {
      measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip tooltip-measure';
    measureTooltip = new ol.Overlay({
      element: measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center'
    });
    map.addOverlay(measureTooltip);
  }

  // Изменение типа геометрии
  for(let measuretyp of measuretype){
    measuretyp.addEventListener('change', function(){
      map.removeInteraction(draw);
      addInteraction();
    })
  }

  // Кнопка измерительных инструментов
  const mes_element = document.getElementById('measure');
  const mes_but = document.getElementById('mes-but');
  function mes_button() {
    if (mes_element.style.display != 'block') {
      mes_but.style.backgroundColor = 'rgba(7, 83, 23, 0.616)';
      mes_element.style.display = 'block';
    } else {
      mes_but.style.backgroundColor = 'rgba(7, 83, 23, 0.616)';
      mes_element.style.display = 'none'
    }
  }
  document.getElementById('mes-but').addEventListener("click", mes_button);
  document.getElementById('mes-but').addEventListener("mouseover", function(){
    this.style.backgroundColor = 'rgba(7, 10, 23, 0.616)'
  });
  document.getElementById('mes-but').addEventListener("mouseout", function(){
    if (mes_element.style.display != 'block') {
      this.style.backgroundColor = 'rgba(7, 83, 23, 0.616)'
    }
  });
    // Нахождение местоположения пользователя
  // Создание слоя
  let source = new ol.source.Vector();
  let geolocation_p = new ol.layer.Vector({
    source: source,
  });

  // Создание кнопки
  const locate = document.createElement('div');
  locate.className = 'ol-control ol-unselectable locate';
  locate.innerHTML = '<button title="Мое местоположение"> <img src="./data/icon/arrow.png" width="20" height="20" > </button>';
  locate.addEventListener('click', function() {
    switch(source.isEmpty()) {
      case false:
        source.clear();
        map.removeLayer(geolocation_p);
        break;
      case true:
        map.addLayer(geolocation_p);
        let extentt;
        navigator.geolocation.getCurrentPosition(
          function (pos) {
            let coords = [pos.coords.longitude, pos.coords.latitude];
            let accuracy = ol.geom.Polygon.circular(coords, pos.coords.accuracy);
            source.clear();
            source.addFeatures([
              new ol.Feature(accuracy.transform('EPSG:4326', map.getView().getProjection())),
              new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat(coords))),
            ]);
            extentt = source.getExtent();
            map.getView().fit(extentt, {
              maxZoom: 17,
              duration: 1000
            });
          },
          function (error) {
            alert(`ERROR: ${error.message}`);
          },
          {
            enableHighAccuracy: true,
          }
        );
        break;
    }
  });
  map.addControl(new ol.control.Control({
    element: locate
  }));

  // Кнопка информации
  setTimeout(function(){
    document.getElementById('info-text').style.display = 'none';
  }, 5000);
  const info_element = document.getElementById('info-text');
  const i_but = document.getElementById('info-but');
  function info_but() {
    if (info_element.style.display != 'block') {
      i_but.style.backgroundColor = 'rgba(7, 83, 23, 0.616)';
      info_element.style.display = 'block';
      sidebar_element.style.display = 'none';
      l_but.style.backgroundColor = 'rgba(7, 83, 23, 0.616)';
      tematic_element.style.display = 'none';
      t_but.style.backgroundColor = 'rgba(7, 83, 23, 0.616)'
    } else {
      i_but.style.backgroundColor = 'rgba(7, 83, 23, 0.616)';
      info_element.style.display = 'none'
    }
  }
  document.getElementById('info-but').addEventListener("click", info_but);
  document.getElementById('info-but').addEventListener("mouseover", function(){
    this.style.backgroundColor = 'rgba(7, 10, 23, 0.616)'
  });
  document.getElementById('info-but').addEventListener("mouseout", function(){
    if (info_element.style.display != 'block') {
      this.style.backgroundColor = 'rgba(7, 83, 23, 0.616)'
    }
  });
  const d_button = document.getElementById('d-button');
  document.getElementById('d-button').addEventListener("click", d_button);
  document.getElementById('d-button').addEventListener("mouseover", function(){
    this.style.backgroundColor = 'rgba(7, 10, 23, 0.616)'
  });
  document.getElementById('d-button').addEventListener("mouseout", function(){
    if (d_button.style.display != 'block') {
      this.style.backgroundColor = 'rgba(7, 83, 23, 0.616)'
    }
  });
  document.getElementById('d-button').onclick = function(event) {
    window.open('https://gispsu.maps.arcgis.com/apps/webappviewer3d/index.html?id=891d55b240034610ba383c2759dce6cc', '_blank');
};


  
  // Кнопока темаических слоев

  const tematic_element = document.getElementById('tematic-layers');
  const t_but = document.getElementById('tematic-but');
  function tematic_but() {
    if (tematic_element.style.display != 'block') {
      t_but.style.backgroundColor = 'rgba(7, 83, 23, 0.616)';
      tematic_element.style.display = 'block';
      sidebar_element.style.display = 'none';
      l_but.style.backgroundColor = 'rgba(7, 83, 23, 0.616)';
      info_element.style.display = 'none';
      i_but.style.backgroundColor = 'rgba(7, 83, 23, 0.616)'
    } else {
      t_but.style.backgroundColor = 'rgba(7, 83, 23, 0.616)';
      tematic_element.style.display = 'none'
    }
  }
  document.getElementById('tematic-but').addEventListener("click", tematic_but);
  document.getElementById('tematic-but').addEventListener("mouseover", function(){
    this.style.backgroundColor = 'rgba(7, 10, 23, 0.616)'
  });
  document.getElementById('tematic-but').addEventListener("mouseout", function(){
    if (tematic_element.style.display != 'block') {
      this.style.backgroundColor = 'rgba(7, 83, 23, 0.616)'
    }
  });

  //Места выгула собак
const dog_placeJSON = new ol.layer.VectorImage ({
  source: new ol.source.Vector ({
    url: './data/vectors/dog_place.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      src: './data/icon/dog.png',
      anchor: [0.5,0.9],
      scale: 0.040
    })
}),

  visible: false,
  title: 'dog-place',
  zindex:10
})
//Спорт площадки
const sport_placeJSON = new ol.layer.VectorImage ({
  source: new ol.source.Vector ({
    url: './data/vectors/sport_place.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      src: './data/icon/sport_p.png',
      anchor: [0.5,0.9],
      scale: 0.030
    })
}),
  visible: false,
  title: 'sport-place',
  zindex:10
})

//Детские площадки
const kids_placeJSON = new ol.layer.VectorImage ({
  source: new ol.source.Vector ({
    url: './data/vectors/kids_place.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      src: './data/icon/Kids.png',
      anchor: [0.5,0.9],
      scale: 0.045
    })
}),
  visible: false,
  title: 'kids-place',
  zindex:10
})

//Информационные стенды
const ifno_stendJSON = new ol.layer.VectorImage ({
  minZoom:11,
  source: new ol.source.Vector ({
    url: './data/vectors/ifno_stend.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      src: './data/icon/info.png',
      anchor: [0.5,0.9],
      scale: 0.04
    })
}),
  visible: false,
  title: 'ifno-stend',
  zindex:10
})

//пикниковые места отдыха
const picnic_placeJSON = new ol.layer.VectorImage ({
  source: new ol.source.Vector ({
    url: './data/vectors/picnic_place.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
      image: new ol.style.Icon({
        src: './data/icon/picnic.png',
        anchor: [0.5,0.9],
        scale: 0.17
      })
  }),
  visible: false,
  title: 'picnic-place',
  zindex:10
})

// Места обитания уток
const duck_placeJSON = new ol.layer.VectorImage ({
  source: new ol.source.Vector ({
    url: './data/vectors/duck_place.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      src: './data/icon/duck.png',
      anchor: [0.5,0.9],
      scale: 0.04
    })
}),
  visible: false,
  title: 'duck-place',
  zindex:10
})

//Стадионы
const stad = new ol.layer.VectorImage ({
  source: new ol.source.Vector ({
    url: './data/vectors/stadion.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      src: './data/icon/stad.png',
      anchor: [0.5,0.9],
      scale: 0.022
    })
}),
  visible: false,
  title: 'Stadion',
  zindex:10
})

// Экотропы
const eco_roadsJSON = new ol.layer.VectorImage({
  source: new ol.source.Vector({
    url: './data/vectors/eco_roads.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgb(22, 204, 62)',
      width: 3,
    })
  }),
  visible: true,
  title: 'eco-roads'
})

// Лыжные трассы
const ski_roadsJSON = new ol.layer.VectorImage({
  source: new ol.source.Vector({
    url: './data/vectors/ski_roads.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgb(158, 2, 248)',
      width: 2,
    })
  }),
  visible: false,
  title: 'ski-roads'
})


// Малые реки
const smal_riverJSON = new ol.layer.VectorImage({
  source: new ol.source.Vector({
    url: './data/vectors/smal_river.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgb(0, 81, 255)',
      width: 1,
    })
  }),
  visible: false,
  title: 'smal-river',

}) 

//  Долины рек
const hils_riversJSON = new ol.layer.VectorImage({
  source: new ol.source.Vector({
    url: './data/vectors/hils_rivers.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: [123, 255, 0, 0.3]}),
    stroke: new ol.style.Stroke({
      color: 'rgba(0,0,0,0.5)',
      width: 1,

    })
  }),
  visible: false,
  title: 'hils-river'
}) 

// Парки
const parkJSON = new ol.layer.VectorImage({
  source: new ol.source.Vector({
    url: './data/vectors/park.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: [252, 241, 110, 0.4]}),
    stroke: new ol.style.Stroke({
      color: 'rgba(0,0,0,0.5)',
      width: 1,

    })
  }),
  visible: false,
  title: 'park'
}) 

// Парки зона
const park_bufJSON = new ol.layer.VectorImage({
  source: new ol.source.Vector({
    url: './data/vectors/park_buf.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: [188, 243, 200, 0.511]}),
    stroke: new ol.style.Stroke({
      color: 'rgba(188, 243, 200)',
      width: 2,

    })
  }),
  visible: false,
  title: 'park-buf'
}) 

// Зеленая линия
const greenJSON = new ol.layer.VectorImage({
  source: new ol.source.Vector({
    url: './data/vectors/green.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgb(234, 10, 22)',
      width: 3,
    })
  }),
  visible: true,
  title: 'green-line',

}) 

// турист места
const point_stJSON = new ol.layer.VectorImage ({
  minZoom:11,
  source: new ol.source.Vector ({
    url: './data/vectors/point_st.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon({
      src: './data/icon/info2.png',
      anchor: [0.5,0.9],
      scale: 0.022
    })
}),
  visible: false,
  title: 'point-st',
  zindex:10
})


// Велодорожки,

const velo_dJSON = new ol.layer.VectorImage({
  source: new ol.source.Vector({
    url: './data/vectors/velo_d.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgb(0, 238, 255)',
      width: 2,
    })
  }),
  visible: false,
  title: 'velo-d',

}) 
const velo_pJSON = new ol.layer.VectorImage({
  source: new ol.source.Vector({
    url: './data/vectors/velo_p.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgb(34, 7, 83)',
      width: 2,
    })
  }),
  visible: false,
  title: 'velo-p',

}) 

//квартал
const kv_lesJSON = new ol.layer.VectorImage({
  source: new ol.source.Vector({
    url: './data/vectors/kv_les.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: [188, 243, 200, 0]}),
    stroke: new ol.style.Stroke({
      color: 'rgba(255, 145, 0)',
      width: 1.5,

    })
  }),
  visible: false,
  title: 'kv-les'
}) 


// Породы карта

const porodaJSON = new ol.layer.Vector({
  maxZoom:16,
  source: new ol.source.Vector({
    url: './data/vectors/poroda.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: function (feature, resolution) {
    return getStyle1(feature, resolution);
  },
  visible: false,
  title: 'porod'
})


  
getStyle1 = function (feature, resolution) {
  if (feature.get('Пород') == 'Ель')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [128,0,251, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Липа')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [248, 244, 0, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),

    });
  }
  if (feature.get('Пород') == 'Береза')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [3, 219, 219, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),

    });
  }
  if (feature.get('Пород') == 'Ива')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [163, 255, 115, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),

    });
  }

  if (feature.get('Пород') == 'Осина')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [171, 205, 102, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Сосна')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [255, 136, 0, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Береза Липа')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [82, 124, 54, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Липа Береза')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [82, 124, 54, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Береза Ель')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [202, 122, 245, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Ель Береза')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [202, 122, 245, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Береза Ольха')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [255, 100, 79, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Береза Осина')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [79, 255, 146, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Береза Сосна')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [245, 207, 101, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Сосна Береза')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [245, 207, 101, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Ель Липа')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [73, 53, 250, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Липа Ель')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [73, 53, 250, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Ель Пихта')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [0, 60, 255, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Ель Сосна')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [255, 0, 98, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Сосна Ель')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [255, 0, 98, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Осина Липа')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [30, 255, 0, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Сосна Осина')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [255, 0, 0, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
  if (feature.get('Пород') == 'Ель Осина')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [0, 115, 76, 0.425]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 1
      }),
    });
  }
};
// Породы карта

const forest_bufJSON = new ol.layer.Vector({
  maxZoom:16,
  source: new ol.source.Vector({
    url: './data/vectors/forest_buf.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: function (feature, resolution) {
    return getStyle2(feature, resolution);
  },
  visible: false,
  title: 'forest-buf'
})
getStyle2 = function (feature, resolution) {
  if (feature.get('FID_буф') == '1')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [0, 255, 55, 0.316]
      }),
    });
  }
  if (feature.get('FID_буф') == '2')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [187, 255, 0, 0.316]
      }),
    });
  }
  if (feature.get('FID_буф') == '3')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [255, 217, 0, 0.316]
      }),
    });
  }
};

// рекриация
const forest_ecoJSON = new ol.layer.Vector({
  maxZoom:15,
  source: new ol.source.Vector({
    url: './data/vectors/forest_eco.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: function (feature, resolution) {
    return getStyle4(feature, resolution);
  },
  visible: false,
  title: 'forest-eco'
})


  
getStyle4 = function (feature, resolution) {
  if (feature.get('Загря') == 'загрязнен бытовыми отходами')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [187, 55, 55, 0.616]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 0.5
      }),
    });
  }
  if (feature.get('Загря') == 'Захлмление, сухостойные деревья')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [7, 83, 23, 0.616]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 0.5
      }),

    });
  }
  if (feature.get('Загря') == 'нет загрязнкения  бытовыми отходами')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [60, 255, 0, 0.616]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 0.5
      }),

    });
  }
  if (feature.get('Загря') == 'слабо загрязнен бытовыми отходами')  {
    return new ol.style.Style({
      fill: new ol.style.Fill({
        color: [224, 196, 37, 0.616]
      }),
      stroke: new ol.style.Stroke({
        color: 'gray',
        width: 0.5
      }),

    });
  }
};

//

const area_pJSON = new ol.layer.VectorImage({
  maxZoom:12,
  source: new ol.source.Vector({
    url: './data/vectors/area_p.geojson',
    format: new ol.format.GeoJSON()
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: [188, 243, 200, 0]}),
    stroke: new ol.style.Stroke({
      color: 'rgba(225, 0, 255)',
      width: 2,

    })
  }),
  visible: true,
  title: 'area-p'
}) 








const layerGroup = new ol.layer.Group({
  layers: [
    forest_ecoJSON, porodaJSON, forest_bufJSON, kv_lesJSON, area_pJSON, hils_riversJSON,park_bufJSON, parkJSON, ski_roadsJSON, eco_roadsJSON, smal_riverJSON,  greenJSON, velo_dJSON, velo_pJSON, stad,sport_placeJSON, point_stJSON, dog_placeJSON, ifno_stendJSON, kids_placeJSON, picnic_placeJSON, duck_placeJSON, 
  ]
})
  map.addLayer(layerGroup);


// Стартовые слои
const layerElements = document.querySelectorAll('.tematic-layers > input[type=checkbox]' )
  for (var layerElement of layerElements) {
    layerElement.checked = false;
    if(layerElement.value === 'eco-roads'){
      layerElement.checked = true;
    }
    if(layerElement.value === 'area-p'){
      layerElement.checked = true;
    }
    if(layerElement.value === 'green-line'){
      layerElement.checked = true;
    }
  }
  for(let layerElement of layerElements){
    layerElement.addEventListener('change', function(){
      let layerElementValue = this.value;
      let aLayer;

      layerGroup.getLayers().forEach(function(element, index, array){
        if(layerElementValue === element.get('title')){
          aLayer = element;
        }
      })
      this.checked ? aLayer.setVisible(true) : aLayer.setVisible(false)
    })
  } 
/*const dragPanInteraction = new ol.interaction.DragPan;
map.addInteraction(dragPanInteraction);
const dragRotateInteraction = new ol.interaction.DragRotate({
  condition: ol.events.condition.altKeyOnly
})
map.addInteraction(dragRotateInteraction);*/

const leg_porod = layerElements[5]
leg_porod.addEventListener('change', function(){
  if (this.checked) {
    document.getElementById("legend1").setAttribute("style","display: flex");

  } else {
    document.getElementById("legend1").setAttribute("style","display: none");
  }
})
const leg_dost = layerElements[6]
leg_dost.addEventListener('change', function(){
  if (this.checked) {
    document.getElementById("legend2").setAttribute("style","display: flex");

  } else {
    document.getElementById("legend2").setAttribute("style","display: none");
  }
})
const leg_zag = layerElements[7]
leg_zag.addEventListener('change', function(){
  if (this.checked) {
    document.getElementById("legend3").setAttribute("style","display: flex");

  } else {
    document.getElementById("legend3").setAttribute("style","display: none");
  }
})








  // высплывающие окна с атрибутами

  const overlayContainerElement = document.querySelector('.overlay-container');
  const overlayLayer = new ol.Overlay({
    element: overlayContainerElement
  })
  map.addOverlay(overlayLayer);
  const overlayLocalName = document.getElementById('local- Name');
  const overlayLen = document.getElementById('local- Len');
  const overlayarea = document.getElementById('local- area');
  const overlayseason = document.getElementById('local- season');
  const overlaytype = document.getElementById('local- type');
  const overlayage = document.getElementById('local- age');
  const overlaystat = document.getElementById('local- stat');
  const overlayplace = document.getElementById('local- place');
  const overlayinf = document.getElementById('local- inf');

    map.on('click', function(e){
    overlayLayer.setPosition(undefined);
    map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
      let clickedCoordinate = e.coordinate;
      let clickedeco = feature.get('Name');
      let clicedLen = feature.get('Len1')
      let clicedarea = feature.get('Район')
      let clicedseason = feature.get('Сезон')
      let clicedtype = feature.get('Тип')
      let clicedage = feature.get('Возр')
      let clicedstat = feature.get('Ост')
      let clicedplace = feature.get('Места')
      let clicedinf = feature.get('инфо')

        overlayLayer.setPosition(clickedCoordinate);
        overlayLocalName.innerHTML = 'НАЗВАНИЕ: ' + clickedeco;
        overlayLen.innerHTML = 'ДЛИННА ТРОПЫ: ' + clicedLen + 'км' ;
        overlayarea.innerHTML = 'РАЙОН: ' + clicedarea ;
        overlayseason.innerHTML = 'СЕЗОН ПОСЕЩЕНИЯ: ' + clicedseason ;
        overlaytype.innerHTML = 'ТИП МАРШРУТА: ' + clicedtype ;
        overlayage.innerHTML = 'Для ' + clicedage ;
        overlaystat.innerHTML = 'КОЛ-ВО ОСТАНОВОК: ' + clicedstat ;
        overlayplace.innerHTML = 'МЕСТА ОТДЫХА: ' + clicedplace ;
        overlayinf.innerHTML =  'О МАРШРУТЕ: ' + clicedinf ;
    },
    {
      layerFilter: function(layerCandidate){
        return layerCandidate.get('title') === 'eco-roads'
      }
    })
  })



  const overlayContainerElementinf = document.querySelector('.overlay-container1');
  const overlayLayerinf = new ol.Overlay({
    element: overlayContainerElementinf
  })
  map.addOverlay(overlayLayerinf);
  const overlayLocalName1 = document.getElementById('local- Name1');
  const overlayinf1 = document.getElementById('local- inf1');
  const overlayroad = document.getElementById('local- road');


    map.on('click', function(e){
    overlayLayerinf.setPosition(undefined);
    map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
      let clickedCoordinate = e.coordinate;
      let clickedName1 = feature.get('Назва');
      let clicedinf1 = feature.get('Инфо')
      let clicedroad = feature.get('троп')


      overlayLayerinf.setPosition(clickedCoordinate);
        overlayLocalName1.innerHTML = 'НАЗВАНИЕ СТЕНДА: ' + clickedName1 ;
        overlayinf1.innerHTML = 'ИНФОРМАЦИЯ НА СТЕНДЕ: ' + clicedinf1 ;
        overlayroad.innerHTML = 'НАЗВАНИЕ ЭКОТРОПЫ: ' + clicedroad ;

    },
    {
      layerFilter: function(layerCandidate){
        return layerCandidate.get('title') === 'ifno-stend'
      }
    })
  })

  const overlayContainerElementski = document.querySelector('.overlay-container2');
  const overlayLayerski = new ol.Overlay({
    element: overlayContainerElementski
  })
  map.addOverlay(overlayLayerski);
  const overlayLocalName2 = document.getElementById('local- Name2');
  const overlaylen1 = document.getElementById('local- Len1');
  const overlayamgle = document.getElementById('local- amgle');
  const overlaymax = document.getElementById('local- max');


    map.on('click', function(e){
    overlayLayerski.setPosition(undefined);
    map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
      let clickedCoordinate = e.coordinate;
      let clickedName2 = feature.get('имя');
      let clicedlen1 = feature.get('Длинн');
      let clicedamgle = feature.get('Переп');
      let clicedmax = feature.get('макс')


      overlayLayerski.setPosition(clickedCoordinate);
        overlayLocalName2.innerHTML = 'НАЗВАНИЕ ТРАССЫ: ' + clickedName2 ;
        overlaylen1.innerHTML = 'ДЛИННА (КМ): ' + clicedlen1 ;
        overlayamgle.innerHTML = 'ПЕРЕПАД ВЫСОТ (М): ' + clicedamgle ;
        overlaymax.innerHTML = 'ОБЩИЙ ПОДЪЕМ (М): ' + clicedmax ;

    },
    {
      layerFilter: function(layerCandidate){
        return layerCandidate.get('title') === 'ski-roads'
      }
    })
  })

  const overlayContainerElementhils = document.querySelector('.overlay-container3');
  const overlayLayerhils = new ol.Overlay({
    element: overlayContainerElementhils
  })
  map.addOverlay(overlayLayerhils);
  const overlayLocalName3 = document.getElementById('local- Name3');
  const overlayarea1 = document.getElementById('local- area1');
  const overlayinf2 = document.getElementById('local- inf2');
  const overlayriv = document.getElementById('local- riv');


    map.on('click', function(e){
    overlayLayerhils.setPosition(undefined);
    map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
      let clickedCoordinate = e.coordinate;
      let clickedName3 = feature.get('Назва');
      let clicedarea1 = feature.get('area1');
      let clicedinf2 = feature.get('описа');
      let clicedriv = feature.get('прито')


      overlayLayerhils.setPosition(clickedCoordinate);
        overlayLocalName3.innerHTML = 'НАЗВАНИЕ : ' + clickedName3 ;
        overlayarea1.innerHTML = 'ПЛОЩАДЬ ДОЛИНЫ (ГА): ' + clicedarea1 ;
        overlayinf2.innerHTML = 'ОПИСАНИЕ: ' + clicedinf2;
        overlayriv.innerHTML = 'ПРИТОКИ: ' + clicedriv ;

    },
    {
      layerFilter: function(layerCandidate){
        return layerCandidate.get('title') === 'hils-river'
      }
    })
  })


  const overlayContainerElementLine = document.querySelector('.overlay-container4');
  const overlayLayerLine = new ol.Overlay({
    element: overlayContainerElementLine
  })
  map.addOverlay(overlayLayerLine);
  const overlayLocalName4 = document.getElementById('local- Name4');
  const overlayLen2 = document.getElementById('local- Len2');
  const overlayinf3 = document.getElementById('local- inf3');


    map.on('click', function(e){
    overlayLayerLine.setPosition(undefined);
    map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
      let clickedCoordinate = e.coordinate;
      let clickedName4 = feature.get('PopupInfo');
      let clicedLen2 = feature.get('len');
      let clicedinf3 = feature.get('info');


      overlayLayerLine.setPosition(clickedCoordinate);
        overlayLocalName4.innerHTML = 'Туристический маршрут ' + clickedName4 ;
        overlayLen2.innerHTML = 'ПРОТЯЖЕННОСТЬ: ' + clicedLen2 ;
        overlayinf3.innerHTML = 'ОПИСАНИЕ: ' + clicedinf3;
    },
    {
      layerFilter: function(layerCandidate){
        return layerCandidate.get('title') === 'green-line'
      }
    })
  })



  const overlayContainerElementLes = document.querySelector('.overlay-container5');
  const overlayLayerLes = new ol.Overlay({
    element: overlayContainerElementLes
  })
  map.addOverlay(overlayLayerLes);
  const overlayLocalName5 = document.getElementById('local- Name5');
  const overlaypor = document.getElementById('local- por');
  const overlaydirt = document.getElementById('local- dirt');
  const overlayold = document.getElementById('local- old');
  const overlayrest = document.getElementById('local- rest');
  const overlayl_vo = document.getElementById('local- l_vo');


    map.on('click', function(e){
    overlayLayerLes.setPosition(undefined);
    map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
      let clickedCoordinate = e.coordinate;
      let clickedName5 = feature.get('N');
      let clicedpor = feature.get('Пород')
      let cliceddirt = feature.get('Загря')
      let clicedold = feature.get('Возра')
      let clicedrest = feature.get('Рекри')
      let clicedl_vo = feature.get('уч_лв')


        overlayLayerLes.setPosition(clickedCoordinate);
        overlayLocalName5.innerHTML = 'НОМЕР КВАРТАЛА: ' + clickedName5;
        overlaypor.innerHTML = 'ПРЕОБЛАДАЮЩИЕ ПОРОДЫ: ' + clicedpor  ;
        overlaydirt.innerHTML = 'ЗАГРЯЗНЕНИЕ: ' + cliceddirt ;
        overlayold.innerHTML = 'ВОЗРАСТ НАСАЖДЕНИЙ: ' + clicedold ;
        overlayrest.innerHTML = 'РЕКРИАЦИОННЫЙ ПОТЕНЦИАЛ: ' + clicedrest ;
        overlayl_vo.innerHTML = 'УЧАСТКОВОЕ ЛЕСНИЧЕСТВО ' + clicedl_vo ;

    },
    {
      layerFilter: function(layerCandidate){
        return layerCandidate.get('title') === 'kv-les'
      }
    })
  })

  const overlayContainerElementArea = document.querySelector('.overlay-container6');
  const overlayLayerArea = new ol.Overlay({
    element: overlayContainerElementArea
  })
  map.addOverlay(overlayLayerArea);
  const overlayLocalName6 = document.getElementById('local- Name6');
  const overlaycross = document.getElementById('local- cross');
  const overlayres = document.getElementById('local- res');
  const overlayriver = document.getElementById('local- river');
  const overlaytur = document.getElementById('local- tur');
  const overlayvel = document.getElementById('local- vel');
  const overlaysport = document.getElementById('local- sport');
  const overlaypriro = document.getElementById('local- priro');
  const overlayles = document.getElementById('local- les');


    map.on('click', function(e){
    overlayLayerArea.setPosition(undefined);
    map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
      let clickedCoordinate = e.coordinate;
      let clickedName6 = feature.get('Name');
      let clicedcross = feature.get('трасс')
      let clicedres = feature.get('отдых')
      let clicedriver = feature.get('реки')
      let clicedtur = feature.get('Турис')
      let clicedvel = feature.get('вело')
      let clicedsport = feature.get('спорт')
      let clicedpriro = feature.get('приро')
      let clicedles = feature.get('лес')



        overlayLayerArea.setPosition(clickedCoordinate);
        overlayLocalName6.innerHTML = 'Район: ' + clickedName6;
        overlaycross.innerHTML = 'Спортивные трассы: ' + clicedcross + ' шт'  ;
        overlayres.innerHTML = 'Мест отдыха на природе: ' + clicedres + ' шт';
        overlayriver.innerHTML = 'Реки: ' + clicedriver ;
        overlaytur.innerHTML = 'Туристическая привлекательность: ' + clicedtur ;
        overlayvel.innerHTML = 'Велосипедных дорожек: ' + clicedvel + ' км';
        overlaysport.innerHTML = 'Спортивных объектов: ' + clicedsport + ' шт';
        overlaypriro.innerHTML = 'Природная привлекательность: ' + clicedpriro ;
        overlayles.innerHTML = 'Лесопокрытая площадь: ' + clicedles + ' га' ;

    },
    {
      layerFilter: function(layerCandidate){
        return layerCandidate.get('title') === 'area-p'
      }
    })
  })


  //Подсвечивание элементов

  const selectInteraction_eco = new ol.interaction.Select({
    condition: ol.events.condition.singleClick,
    layers: [eco_roadsJSON],
    style: new ol.style.Style({ 
      fill: new ol.style.Fill({
        color: [230, 255, 255, 0.4]
      }),
      stroke: new ol.style.Stroke({
        color: [7, 83, 23,1],
        width: 5
      })  
        }),

      });
    
  map.addInteraction(selectInteraction_eco);

  const selectInteraction_info = new ol.interaction.Select({
    condition: ol.events.condition.singleClick,
    layers: [ifno_stendJSON],
    style: new ol.style.Style({
      image: new ol.style.Icon({
        src: './data/icon/info1.png',
        anchor: [0.5,0.9],
        scale: 0.04
      })
    })
  })
    
  map.addInteraction(selectInteraction_info);


  const selectInteraction_ski = new ol.interaction.Select({
    condition: ol.events.condition.singleClick,
    layers: [ski_roadsJSON],
    style: new ol.style.Style({ 
      fill: new ol.style.Fill({
        color: [75, 4, 75]
      }),
      stroke: new ol.style.Stroke({
        color: [75, 4, 75],
        width: 4
      })  
        }),
      });
    
  map.addInteraction(selectInteraction_ski);


  const selectInteraction_hils = new ol.interaction.Select({
    condition: ol.events.condition.singleClick,
    layers: [hils_riversJSON],
    style: new ol.style.Style({ 
      fill: new ol.style.Fill({
        color: [208, 255, 0, 0.616]
      }),
      radius: 12,
      stroke: new ol.style.Stroke({
        color: [7, 83, 23, 0.6],
        width: 3
      })  
        }),
      });
    
  map.addInteraction(selectInteraction_hils);


  const selectInteraction_Line = new ol.interaction.Select({
    condition: ol.events.condition.singleClick,
    layers: [greenJSON],
    style: new ol.style.Style({ 
      fill: new ol.style.Fill({
        color: [121, 2, 2]
      }),
      stroke: new ol.style.Stroke({
        color: [121, 2, 2],
        width: 5
      })  
        }),
      });
    
  map.addInteraction(selectInteraction_Line);


  const selectInteraction_les = new ol.interaction.Select({
    condition: ol.events.condition.singleClick,
    layers: [kv_lesJSON],
    style: new ol.style.Style({ 
      fill: new ol.style.Fill({
        color: [255, 251, 0, 0.4]
      }),
      radius: 12,
      stroke: new ol.style.Stroke({
        color: [122, 68, 0, 0.6],
        width: 3
      })  
        }),
      });
    
      map.addInteraction(selectInteraction_les);

  const selectInteraction_Area = new ol.interaction.Select({
    condition: ol.events.condition.singleClick,
    layers: [area_pJSON],
    style: new ol.style.Style({ 
      fill: new ol.style.Fill({
        color: [255, 251, 0, 0.4]
      }),
      radius: 12,
      stroke: new ol.style.Stroke({
        color: [122, 68, 0, 0.6],
        width: 3
      })  
        }),
      });
    
  map.addInteraction(selectInteraction_Area);





      //Всплывающие окна
  


      const overlayPPElement = document.querySelector('.overlay-PP');
      const overlayLayerPP = new ol.Overlay({
        element: overlayPPElement
      })
      map.addOverlay(overlayLayerPP);
      const overlayLocalPP = document.getElementById('local - PP');
    
      map.on('pointermove', function(e){
        overlayLayerPP.setPosition(undefined);
        map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
          let clickedCoordinate = e.coordinate;
          let clickedPP = feature.get('Назва');
            overlayLayerPP.setPosition(clickedCoordinate);
            overlayLocalPP.innerHTML = clickedPP;
        },
        {
          layerFilter: function(layerCandidate){
            return layerCandidate.get('title') === 'picnic-place';
          }
        })
      })

      const overlayKPElement = document.querySelector('.overlay-KP');
      const overlayLayerKP = new ol.Overlay({
        element: overlayKPElement
      })
      map.addOverlay(overlayLayerKP);
      const overlayLocalKP = document.getElementById('local - KP');
    
      map.on('pointermove', function(e){
        overlayLayerKP.setPosition(undefined);
        map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
          let clickedCoordinate = e.coordinate;
          let clickedKP = feature.get('Назва');
            overlayLayerKP.setPosition(clickedCoordinate);
            overlayLocalKP.innerHTML = clickedKP;
        },
        {
          layerFilter: function(layerCandidate){
            return layerCandidate.get('title') === 'kids-place';
          }
        })
      })

      const overlaySPElement = document.querySelector('.overlay-SP');
      const overlayLayerSP = new ol.Overlay({
        element: overlaySPElement
      })
      map.addOverlay(overlayLayerSP);
      const overlayLocalSP = document.getElementById('local - SP');
    
      map.on('pointermove', function(e){
        overlayLayerSP.setPosition(undefined);
        map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
          let clickedCoordinate = e.coordinate;
          let clickedSP = feature.get('Тип_п');
            overlayLayerSP.setPosition(clickedCoordinate);
            overlayLocalSP.innerHTML = clickedSP;
        },
        {
          layerFilter: function(layerCandidate){
            return layerCandidate.get('title') === 'sport-place';
          }
        })
      })

      const overlayStElement = document.querySelector('.overlay-St');
      const overlayLayerSt = new ol.Overlay({
        element: overlayStElement
      })
      map.addOverlay(overlayLayerSt);
      const overlayLocalSt = document.getElementById('local - St');
    
      map.on('pointermove', function(e){
        overlayLayerSt.setPosition(undefined);
        map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
          let clickedCoordinate = e.coordinate;
          let clickedSt = feature.get('PopupInfo');
            overlayLayerSt.setPosition(clickedCoordinate);
            overlayLocalSt.innerHTML = clickedSt;
        },
        {
          layerFilter: function(layerCandidate){
            return layerCandidate.get('title') === 'Stadion';
          }
        })
      })

      const overlayDPElement = document.querySelector('.overlay-DP');
      const overlayLayerDP = new ol.Overlay({
        element: overlayDPElement
      })
      map.addOverlay(overlayLayerDP);
      const overlayLocalDP = document.getElementById('local - DP');
    
      map.on('pointermove', function(e){
        overlayLayerDP.setPosition(undefined);
        map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
          let clickedCoordinate = e.coordinate;
          let clickedDP = feature.get('Адрес');
            overlayLayerDP.setPosition(clickedCoordinate);
            overlayLocalDP.innerHTML = clickedDP;
        },
        {
          layerFilter: function(layerCandidate){
            return layerCandidate.get('title') === 'dog-place';
          }
        })
      })
      const overlayPDElement = document.querySelector('.overlay-PD');
      const overlayLayerPD = new ol.Overlay({
        element: overlayPDElement
      })
      map.addOverlay(overlayLayerPD);
      const overlayLocalPD = document.getElementById('local - PD');
    
      map.on('pointermove', function(e){
        overlayLayerPD.setPosition(undefined);
        map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
          let clickedCoordinate = e.coordinate;
          let clickedPD = feature.get('Распо');
            overlayLayerPD.setPosition(clickedCoordinate);
            overlayLocalPD.innerHTML = clickedPD;
        },
        {
          layerFilter: function(layerCandidate){
            return layerCandidate.get('title') === 'duck-place';
          }
        })
      })

      const overlaySRElement = document.querySelector('.overlay-SR');
      const overlayLayerSR = new ol.Overlay({
        element: overlaySRElement
      })
      map.addOverlay(overlayLayerSR);
      const overlayLocalSR = document.getElementById('local - SR');
    
      map.on('pointermove', function(e){
        overlayLayerSR.setPosition(undefined);
        map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
          let clickedCoordinate = e.coordinate;
          let clickedSR = feature.get('NAME');
            overlayLayerSR.setPosition(clickedCoordinate);
            overlayLocalSR.innerHTML = clickedSR;
        },
        {
          layerFilter: function(layerCandidate){
            return layerCandidate.get('title') === 'smal-river';
          }
        })
      })

      const overlayPrElement = document.querySelector('.overlay-Pr');
      const overlayLayerPr = new ol.Overlay({
        element: overlayPrElement
      })
      map.addOverlay(overlayLayerPr);
      const overlayLocalPr = document.getElementById('local - Pr');
    
      map.on('pointermove', function(e){
        overlayLayerPr.setPosition(undefined);
        map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
          let clickedCoordinate = e.coordinate;
          let clickedPr = feature.get('PopupInfo');
            overlayLayerPr.setPosition(clickedCoordinate);
            overlayLocalPr.innerHTML = clickedPr;
        },
        {
          layerFilter: function(layerCandidate){
            return layerCandidate.get('title') === 'park';
          }
        })
      })

      const overlaypointElement = document.querySelector('.overlay-point');
      const overlayLayerpoint = new ol.Overlay({
        element: overlaypointElement
      })
      map.addOverlay(overlayLayerpoint);
      const overlayLocalpoint = document.getElementById('local - point');
    
      map.on('pointermove', function(e){
        overlayLayerpoint.setPosition(undefined);
        map.forEachFeatureAtPixel(e.pixel, function(feature, layer){
          let clickedCoordinate = e.coordinate;
          let clickedpoint = feature.get('PopupInfo');
            overlayLayerpoint.setPosition(clickedCoordinate);
            overlayLocalpoint.innerHTML = clickedpoint;
        },
        {
          layerFilter: function(layerCandidate){
            return layerCandidate.get('title') === 'point-st';
          }
        })
      })
      
      








}
