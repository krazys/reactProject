const flickerCall = async (apiKey, textValue) => {
    try {
      let response = await fetch(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${textValue}&per_page=24&format=json&nojsoncallback=1`
      );

      if (response.ok) {
        let data = await response.json();
        console.log('data', data.photos.photo);
        return (data.photos.photo);
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw error;
    }
  };

  export default flickerCall;