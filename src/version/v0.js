exports.handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      "version": "0.0.0",
      "releaseDate": "2020/01/01"
    })
  };
};