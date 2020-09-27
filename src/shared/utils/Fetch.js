const fetchPlease = async (input, settings = {}) => {
  const response = await (
    await fetch(input, {
      headers: { Accept: 'application/json, text/plain, */*', 'Content-type': 'application/json' },
      ...settings,
    })
  ).json()
  return response
}

export default fetchPlease
