import React, { useState } from "react";
import styled from "styled-components/native";
import { Colours } from "../styles/colours"; // asigurați-vă că calea către fișierul colours.txt este corectă
import { Image } from "react-native";

const Container = styled.View`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px;
    align-items: center;
    justify-content: center;
    background-color: white; /* Schimbarea culorii de fundal la alb */
`


const ContentContainer = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF; /* Modificare: Fundal transparent */
`

const Input = styled.TextInput`
    width: 100%;
    height: 40px;
    border: 1px solid ${Colours.DARK_BLUE}; /* folosește culoarea DARK_BLUE din enum */
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px;
`

const Button = styled.TouchableOpacity`
    width: 100%;
    height: 40px;
    background-color: ${Colours.DARK_BLUE}; /* folosește culoarea DARK_BLUE din enum */
    border-radius: 5px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const ButtonText = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: bold;
`

export interface ILogin {
    onSubmit: (email: string, password: string) => void;
}

const Register: React.FC<ILogin> = ({ onSubmit }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        onSubmit(email, password);
    }

    return (
        <Container>
            <ContentContainer>
                <Image source={require('../../assets/boat.jpg')} style={{ width: '100%', height: undefined, aspectRatio: 16/9, marginBottom: 40 }} />
                <Input
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                />
                <Input
                    placeholder="Password"
                    secureTextEntry
                    onChangeText={setPassword}
                />
                <Button onPress={handleSubmit}>
                    <ButtonText>Submit</ButtonText>
                </Button>
            </ContentContainer>
        </Container>
    )
}

export default Register;
