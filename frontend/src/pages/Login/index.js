import React, {useState} from "react";
import api from "../../services/api";
import { Form, FormGroup, Input, Button, Container} from 'reactstrap';

export default function Login({history}) { // history e o historico de navegacao que a route envia de cada vez que mudas de url para manter um track de onde se vem e para onde se vai
    const [email, setEmail] = useState("", );
    const [password, setPassword] = useState("", );


    const handleSubmit = async evt => {
        evt.preventDefault(); //quando ha refresh os valores nao desaparecem
        console.log("result of the submit", email, password)

        const response = await api.post('/login', {email, password}); // '/login' representa o caminho nas routes do backend e envia para o servidor os valores de email e password
        const userId = response.data._id  || false;

        if(userId){
            localStorage.setItem('user', userId);
            history.push('/');
        }
        else {
            const {message} = response.data
            console.log(message)
        }
    }

    return(
        <Container>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
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
                <Button>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

