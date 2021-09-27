/**
 * View do componente BusLine
 */
import React from 'react';
//Importa os componentes do Bootstrap
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';

//Importa o componente BusLineViewItem
import BusLineViewItem from '../BusLineViewItem/BusLineViewItem'

//Importa o CSS
import styles from './Home.module.css'

//Import o componente Image do Next
import Image from 'next/image'

const HomeView = (props) => {
    let errorMessage = null;
    let connectingMessage = null;
    let busLinesItem = [];

    //Verifica se está conectando
    if (props.isConnectingSearchBusLines) {
        connectingMessage =
            <div className={styles.MessageError}>
                <Spinner animation="border" variant="danger" />
            </div>
    }
    //Exibe mensagem se houve uma conexão com erro
    else if (props.searchBusLinesWithSuccess === 2) {
        errorMessage =
            <div className={styles.MessageError}>
                Houve um erro ao buscar a informação. Tente novamente mais tarde!
            </div>
        //Exibe mensagem não tem nenhuma linha encontrado
    } else if (props.busLines.length === 0) {
        errorMessage =
            <div className={styles.MessageError}>
                Nenhuma linha encontrada.
            </div>
    } else {
        //Montando a informação da linha
        props.busLines.forEach(busLine => {

            //Colocando um componente para cada busLine. O props key no Row é super importante. 
            //            É necessário uma informação único com componente que se repete               
            busLinesItem.push(
                <Row key={busLine.cl}>
                    <Col>
                        <BusLineViewItem busLine={busLine}
                            chooseBusLine={props.chooseBusLine}
                        />
                    </Col>
                </Row>
            )
        });
    }

    // Criando o View 
    return (
        <Container fluid={true} className={[styles.ContainerBusLine, styles.ContainerBorder]}>
            <Row className="justify-content-md-center">
                <Col md={9} className={[styles.BusBox]}>
                    <Row>
                        <Col className={styles.TitleSearchLines}>
                            <Image
                                src="/busImage.jpg"
                                alt="Picture of the author"
                                width={1200}
                                height={400}
                                layout="intrinsic"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className={styles.TitleSearchLines}>
                            Buscar Linhas
                        </Col>
                    </Row>
                    <Row>
                        <Col md={10}>
                            <input className={styles.TextSearch} type="text" onChange={props.onTextChange} />
                        </Col>
                        <Col md={2}>
                            <Button variant="outline-secondary" onClick={props.findBusLines}>Buscar</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {/* Colocando as informações que consistimos anteriormente */}
                            {connectingMessage}
                            {errorMessage}
                            {busLinesItem}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default HomeView;