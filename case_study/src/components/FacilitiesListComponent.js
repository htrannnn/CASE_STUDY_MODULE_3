import React, { useEffect, useRef, useState } from "react";
import ImgVilla from "../villa.jpg";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { getAllFacilities, searchFacilitiesByName } from "../services/facilitiesServices";
import { getAllTypes } from "../services/typesService";

function FacilitiesListComponent() {
	const [villas, setVillas] = useState([]);
	const [type, setType] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			setVillas(await getAllFacilities());
			setType(await getAllTypes());
		};
		fetchData();
	}, []);

	const searchNameRef = useRef();
	const searchTypeRef = useRef();

	const handleSearch = async () => {
		let name = searchNameRef.current.value.trim();
		let typeId = searchTypeRef.current.value;

		setVillas(await searchFacilitiesByName(name, typeId));
	};

	return (
		<div>
			<div className="mb-4" id="titleImg">
				<h1 className="text-center shadow p-3 mb-5" id="titleText">
					WELCOME TO FURAMA RESORT
				</h1>
			</div>
			<div className="container">
				<div className="d-flex align-items-center mb-4">
					<div className="flex-grow-1 text-center">
						<h3>FACILITIES</h3>
					</div>
					<div className="flex-shrink-0">
						<div className="input-group mb-3">
							<input name="searchName" className="form-control" placeholder="Enter name" ref={searchNameRef} />
							<select className="form-select" name="searchType" id="type" ref={searchTypeRef}>
								<option value="">All</option>
								{type.map((event) => (
									<option key={event.id} value={event.id}>
										{event.name}
									</option>
								))}
							</select>
							<button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
								Search
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<Row xs={1} md={3} className="g-4">
					{villas &&
						villas.map((villa) => (
							<Col key={villa.id}>
								<Card>
									<Card.Img variant="top" src={ImgVilla} style={{ height: 250 }} />
									<Card.Body>
										<Card.Title>{villa.name}</Card.Title>
										<Card.Text>{villa.information}</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						))}
				</Row>
			</div>
		</div>
	);
}

export default FacilitiesListComponent;
