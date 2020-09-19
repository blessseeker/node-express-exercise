async function getCoordsforAddress(address) {
  // DUMMY
  return {
    lat: -6.9351356,
    lng: 107.7152746,
  };
  // MENGGUNAKAN GEOCODING
  // const response = await axios.get(
  //     `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //       address
  //     )}&key=${API_KEY}`
  //   );

  //   const data = response.data;

  //   if (!data || data.status === 'ZERO_RESULTS') {
  //     const error = new HttpError(
  //       'Could not find location for the specified address.',
  //       422
  //     );
  //     throw error;
  //   }

  //   const coordinates = data.results[0].geometry.location;

  //   return coordinates;
}

module.exports = getCoordsforAddress;
