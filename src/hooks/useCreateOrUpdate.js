import { useState, useEffect } from 'react';

export default function useCreateOrUpdate(url, method, body) {
  
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const performCreateOrUpdate = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${url}`, {
                method,
                body
            })
            if (!response.ok) throw new Error('Fetch Failed')
            const body = await response.json()
            setData(body)
        } catch (error) {
            setError(error)
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return { data, error, loading, performCreateOrUpdate }

}