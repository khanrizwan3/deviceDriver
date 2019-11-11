'use strict';

function statesReponse(body) {

    //let data = JSON.parse(Buffer.concat(body).toString('ascii'));
    let data = Buffer.concat(body).toString('ascii');

    return (data == 's') ? 'S S     100.0 g'
        // : condition2 ? value2
            //: condition3 ? value3
            : 'No command found.';
    
}

module.exports = {
    statesReponse
}
