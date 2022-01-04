import { useState, useEffect } from 'react'
import { put } from 'axios'

function useUpdate({ endpoint, data }) {
    const [result, setResult] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        put(endpoint, data)
            .then(({ data }) => setResult(data))
            .catch(error => setError(error))
    }, [endpoint])

    return [data, error]
}
export default useUpdate