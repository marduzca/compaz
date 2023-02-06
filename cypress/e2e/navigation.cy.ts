import Page from '../page_objects/page';
import TripSelector from '../page_objects/tripSelector';
import RoutesOverview from '../page_objects/routesOverview';
import RouteDetails from '../page_objects/routeDetails';
import Map from '../page_objects/map';
import { LineColor } from '../../src/app/components/domain';

describe('Navigation', () => {
  it('Goes through the whole trip selection and visualization process successfully', () => {
    cy.visit('/');

    Page.waitForLoadingAnimationToDisappear();

    TripSelector.selectDateAndTime('1993-03-15', '09:30');
    TripSelector.selectStations('Irpavi', 'El Prado');
    TripSelector.search();

    // Routes overview
    RoutesOverview.shouldShowCorrectHeaderInfo(
      'Irpavi',
      'El Prado',
      'Monday 15 March'
    );

    RoutesOverview.showEarlierRoute();
    RoutesOverview.shouldShowRouteWithGivenTimes('09:25', '10:00');

    RoutesOverview.showLaterRoute();
    RoutesOverview.shouldShowRouteWithGivenTimes('09:50', '10:25');

    RoutesOverview.selectRouteWithGivenTimes('09:45', '10:20');

    // Route details
    const capitalizedGreenLine = `${LineColor.GREEN.charAt(
      0
    ).toUpperCase()}${LineColor.GREEN.slice(1)}`;

    RouteDetails.withinLineSubRoute(capitalizedGreenLine, () => {
      RouteDetails.showIntermediateStations();
      RouteDetails.shouldShowStations(['Obrajes 17', 'Alto Obrajes']);
    });

    RouteDetails.shouldShowSubRouteWithInfo(
      capitalizedGreenLine,
      'Irpavi',
      'Libertador'
    );

    RouteDetails.shouldShowTransfer();

    RouteDetails.shouldShowSubRouteWithInfo(
      'Light blue',
      'Libertador',
      'El Prado'
    );

    cy.get('div[aria-label="Map"]').should('be.visible');

    Map.shouldShowStationMarker('IRPAVI');
    Map.shouldShowStationMarker('LIBERTADOR');
    Map.shouldShowStationMarker('EL PRADO');
  });
});
