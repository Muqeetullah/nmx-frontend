import { useQuery, gql } from "@apollo/client";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

export default function Locations() {
  const { loading, error, data } = useQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.locations.map((location) => (
        <div key={location.id}>
          <h2>{location.name}</h2>
          <p>{location.description}</p>
          <img src={location.photo} alt={location.name} />
        </div>
      ))}
    </div>
  );
}
