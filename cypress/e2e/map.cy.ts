import Header from '../page_objects/header';
import Map from '../page_objects/map';
import { MapLine } from '../../src/app/components/pages/map/MapPage';
import { LineColor } from '../../src/app/components/domain';

describe('Map', () => {
  const fakeCurrentLocation = () => {
    const fakeLocation = {
      latitude: 52.553444,
      longitude: 13.416418,
    };

    return {
      onBeforeLoad(browserWindow) {
        cy.stub(
          browserWindow.navigator.geolocation,
          'getCurrentPosition',
          (successCallback) =>
            successCallback({
              coords: {
                latitude: fakeLocation.latitude,
                longitude: fakeLocation.longitude,
              },
            }),
        );
      },
    };
  };

  it('renders all the lines', () => {
    const mapLines: MapLine[] = [
      {
        color: LineColor.BLUE,
        stationsPath: [
          {
            id: 'ex_tranca_rio_seco',
            name: 'Ex Tranca Río Seco',
            geoLocation: {
              latitude: -16.489962505473336,
              longitude: -68.20969704955483,
            },
          },
          {
            id: 'upea',
            name: 'UPEA',
            geoLocation: {
              latitude: -16.489514271908067,
              longitude: -68.19312264683401,
            },
          },
          {
            id: 'plaza_la_paz',
            name: 'Plaza La Paz',
            geoLocation: {
              latitude: -16.492250176126635,
              longitude: -68.18301875180748,
            },
          },
          {
            id: 'plaza_libertad',
            name: 'Plaza Libertad',
            geoLocation: {
              latitude: -16.494799080638867,
              longitude: -68.17353384628392,
            },
          },
          {
            id: '16_de_julio',
            name: '16 de Julio',
            geoLocation: {
              latitude: -16.497649790644072,
              longitude: -68.16446459364568,
            },
          },
        ],
      },
      {
        color: LineColor.BROWN,
        stationsPath: [
          {
            id: 'busch',
            name: 'Busch',
            geoLocation: {
              latitude: -16.49364925298172,
              longitude: -68.12128721053001,
            },
          },
          {
            id: 'las_villas',
            name: 'Las Villas',
            geoLocation: {
              latitude: -16.497660948335128,
              longitude: -68.11510407075039,
            },
          },
        ],
      },
      {
        color: LineColor.GREEN,
        stationsPath: [
          {
            id: 'libertador',
            name: 'Libertador',
            geoLocation: {
              latitude: -16.519112030566596,
              longitude: -68.11597359661714,
            },
          },
          {
            id: 'alto_obrajes',
            name: 'Alto Obrajes',
            geoLocation: {
              latitude: -16.521552984153637,
              longitude: -68.11036179276364,
            },
          },
          {
            id: 'obrajes_17',
            name: 'Obrajes 17',
            geoLocation: {
              latitude: -16.52685454454505,
              longitude: -68.10060444444267,
            },
          },
          {
            id: 'irpavi',
            name: 'Irpavi',
            geoLocation: {
              latitude: -16.538094029075953,
              longitude: -68.08734215527583,
            },
          },
        ],
      },
      {
        color: LineColor.LIGHT_BLUE,
        stationsPath: [
          {
            id: 'el_prado',
            name: 'El Prado',
            geoLocation: {
              latitude: -16.500461223903944,
              longitude: -68.13259670253261,
            },
          },
          {
            id: 'teatro_al_aire_libre',
            name: 'Teatro al Aire Libre',
            geoLocation: {
              latitude: -16.504139157566353,
              longitude: -68.12596687719952,
            },
          },
          {
            id: 'del_poeta',
            name: 'Del Poeta',
            geoLocation: {
              latitude: -16.510809568430027,
              longitude: -68.12099927852286,
            },
          },
          {
            id: 'libertador',
            name: 'Libertador',
            geoLocation: {
              latitude: -16.519112030566596,
              longitude: -68.11597359661714,
            },
          },
        ],
      },
      {
        color: LineColor.ORANGE,
        stationsPath: [
          {
            id: 'central',
            name: 'Estación Central',
            geoLocation: {
              latitude: -16.491448097412814,
              longitude: -68.14460759022887,
            },
          },
          {
            id: 'armentia',
            name: 'Armentia',
            geoLocation: {
              latitude: -16.490360433964387,
              longitude: -68.13677266405941,
            },
          },
          {
            id: 'periferica',
            name: 'Periférica',
            geoLocation: {
              latitude: -16.48650973316236,
              longitude: -68.13122192258702,
            },
          },
          {
            id: 'plaza_villaroel',
            name: 'Plaza Villarroel',
            geoLocation: {
              latitude: -16.48471098846887,
              longitude: -68.12201188173509,
            },
          },
        ],
      },
      {
        color: LineColor.PURPLE,
        stationsPath: [
          {
            id: '6_de_marzo',
            name: '6 de Marzo',
            geoLocation: {
              latitude: -16.52253580308544,
              longitude: -68.1693274319565,
            },
          },
          {
            id: 'faro_murillo',
            name: 'Faro Murillo',
            geoLocation: {
              latitude: -16.512304492477767,
              longitude: -68.15366569166622,
            },
          },
          {
            id: 'obelisco',
            name: 'Obelisco',
            geoLocation: {
              latitude: -16.500024229051945,
              longitude: -68.13508567870626,
            },
          },
        ],
      },
      {
        color: LineColor.RED,
        stationsPath: [
          {
            id: '16_de_julio',
            name: '16 de Julio',
            geoLocation: {
              latitude: -16.497649790644072,
              longitude: -68.16446459364568,
            },
          },
          {
            id: 'cementerio',
            name: 'Cementerio',
            geoLocation: {
              latitude: -16.4981713934074,
              longitude: -68.15273532452069,
            },
          },
          {
            id: 'central',
            name: 'Estación Central',
            geoLocation: {
              latitude: -16.491448097412814,
              longitude: -68.14460759022887,
            },
          },
        ],
      },
      {
        color: LineColor.SILVER,
        stationsPath: [
          {
            id: '16_de_julio',
            name: '16 de Julio',
            geoLocation: {
              latitude: -16.497649790644072,
              longitude: -68.16446459364568,
            },
          },
          {
            id: 'faro_murillo',
            name: 'Faro Murillo',
            geoLocation: {
              latitude: -16.512304492477767,
              longitude: -68.15366569166622,
            },
          },
          {
            id: 'mirador',
            name: 'Mirador',
            geoLocation: {
              latitude: -16.51810025756233,
              longitude: -68.15022452244129,
            },
          },
        ],
      },
      {
        color: LineColor.WHITE,
        stationsPath: [
          {
            id: 'plaza_villaroel',
            name: 'Plaza Villarroel',
            geoLocation: {
              latitude: -16.48471098846887,
              longitude: -68.12201188173509,
            },
          },
          {
            id: 'busch',
            name: 'Busch',
            geoLocation: {
              latitude: -16.49364925298172,
              longitude: -68.12128721053001,
            },
          },
          {
            id: 'plaza_triangular',
            name: 'Plaza Triangular',
            geoLocation: {
              latitude: -16.50408752206713,
              longitude: -68.12078967642299,
            },
          },
          {
            id: 'del_poeta',
            name: 'Del Poeta',
            geoLocation: {
              latitude: -16.510809568430027,
              longitude: -68.12099927852286,
            },
          },
        ],
      },
      {
        color: LineColor.YELLOW,
        stationsPath: [
          {
            id: 'mirador',
            name: 'Mirador',
            geoLocation: {
              latitude: -16.51810025756233,
              longitude: -68.15022452244129,
            },
          },
          {
            id: 'buenos_aires',
            name: 'Buenos Aires',
            geoLocation: {
              latitude: -16.515450077592103,
              longitude: -68.14401434775876,
            },
          },
          {
            id: 'sopocachi',
            name: 'Sopocachi',
            geoLocation: {
              latitude: -16.514679825158304,
              longitude: -68.13015811919726,
            },
          },
          {
            id: 'libertador',
            name: 'Libertador',
            geoLocation: {
              latitude: -16.519112030566596,
              longitude: -68.11597359661714,
            },
          },
        ],
      },
    ];

    cy.visit('/');

    Header.goToMapPage();

    mapLines.forEach((line) =>
      line.stationsPath.forEach((station) => {
        Map.shouldShowStationMarker(station.name.toUpperCase());
      }),
    );
  });

  it('SHOULD jump to location marker WHEN clicking on current location button', () => {
    cy.visit('/?showCurrentLocation', fakeCurrentLocation());

    cy.wait(1000); // Needed for the feature flag to activate

    Header.goToMapPage();

    Map.showCurrentLocation();

    Map.shouldShowCurrentLocationMarker();
  });
});
