/**
 * Classe que irá tratar o modelo de negócio do Home
 */
export default class HomeModel {
    apiToken = "";

    /**
     * Busca as linhas na API da SPTrans
     * @param {string} searchInfo informação a ser encontrada no servidor
     */
    async loadBusLines(searchInfo) {

        //Checa se já possui o token da API
        if (this.apiToken === "") {
            //Busca o token da API
            await this.auth();
        }

        try {
            //Realiza a conexão com a API do NextJS
            const response = await fetch(process.env.NEXT_PUBLIC_URL_API + 'busLine/getBusLines/' + searchInfo, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': this.apiToken },
            });
            const returnSearch = await response.json();

            //Checa se o returnSearch retornou um array
            if (returnSearch instanceof Array) {
                console.log("Success Call");

                //Retorna com a informação
                return [1, returnSearch];
            } else {
                console.log("NOT SUCCESS");
                //Retorna com a informação
                return [0, []];
            }

        } catch (e) {
            console.log("ERROR");
            console.log(e);
            //Retorna com a informação
            return [0, []];
        }
    }

    /**
     * Realiza a autenticação com o servidor
     */
    async auth() {
        console.log(process.env.NEXT_PUBLIC_URL_API);
        try {
            //Realiza a conexão com a API do NextJS
            const response = await fetch(process.env.NEXT_PUBLIC_URL_API + 'busLine/auth', {
                method: 'GET',
            });
            const json = await response.json();

            //Adiciona a informação do token
            this.apiToken = json.apiToken;

        } catch (e) {
            console.log(e);
        }
    }
}