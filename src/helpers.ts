import { TransportMode, Position } from "./interfaces";

export function getDistance(
  transportMode: TransportMode,
  position: Position,
  placeId: string
): Promise<number> {
  // WARNING: This map is put inside a function because it depends on Google to be loaded
  const TRANSPORT_MODE_TO_TRAVEL_MODE = {
    [TransportMode.Walk]: window.google.maps.TravelMode.WALKING,
    [TransportMode.Car]: window.google.maps.TravelMode.DRIVING,
    [TransportMode.Transit]: window.google.maps.TravelMode.TRANSIT,
    [TransportMode.Lyft]: window.google.maps.TravelMode.DRIVING
  };
  const { latitude, longitude } = position;

  return new Promise((resolve, reject) => {
    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [new window.google.maps.LatLng(latitude, longitude)],
        destinations: [{ placeId }],
        travelMode: TRANSPORT_MODE_TO_TRAVEL_MODE[transportMode]
      },
      (response, status) => {
        if (status !== "OK") {
          return reject();
        }
        const element = response.rows[0].elements[0];
        if (element.status !== "OK") {
          return reject();
        }
        return resolve(element.duration.value * 1000);
      }
    );
  });
}
