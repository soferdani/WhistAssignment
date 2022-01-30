import {
	Container,
	DropdownButton,
	Dropdown,
	Badge,
	Row,
	Button,
	Card,
	Col,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
	const [itemsToSales, setItemsToSales] = useState([]);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		fetchItems();
	}, []);

	const fetchItems = async () => {
        let data = await axios.get("https://mernstoreappdemo.herokuapp.com/bringAllProductsToSale");
        setItemsToSales(data.data);
	};

	const addToCart = (item) => {
		if (cart.includes(item)) {
			return;
		}
        setCart([...cart, item]);
    };
    
    const handlePayment = async () => { 
        Promise.all(
            cart.map(async (item) => { 
                let jsonToSend = {
                    title: item.title,
                    price: item.price,
                    image: item.image,
                    description: item.description,
                }; 
                await axios.post('https://mernstoreappdemo.herokuapp.com/addItemToSoledItems', jsonToSend);
                await axios.delete(`https://mernstoreappdemo.herokuapp.com/deleteItemFromSale/${item._id}`);
            })
        ).then(() => { 
            fetchItems();
        });
    }

	return (
		<div className='home'>
			<Container>
				<Row className='justify-content-md-center'>
					<Col>
						<DropdownButton
							variant='outline-secondary'
							title='Shopping Cart'
							id='input-group-dropdown-1'
						>
							{cart.map((item) => {
								return (
									<Dropdown.Item key={item._id} disabled>
										{item.title} {item.price}$
									</Dropdown.Item>
								);
							})}
							<Dropdown.Divider />
							<Dropdown.Item disabled>
								Total: {cart.reduce((acc, item) => acc + item.price, 0)}$
							</Dropdown.Item>
							<Dropdown.Item onClick={handlePayment}>Pay</Dropdown.Item>
						</DropdownButton>
						<Badge pill bg='primary'>
							{cart.length}
						</Badge>{" "}
					</Col>
				</Row>

				<Row lg={{ cols: 4 }} sm={{ cols: 2 }} xs={{ cols: 1 }}>
					{itemsToSales?.map((item) => {
						return (
							<Card key={item._id} style={{ width: "18rem" }}>
								<Card.Img variant='top' src={item.image} />
								<Card.Body>
									<Card.Title>{item.title}</Card.Title>
									<Card.Text>
										{item.description}
										<br />
										{item.price} $
									</Card.Text>
									<Button
										onClick={() => {
											addToCart(item);
										}}
										variant='primary'
									>
										Buy
									</Button>
								</Card.Body>
							</Card>
						);
					})}
				</Row>
			</Container>
		</div>
	);
}
