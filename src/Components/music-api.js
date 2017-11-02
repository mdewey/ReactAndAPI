import moment from 'moment';

const KEYS = {
    MAP_API_KEY: "arpaxgvgu69s3ryc8bx4apsb",
    CACHE_DATE: "data-cache-was-updated"
}

const getData = (needle, callback, errCallback) => {
    // get the last time is cahced, and compare to today and reset if its not there
    const last = localStorage.getItem(KEYS.CACHE_DATE);
    if (last){
        const shouldClear = moment(last).isSame(moment(), 'day');
        console.log('should clear', shouldClear)
        if (!shouldClear){
            reset();
        }
    }
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
                localStorage.setItem(KEYS.CACHE_DATE, moment().format())
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