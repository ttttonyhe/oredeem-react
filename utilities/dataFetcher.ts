const Fetcher = async (url: string, token: any) => {
  return await fetch(url, {
    headers: {
      "Authorization": "Bearer " + token
    }
  }).then(r => r.json())
}

export default Fetcher;