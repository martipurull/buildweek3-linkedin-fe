import { useState, useEffect } from 'react';

export default function useJsonCreateOrUpdate() {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const performJsonCreateOrUpdate = async (url, method, body) => {
        try {
            const response = await fetch(`${ process.env.REACT_APP_BASE_URL }/${ url }`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body
            })
            if (!response.ok) throw new Error('Fetch Failed')
            const responseData = await response.json()
            setData(responseData)
        } catch (error) {
            setError(error)
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return { data, error, loading, performJsonCreateOrUpdate }

}