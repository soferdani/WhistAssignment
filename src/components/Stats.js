import axios from "axios";
import { Card,  Row } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Stats() {
    const [soledItems, setSoledItems] = useState([]);

    useEffect(() => { 
        fetchSoledItems();
    }, []);

    const fetchSoledItems = async () => {
        let data = await axios.get("http://localhost:5000/bringAllSoledItems");
        setSoledItems(parseDataForTop5MostFreq(data.data));
    }


    const parseDataForTop5MostFreq = (data) => { 
        const sortedData = data.reduce((acc, item) => { 
            acc[item.title] = (acc[item.title] || 0) + 1;
            return acc;
        }, {});
        let onlyTop5Key = Object.keys(sortedData)
        let onlyTop5Value = Object.values(sortedData)
        let top5Total = []
        for (let i = 0; i < 5; i++) { 
            top5Total.push({ 
                title: onlyTop5Key[i],
                value: onlyTop5Value[i]
            })
        }
        return top5Total
    }


	return (
        <div className='stats'>
            <br />
			<Row lg={{ cols: 4 }} sm={{ cols: 2 }} xs={{ cols: 1 }}>
				<Card style={{ width: "18rem" }}>
					<Card.Body>
						<Card.Title>Top 5 sel</Card.Title>
						<Card.Text>
                            {soledItems?.map((item,index) => {
                                return (
                                    <span style={{display: "block"}} key={index}>
                                        {item.title} : {item.value}
                                    </span>
                                )
                            })}
						</Card.Text>
					</Card.Body>
				</Card>
				<Card style={{ width: "18rem" }}>
					<Card.Body>
						<Card.Title>Past 5 days $</Card.Title>
						<Card.Text>
                        Display the sales on a daily basis for the past 5 days
						</Card.Text>
					</Card.Body>
				</Card>
			</Row>
		</div>
	);
}
