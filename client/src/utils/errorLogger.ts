import { type AxiosError } from 'axios';

type modeTypes = 'alert' | 'log'


function errorLogger(error: AxiosError, mode: modeTypes){

    alert(JSON.stringify(error))

    let log = '';
    let errorArray: string[] = ['Unknown Error'];

    log += `ERROR ${error.response?.status}\n`;

    const error_data = error?.response?.data;
    
    // if error is of format sent by backend api
    // error.response.data.messages contains 
    // a string array of passed error messages
    if (error_data instanceof Object  && 
        'messages' in error_data && 
        error_data['messages'] instanceof Array)
        {
        const messages = error_data.messages;
        if (typeof error.status === 'number' && (error.status >= 400 && error.status < 500)){
            errorArray = messages;
        }
        messages.map((msg) => {
            log += `\n${msg}`
        })
    }
    else {
       log += '\nUnknown Error';
    }

    if (mode === 'alert'){
        alert(log);
    }
    else{
        console.error(log);
    }
    return errorArray;
}

export default errorLogger;
