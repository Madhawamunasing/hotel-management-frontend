import React, { Component } from 'react'
import Navbars from '../../Components/Navbar/Navbar'
import Footer from '../../Layouts/Footer/Footer'
import * as ReactBootstrap from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import MessagePagination from './MessagePagination';

import './MessagesStyles/messagesTable.css';
import trash from "./utils/trash.svg";
import eye from "./utils/eye.svg";


import { getMessagesByRecieverId } from '../../Services/Api/Utilities/Index'
import { getMessagesBySenderId } from '../../Services/Api/Utilities/Index'

class Message extends Component {
    state = {
        messages: [],
        show: false
        // searchQuery: ""


    }
    componentDidMount() {
        this.handleViewReceivedMessages();
    }
    handleShowModal = () => {
        this.setState({ show: true })
    }
    handleCloseModal = () => {
        this.setState({ show: false })
    }
    handleViewReceivedMessages = async () => {
        const dataModel = {
            id: localStorage.getItem('user')
        }
        const data = await getMessagesByRecieverId(dataModel)
        console.log(data);
        this.setState({ messages: data.data })

    }


    // handleSearch = query => {
    //     this.setState({ searchQuery: query, selected })
    // }

    handleViewSentMessages = async () => {

        const dataModel = {
            id: localStorage.getItem('user')

        }
        const data = await getMessagesBySenderId(dataModel)
        this.setState({ messages: data.data })
        console.log(data);

    }

    render() {
        return (
            <div>
                <div>
                    <Navbars />
                </div>
                <div>
                    <ListGroup className='listGroupMessages'>
                        <ListGroup.Item action as={Link} to={'/writeMessages'}
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Write Message</div>

                            </div>
                            {/* <Badge bg="primary" pill>
                    14
                </Badge> */}
                        </ListGroup.Item>

                        <ListGroup.Item
                            onClick={this.handleViewReceivedMessages}
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div
                                    className="fw-bold">Received</div>
                            </div>
                            {/* <Badge bg="primary" pill>
                    14
                </Badge> */}
                        </ListGroup.Item>
                        <ListGroup.Item
                            onClick={this.handleViewSentMessages}
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div
                                    className="fw-bold">Sent</div>

                            </div>
                            {/* <Badge bg="primary" pill>
                    14
                </Badge> */}
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                {/* if({this.state.messages.length === 0}) return <p>There are no messages to show !</p> */}



                <div className='messagesTable'>
                    {/* <SearchBox value={searchQuery} onChange={this.handleSearch} /> */}
                    <ReactBootstrap.Table striped bordered hover>
                        <thead className='messageTableHead'>
                            <tr>
                                <th>Date</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Message</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='messageTableBody'>
                            {this.state.messages.map((message) =>
                                <tr key={message.messageId}>
                                    <td>{message.createdAt.split('T')[0]}</td>
                                    <td>{message.from}</td>
                                    <td>{message.to}</td>
                                    <td>{message.notification.slice(0, 20) + "..."}</td>
                                    <td>
                                        <span className="viewButton" >
                                            <div
                                                onClick={() => {
                                                    this.handleShowModal()
                                                    console.log(message.text);
                                                    this.setState({ currentMessage: message.notification })
                                                }}
                                                className="viewButton btn btn-outline-success" >
                                                <img src={eye} className="message-eye" alt="eye" />
                                                View
                                            </div>
                                        </span>
                                        <span className="deleteButton">
                                            <button
                                                onClick={() => this.handleDelete(message)}
                                                className="btn btn-outline-danger">
                                                <img src={trash} className="message-trash" alt="trash" />
                                                Delete
                                            </button>
                                        </span>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </ReactBootstrap.Table>

                    <span>
                        <MessagePagination />
                    </span>
                </div>
                <Modal className='messageViewModal'
                    show={this.state.show}
                    onHide={() => {
                        this.handleCloseModal()
                    }}
                >
                    <Modal.Header >
                        <Modal.Title>New Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='messageViewModalBody'>
                        {this.state.currentMessage}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="modalCloseButton" variant="secondary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                        <Button className="modalSaveButton" variant="primary" onClick={this.handleCloseModal}>
                            Reply
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div style={{ top: '3rem !important', position: 'relative' }}>
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Message
