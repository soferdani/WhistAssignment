import Button from "react-bootstrap/Button";
import { Table, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Admin() {
	const [itemsToSales, setItemsToSales] = useState([]);
	const [show, setShow] = useState(false);
	const [validated, setValidated] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [editItemId, setEditItemId] = useState("");
	let itemToEdit = {};

	const [itemTitle, setItemTitle] = useState("");
	const [itemPrice, setItemPrice] = useState(Number);
	const [itemDescription, setItemDescription] = useState("");
	const [itemImage, setItemImage] = useState("");

	const handleClose = () => setShow(false);
	const handleCloseEdit = () => setShowEdit(false);
	const handelShowNewAdd = () => {
		setItemTitle("");
		setItemPrice(0);
		setItemDescription("");
		setItemImage("");
		setShow(true)
	};

	useEffect(() => {
		fetchItems();
	}, []);

	const fetchItems = async () => {
		let data = await axios.get("http://localhost:8888/bringAllProductsToSale");
		setItemsToSales(data.data);
	};

	const handleRemoveItem = async (id) => {
		await axios.delete(`http://localhost:8888/deleteItemFromSale/${id}`);
		fetchItems();
	};

	const handleSubmit = async (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			let jsonToSend = {
				title: itemTitle,
				price: itemPrice,
				image: itemImage,
				description: itemDescription,
			};
			await axios.post(`http://localhost:8888/addItemToSale`, jsonToSend);
		}
		setValidated(true);
	};

	const handleSubmitEdit = async (event) => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		} else {
			let jsonToSend = {
				title: itemTitle,
				price: itemPrice,
				image: itemImage,
				description: itemDescription,
			};
			await axios.post(`http://localhost:8888/editItem/${editItemId}`, jsonToSend);
		}
		setValidated(true);
	};

	const handleEditItem = (item) => {
		setShowEdit(true);
		itemToEdit = item;
		setItemTitle(item.title);
		setItemPrice(item.price);
		setItemImage(item.image);
		setItemDescription(item.description);
		setEditItemId(item._id);
	};

	return (
		<div className='admin'>
			<div className='button-container'>
				<Button onClick={handelShowNewAdd}>Add</Button>
			</div>
			<div className='table'>
				<Table striped bordered hover size='m'>
					<thead>
						<tr>
							<th>#</th>
							<th>Title</th>
							<th>Price</th>
							<th>Option</th>
						</tr>
					</thead>
					<tbody>
						{itemsToSales?.map((item, index) => {
							return (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{item.title}</td>
									<td>{item.price}</td>
									<td>
										<Button
											onClick={() => {
												handleRemoveItem(item._id);
											}}
											style={{ marginRight: "15px" }}
										>
											Delete
										</Button>
										<Button
											onClick={() => {
												handleEditItem(item);
											}}
										>
											Edit
										</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
			{/* modal 2 */}
			<Modal show={showEdit} onHide={handleCloseEdit}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Item</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form noValidate validated={validated} onSubmit={handleSubmitEdit}>
						<Form.Group className='mb-3' controlId='validationCustom01'>
							<Form.Label>Item Title</Form.Label>
							<Form.Control
								required
								type='text'
								value={itemTitle}
								onChange={(event) => setItemTitle(event.target.value)}
							/>
							<Form.Control.Feedback type='invalid'>
								You must provide Title of the item.
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className='mb-3' controlId='validationCustom02'>
							<Form.Label>Item Price</Form.Label>
							<Form.Control
								required
								value={itemPrice}
								onChange={(event) => setItemPrice(event.target.value)}
							/>
							<Form.Control.Feedback type='invalid'>
								You must provide a price for the item.
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className='mb-3' controlId='validationCustom03'>
							<Form.Label>Item image</Form.Label>
							<Form.Control
								required
								value={itemImage}
								onChange={(event) => setItemImage(event.target.value)}
							/>
							<Form.Control.Feedback type='invalid'>
								You must provide a url image.
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className='mb-3' controlId='validationCustom04'>
							<Form.Label>Item description</Form.Label>
							<Form.Control
								required
								value={itemDescription}
								onChange={(event) => setItemDescription(event.target.value)}
							/>
							<Form.Control.Feedback type='invalid'>
								You must provide a item description.
							</Form.Control.Feedback>
						</Form.Group>
						<Button
							variant='secondary'
							onClick={handleCloseEdit}
							style={{ marginRight: "15px" }}
						>
							Close
						</Button>
						<Button variant='primary' type='submit'>
							Save changes
						</Button>
					</Form>{" "}
				</Modal.Body>
			</Modal>

			{/* modal 1 */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add new item</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form noValidate validated={validated} onSubmit={handleSubmit}>
						<Form.Group className='mb-3' controlId='validationCustom01'>
							<Form.Label>Item Title</Form.Label>
							<Form.Control
								required
								type='text'
								value={itemTitle}
								onChange={(event) => setItemTitle(event.target.value)}
							/>
							<Form.Control.Feedback type='invalid'>
								You must provide Title of the item.
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className='mb-3' controlId='validationCustom02'>
							<Form.Label>Item Price</Form.Label>
							<Form.Control
								required
								value={itemPrice}
								onChange={(event) => setItemPrice(event.target.value)}
							/>
							<Form.Control.Feedback type='invalid'>
								You must provide a price for the item.
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className='mb-3' controlId='validationCustom03'>
							<Form.Label>Item image</Form.Label>
							<Form.Control
								required
								value={itemImage}
								onChange={(event) => setItemImage(event.target.value)}
							/>
							<Form.Control.Feedback type='invalid'>
								You must provide a url image.
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className='mb-3' controlId='validationCustom04'>
							<Form.Label>Item description</Form.Label>
							<Form.Control
								required
								value={itemDescription}
								onChange={(event) => setItemDescription(event.target.value)}
							/>
							<Form.Control.Feedback type='invalid'>
								You must provide a item description.
							</Form.Control.Feedback>
						</Form.Group>
						<Button
							variant='secondary'
							onClick={handleClose}
							style={{ marginRight: "15px" }}
						>
							Close
						</Button>
						<Button variant='primary' type='submit'>
							Save New Item
						</Button>
					</Form>{" "}
				</Modal.Body>
			</Modal>
		</div>
	);
}
