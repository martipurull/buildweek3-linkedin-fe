import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useFetch(url, refreshNum) {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchData = async () => {
        try {
            const response = await axios.get(`${ process.env.REACT_APP_BASE_URL }/${ url }`)
            setData(response.data)
        } catch (error) {
            setError(error)
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const refetchData = async () => {
        try {
            const response = await axios.get(`${ process.env.REACT_APP_BASE_URL }/${ url }`)
            setData(response.data)
        } catch (error) {
            setError(error)
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [url, refreshNum])


    return { data, error, loading, refetchData }

}