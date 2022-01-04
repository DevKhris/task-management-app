import { useState, useEffect } from 'react'
import { post } from 'axios'

function useCreate({ endpoint, data }) {
    const [result, setResult] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        post(endpoint, data)
            .then(({ data }) => setResult(data))
            .catch(error => setError(error))
    }, [endpoint])

    return [data, error]
}
export default useCreate