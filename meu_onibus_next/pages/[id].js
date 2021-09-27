import HomeController from '../Components/Home/HomeController'
import HomeModel from '../Components/Home/HomeModel';

export default function Home({ busLines }) {

  console.log("Carregou Pagina");
  console.log(busLines);

  //Checa se a informação da busLines veio, senão coloca um array
  let busLinesFinal = [];
  if (busLines) {
    busLinesFinal = busLines;
  }

  //Carrega o componente HomeController
  return (
    <HomeController preBusLines={busLinesFinal} />
  )
}

//Função chamada na construção da aplicação
export async function getStaticProps() {
  // Chama a API para buscar a informação dos onibus
  const homeModel = new HomeModel();
  const [status, data] = await homeModel.loadBusLines("80");

  // Retornando { props: { busLines: data } }, o compomente Home
  // receberá `busLines` como props
  return {
    props: {
      busLines: data,
    },
  }

}
//Seta a informação das páginas que serão pré-carregadas
export async function getStaticPaths() {
  return {
    paths: [
      //Informa que as paginas com variáveis 1 ou 2 serão pré-carregadas em tempo de execução
      { params: { id: '1' } },
      { params: { id: '2' } }
    ],
    fallback: true
    // false - coloca erro 400 se variável for diferente do array acima
    // true -  se a variável for diferente do array acima, carrega a página sem informação
    // e depois com a informação carregada
    // 'blocking' - espera o carregamento da informação para mostrar a página
  };
}