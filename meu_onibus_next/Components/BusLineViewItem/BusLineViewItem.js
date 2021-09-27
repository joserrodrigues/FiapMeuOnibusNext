/**
 * View do componente BusLine
 */
import React from 'react';
//Importa os componentes do Bootstrap
import { Row, Col } from 'react-bootstrap';

//Importa o CSS
import styles from './BusLineViewItem.module.css'

//Importa os Componentes do FontAwesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBus } from '@fortawesome/free-solid-svg-icons'

const BusLineViewItem = (props) => {

    //Verifica a direção da linha para montar o nome correto
    let laneName = props.busLine.tp + " - " + props.busLine.ts;
    if (props.busLine.sl === 1) {
        laneName = props.busLine.ts + " - " + props.busLine.tp;
    }

    //Monta o View
    return (
        <div>
            <Row>
                <Col md={2} className={styles.busIconCol}>
                    <FontAwesomeIcon icon={faBus} className={styles.busIcon} />
                </Col>
                <Col md={10} >
                    <span className={styles.TitleBuslineItem}>
                        Linha: {props.busLine.lt}
                    </span>
                    &nbsp;
                    <span className={styles.TextBuslineItem}>
                        {laneName}
                    </span>

                </Col>
            </Row>

            <Row>
                <Col className={styles.TextBuslineItem}>
                    <hr />
                </Col>
            </Row>

        </div>
    )
}
export default BusLineViewItem;