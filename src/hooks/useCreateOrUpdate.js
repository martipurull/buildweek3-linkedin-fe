<<<<<<< HEAD
/** @format */

import { useState, useEffect } from "react";
=======
import { useState } from 'react'
>>>>>>> upgrade

export default function useCreateOrUpdate() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const performCreateOrUpdate = async (url, method, body) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/${url}`, {
        method,
        body,
      });
      if (!response.ok) throw new Error("Fetch Failed");
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, performCreateOrUpdate };
}
