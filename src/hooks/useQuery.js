import { useState, useEffect } from 'react'
import { post } from 'axios'

function useQuery({ endpoint, body }) {
    const [data, setData] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        post(endpoint, body)
            .then(({ data }) => setData(data))
            .catch(error => setError(error))
    }, [endpoint])

    return [data, error]
}
export default useQuery