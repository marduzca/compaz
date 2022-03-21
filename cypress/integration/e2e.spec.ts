import Page from '../page_objects/page';
import TripSelector from '../page_objects/tripSelector';
import RoutesOverview from '../page_objects/routesOverview';
import RouteDetails from '../page_objects/routeDetails';

describe('End to end', () => {
  it('Goes through the whole trip selection and visualization process successfully', () => {
    cy.visit('/');

    Page.waitForLoadingAnimationToDisappear();

    // Trip selector
    TripSelector.selectStations('Irpavi', 'El Prado');
    TripSelector.selectDateAndTime('1993-03-15', '09:30');
    TripSelector.search();

    // Routes overview
    RoutesOverview.shouldShowCorrectHeaderInfo(
      'Irpavi',
      'El Prado',
      'Monday 15 March'
    );

    RoutesOverview.showEarlierRoute();
    RoutesOverview.shouldShowRouteWithGivenTimes('09:25', '09:54');

    RoutesOverview.showLaterRoute();
    RoutesOverview.shouldShowRouteWithGivenTimes('09:50', '10:19');

    RoutesOverview.selectRouteWithGivenTimes('09:45', '10:14');

    // Route details
    RouteDetails.withinLineSubRoute('Green', () => {
      RouteDetails.showIntermediateStations();
      RouteDetails.shouldShowStations(['Obrajes 17', 'Alto Obrajes']);
    });

    RouteDetails.shouldShowSubRouteWithInfo('Green', 'Irpavi', 'Libertador');

    RouteDetails.shouldShowTransfer();

    RouteDetails.shouldShowSubRouteWithInfo(
      'Light blue',
      'Libertador',
      'El Prado'
    );

    // $x('//div[@role="img" and @aria-label="IRPAVI"]')
  });
});
