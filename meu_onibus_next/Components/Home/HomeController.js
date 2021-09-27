/**
 * Controller do componente BusLine
 */
import React, { useState, useRef, useEffect } from 'react';
import HomeView from './HomeView'
import HomeModel from './HomeModel';


const HomeController = ({ preBusLines }) => {

    //Inicia os states
    const [searchText, setSearchText] = useState('');
    const [busLines, setBusLines] = useState(preBusLines);
    const [isConnectingSearchBusLines, setIsConnectingSearchBusLines] = useState(false);
    const [searchBusLinesWithSuccess, setSearchBusLinesWithSuccess] = useState(0);
    const homeModel = useRef(null);

    useEffect(() => {
        //Inicializa o model
        homeModel.current = new HomeModel();
    }, [])

    useEffect(() => {
        setBusLines(preBusLines);
    }, [preBusLines])

    //função que é chamada quando o texto do search é chamado
    const onTextChange = (e) => {
        console.log(e.target.value);
        setSearchText(e.target.value);
    }

    //função que será chamada ao clicar no botão
    const findBusLines = async () => {
        setIsConnectingSearchBusLines(true);
        const [status, data] = await homeModel.current.loadBusLines(searchText);

        setIsConnectingSearchBusLines(false);
        if (status === 0) {
            setSearchBusLinesWithSuccess(2);
        } else {
            setSearchBusLinesWithSuccess(1);
            setBusLines(data);
        }
    }

    return (
        <HomeView
            onTextChange={onTextChange}
            findBusLines={findBusLines}
            busLines={busLines}
            isConnectingSearchBusLines={isConnectingSearchBusLines}
            searchBusLinesWithSuccess={searchBusLinesWithSuccess}
        />
    )
}
export default HomeController;