const KEYS = {
    MAP_API_KEY: "arpaxgvgu69s3ryc8bx4apsb"
}

const getData = (needle, callback, errCallback) => {
    const _key = needle;
    const _data = localStorage.getItem(_key);
    if (_data) {
        callback(JSON.parse(_data));
    } else {
        fetch(`http://api.jambase.com/artists?name=${needle}&page=0&api_key=${KEYS.MAP_API_KEY}`)
            .then(resp => resp.json())
            .then(json => {
                console.log("back", json)
                if (json.Artists.length) {
                    const artistId = json.Artists[0].Id
                    console.log("searching for artist", artistId);
                    return fetch(`http://api.jambase.com/events?artistId=${artistId}&page=0&api_key=${KEYS.MAP_API_KEY}`)
                } else {
                    // TODO: error handling
                }
            })
            .then(resp => resp.json())
            .then(json => {
                console.log("back again", json)
                localStorage.setItem(needle, JSON.stringify(json))
                if (callback) {
                    callback(json)
                }
            })
            .catch(err => {
                if (errCallback) {
                    errCallback(err)
                }
            });
    }
}

const reset = () => {
    localStorage.clear()
}
export default {
    getData,
    reset
};