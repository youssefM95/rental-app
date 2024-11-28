import {
  Row,
  Col,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Input,
  Label,
  Button
} from "reactstrap";
import PropertyCard from "../../components/cards/PropertyCard";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";

  

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [filtredProperties, setFiltredProperties] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const categories =['','Maison','Appartement','Véhicule'];
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState('0');

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const fetchProperties = async () => { 
    try {
      const response = await axios.get('/properties');
      setProperties(response.data);
      setFiltredProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties", error);
    }
  };
  const filter = () => {
    setFiltredProperties(properties.filter(property => property.price_per_day >= minPrice && property.price_per_day <= maxPrice
                                && (category ==="" || property.category === category)))
  }
  const reset = () => {
    setFiltredProperties(properties);
  }
  useEffect(() => {
    
    fetchProperties();
  }, []);
  const navigateTo = useNavigate();
  const goToEditRoute = (id)=>{
    let path = `property/`+id ; 
    navigateTo(path);
  }
  return (
    <div>
      <h5 className="mb-3">Proprietes</h5>
      <Row>
      <Accordion open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">Filtre</AccordionHeader>
          <AccordionBody accordionId="1">
            <Row>

            <Col sm="2" lg="2" xl="2">
            <Label>Min</Label>
            <Input
                  id="min"
                  name="min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)} 
                  type="number"
                /></Col>
          <Col sm="2" lg="2" xl="2">
          <Label>Max</Label>
            <Input
                  id="max"
                  name="max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)} 
                  type="number"
                />
          </Col>
          <Col sm="2" lg="2" xl="3">
          <Label>Catégorie</Label>
                <Input id="Catégorie" name="category" type="select" onChange={(e) => setCategory(e.target.value)}>
                {categories.map((categorie)=> (
                <option value={categorie}>{categorie}</option>
                ))}
                </Input>
          </Col>
          <Col sm="2" lg="2" xl="2 mt-4" >
            <Button onClick={filter}>Filter</Button>
          </Col>
          <Col sm="2" lg="2" xl="2 mt-4">
            <Button onClick={reset}>Reset</Button>
          </Col>
            </Row>
                
          </AccordionBody>
        </AccordionItem>
      </Accordion>
      </Row>
      <Row xs="1 mt-3">
        {filtredProperties.map((property, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <PropertyCard
              property={property}
              showEditAndDelete={ false}
              reload={fetchProperties}
              edit={goToEditRoute}

            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Properties;
