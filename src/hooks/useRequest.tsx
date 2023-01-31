import React, {FC, useState} from "react";
import useSWR from 'swr'
const UseRequest : (callback : any) => {
    response : any;
    sendRequest : (...payload : any) => Promise<any>;
    error: any;
    loading : boolean;
} = (callback ) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendRequest = async (...payload : any)=> {
        setLoading(true);
        setError(null);
        try{
            const res = await callback(...payload);
            setResponse(res);
            return res;
        } catch (error) {
             //@ts-ignore
            setError({code: error.errorCode, description: error.errorDescription})
        } finally {
            setLoading(false);
        }
    };

    return { sendRequest, response, error, loading};
}

export default UseRequest;