import React, {useState} from "react";
import api from "../../services/api";
import { Form, FormGroup, Input, Button, Container, Alert} from 'reactstrap';

export default function Register({history}) { // history e o historico de navegacao que a route envia de cada vez que mudas de url para manter um track de onde se vem e para onde se vai
    const [email, setEmail] = useState("", );
    const [password, setPassword] = useState("", );
    const [firstName, setFirstName] = useState("", );
    const [lastName, setLastName] = useState("", );
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("false");


    const handleSubmit = async evt => {
        evt.preventDefault(); //quando ha refresh os valores nao desaparecem
        
        if (email !== "" && password !== "" && firstName !== "" && lastName !== ""){
            const response = await api.post('/user/register', {email, password, firstName, lastName}); // '/login' representa o caminho nas routes do backend e envia para o servidor os valores de email e password
        const userId = response.data._id  || false;
        console.log(response.data)
        if(userId){
            localStorage.setItem('user', userId);
            history.push('/');
        }
        else {
            const {message} = response.data
            console.log(message)
            setError(true);
                setErrorMessage(message)
                setTimeout(() =>{
                    setError(false);
                    setErrorMessage("")
                }, 2000)
        }
        } else {
            setError(true);
            setErrorMessage("Please insert all inputs.")
            setTimeout(() =>{
                setError(false);
                setErrorMessage("")
            }, 2000)           
        }

        
    }

    return(
        <Container>
            <h2>Register</h2>
            <p>Please register for a new acount</p>
            <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                    <Input
                    onChange={evt => setFirstName(evt.target.value)} // altera o valor da variavel firstName onChange.
                    id="exampleFirstName"
                    name="firstName"
                    placeholder="Your First Name"
                    type="text"
                    />
                </FormGroup>
                <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                    <Input
                    onChange={evt => setLastName(evt.target.value)} // altera o valor da variavel lastName onChange.
                    id="exampleLastName"
                    name="lastName"
                    placeholder="Your Last Name"
                    type="text"
                    />
                </FormGroup>
                <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                    <Input
                    onChange={evt => setEmail(evt.target.value)} // altera o valor da variavel email onChange.
                    id="exampleEmail"
                    name="email"
                    placeholder="Your email"
                    type="email"
                    />
                </FormGroup>
                <FormGroup className="mb-2 me-sm-2 mb-sm-0">
                    <Input
                    onChange={evt => setPassword(evt.target.value)} // altera o valor da variavel password onChange.
                    id="examplePassword"
                    name="password"
                    placeholder="Your password"
                    type="password"
                    />
                </FormGroup>
                <FormGroup>
                    <Button className="submit-btn">
                        Register
                    </Button>
                    <Button className="secundary-btn" onClick={()=> history.push("/login")}>
                        Login
                    </Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert className="event-validation" color="danger">{errorMessage}</Alert>
            ) : ""}
        </Container>
    )
}

