import React, {useState, useMemo} from "react";
import api from "../../services/api";
import { Form, FormGroup, Input, Button, Container, Label, Alert} from 'reactstrap';
import cameraIcon from "../../assets/camera.png"; 
import "./events.css"
//EventsPage will show all the events
export default function EventsPage() {
    const user_id = localStorage.getItem('user');
    console.log(user_id);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [date, setDate] = useState('');
    const [sport, setSport] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const preview = useMemo(() =>{
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]) //useMemo e triggered quando o valor de thumbnail e alterado

    console.log(title, description, sport, date, price );

    const submitHandler = async (evt) => {
        evt.preventDefault(); 
        const user_id = localStorage.getItem('user');
        const eventData = new FormData(); //criar o evento de acordo ao que foi estipulado no backend e enviar-lhe os dados como multipart
        eventData.append("thumbnail", thumbnail);
        eventData.append("sport", sport);
        eventData.append("title", title);
        eventData.append("description", description);
        eventData.append("date", date);
        eventData.append("price", price);
        
        for (var pair of eventData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        try {
            if( title !== "" &&
                sport !== "" &&
                description !== "" &&
                price !== ""&&
                date !== "" &&
                thumbnail !== null
            ){
                console.log(eventData);
                console.log("Event has been sent.");
                await api.post("/event", eventData, {headers:{user_id}});
                console.log("Event has been saved.")
            } else {
                setErrorMessage(true)
                setTimeout(()=> {
                    setErrorMessage(false)
                }, 2000)
                console.log("Missing required data.")
            }
        } catch (error) {
            Promise.reject(error);
            console.log(error.message);
        }
            
    }


    return(
        <Container>
            <h1> Create your Event </h1>
            <Form onSubmit={submitHandler}>
                <FormGroup >
                    <Label>Upload Image:</Label>
                    <Label id="thumbnail" style={{backgroundImage: `url(${preview})`}} className={thumbnail ? 'has-thumbnail' : ''}>
                    <Input type="file" name="thumbnail" onChange={(evt) => setThumbnail(evt.target.files[0])}/>
                    <img src={cameraIcon} style={{ maxWidth: "50px"}} alt= "upload icon"/>
                    </Label>
                </FormGroup>
                <FormGroup >
                    <Label>Sport:</Label>
                    <Input id="sport" type="text" value={sport} placeholder={'Sport name'} onChange={(evt) => setSport(evt.target.value)}/>
                </FormGroup>
                <FormGroup >
                    <Label>Title:</Label>
                    <Input id="title" type="text" value={title} placeholder={'Event Title'} onChange={(evt) => setTitle(evt.target.value)}/>
                </FormGroup>
                <FormGroup >
                    <Label>Event Description:</Label>
                    <Input id="description" type="text" value={description} placeholder={'Event description'} onChange={(evt) => setDescription(evt.target.value)}/>
                </FormGroup>
                <FormGroup >
                    <Label>Event Date:</Label>
                    <Input id="date" type="date" value={date} placeholder={'Event date'} onChange={(evt) => setDate(evt.target.value)}/>
                </FormGroup>
                <FormGroup >
                    <Label>Price:</Label>
                    <Input id="price" type="number" value={price} placeholder={'Event Price'} onChange={(evt) => setPrice(evt.target.value)}/>
                </FormGroup>
                <Button>
                    Create Event
                </Button>
            </Form>
            {errorMessage ? (
                <Alert className="event-validation" color="danger">Missing required information.</Alert>
            ) : ""}
        </Container>
    )
}