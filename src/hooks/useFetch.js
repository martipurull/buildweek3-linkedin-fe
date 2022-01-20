import { useState, useEffect } from 'react';

export default function useFetch(url) {
  
    const [data, setData] = useState(null)
    const [error, setError] = useState(false)

    const fetchData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${url}`)
            if (!response.ok) throw new Error('Fetch Failed')
            const body = await response.json()
            setData(body)
        } catch (error) {
            setError(error)
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return { data, error }

}