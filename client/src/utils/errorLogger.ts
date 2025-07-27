import { isAxiosError } from 'axios';

function errorLogger(error: Error){
    let log = 'Unknown Error';
    if (isAxiosError(error)) {
        log = `ERROR \n\nStatus Code: ${error.response?.status}\nMessage:${error.response?.data}`
    }
    alert(log);
}

export default errorLogger;
