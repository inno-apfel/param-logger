import { isAxiosError } from 'axios';

type modeTypes = 'alert' | 'log'

function errorLogger(error: Error, mode: modeTypes){
    let log = 'Unknown Error';
    if (isAxiosError(error)) {
        log = `ERROR \n\nStatus Code: ${error.response?.status}\nMessage:${error.response?.data}`
    }
    if (mode === 'alert'){
        alert(log);
    }
    else{
        console.error(log);
    }
}

export default errorLogger;
