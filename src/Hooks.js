import { useContext, useEffect, useState } from 'react';
import { AppData } from './AppData';

export const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

export default function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    async function fetchUrl() {
      const response = await fetch(url);
      const json = await response.json();
      
      setData(json);
      setLoading(false);
    }
    
    useEffect(() => {
      fetchUrl();
    }, []);
    
    return [data, loading];
  };
