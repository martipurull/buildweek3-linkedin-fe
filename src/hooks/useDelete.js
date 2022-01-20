import { useState, useEffect } from 'react';

export default function useDelete(url) {
  
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const performDelete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${url}`, {
                method: 'DELETE'
            })
            if (!response.ok) throw new Error('Fetch Failed')
            setResponse('OK')
        } catch (error) {
            setError(error)
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return { response, error, loading, performDelete }

}