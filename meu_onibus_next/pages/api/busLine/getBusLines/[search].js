// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
    try {
        //Buscando o parametro search
        const { search } = req.query

        //Buscando o token do Header
        const token = req.headers.authorization;

        //Conectando a API do SPTrans para buscar o onibus
        const response = await fetch(process.env.URL_SPTRANS + '/Linha/Buscar?termosBusca=' + search, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', cookie: 'apiCredentials=' + token + ';' },
        });

        //Buscando a informação
        const json = await response.json();
        console.log(json);
        res.send(json)
    } catch (e) {
        console.log(e);
        res.send("Error Connecting");
    }
}