import { type AxiosError } from 'axios';

type modeTypes = 'alert' | 'log'

function errorLogger(error: AxiosError, mode: modeTypes){

    let log = '';

    log += `ERROR ${error.response?.status}\n`;

    // check if error is returned from server's globalErrorHandler
    // data is returned as object containing error: string property
    if (
        error.response?.data &&
        error.response.data instanceof Object) 
        {
            if ('error' in error.response.data) {
                log += `${error.response.data.error}`
            }
            else {
                log += `${JSON.stringify(error.response.data)}`
            }
    }
    else {
        log += `${error.response?.data}`
    }

    if (mode === 'alert'){
        alert(log);
    }
    else{
        console.error(log);
    }
}

export default errorLogger;
