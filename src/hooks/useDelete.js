import { useState, useEffect } from 'react'
import axios from 'axios'

function useDelete({ endpoint }) {
    const [data, setData] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        axios.delete(endpoint)
            .then(({ data }) => setData(data))
            .catch(error => setError(error))
    }, [endpoint])

    return [data, error]
}
export default useDelete