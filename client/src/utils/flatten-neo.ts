import { setNumber } from "./set-number";
import { INEORawData, INEOListItem } from "../features/neo-list/neo-list.slice";

export const flattenNEO = (obj: INEORawData) =>
  Object.entries(obj.near_earth_objects).reduce((acc: INEOListItem[], [date, data]) => {
    data.forEach((d) => {
      d.close_approach_data.forEach((cap) => {
        acc.push({
          date,
          hazard: d.is_potentially_hazardous_asteroid ? 'Yes' : 'No',
          name: d.name,
          jplLink: d.nasa_jpl_url,
          diameter: setNumber((d.estimated_diameter.feet.estimated_diameter_max + d.estimated_diameter.feet.estimated_diameter_min) / 2),
          missDistance: setNumber(cap.miss_distance.miles),
          velocity: setNumber(cap.relative_velocity.miles_per_hour),
        });
      });
    });

    return acc;
  }, []);
