import { useState, useEffect } from 'react'
import { get } from 'axios'

function useFetch(endpoint) {
    const [data, setData] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        get(endpoint)
            .then(([{ data }]) => setData(data))
            .catch(error => setError(error))
    }, [endpoint])

    if (error) {
        return [data, error]
    }

    return [data]
}
export default useFetch