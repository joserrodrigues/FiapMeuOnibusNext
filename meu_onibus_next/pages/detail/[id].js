import { useRouter } from 'next/router'

import DetailController from "../../Components/Detail/DetailController"

export default function DetailN() {
    //Chamando o hook router para buscar as informações do route
    const router = useRouter()
    //buscando a variavel id que é o mesmo nome do arquivo
    const { id } = router.query
    return (
        <DetailController id={id} />
    )
}