// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
    try {
        let token = process.env.TOKEN_SPTRANS; //req.query.token;

        //Buscando Informação
        const response = await fetch(process.env.URL_SPTRANS + 'Login/Autenticar?token=' + token, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        const serverResponse = response.json();
        //Pegando cookies
        let cookies = response.headers.get('set-cookie');
        //Removendo spaces
        cookies = cookies.replace(/ /g, '');
        let arrayCookies = cookies.split(';');
        let finalToken = "";
        //Limpando para retirar informacao do token
        arrayCookies.forEach(cookie => {
            if (cookie.includes('apiCredentials')) {
                let arrayCookie = cookie.split("=");
                finalToken = arrayCookie[1];
            }
        });

        //Retornando informação
        res.send({
            response: serverResponse,
            apiToken: finalToken
        });
    } catch (e) {
        console.log(e);
        res.send("Error Connecting");
    }
}