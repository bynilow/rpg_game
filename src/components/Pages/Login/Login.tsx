import { ID, Models } from 'appwrite';
import { Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { account } from '../../../appwrite/config';
import { palette } from '../../../styles/palette';
import Title from '../../Title/Title';
import { useAppDispatch } from '../../../hooks/redux';
import { authUserAC } from '../../../store/reducers/ActionCreators';

interface ILoginProps {

}

const Login: FC<ILoginProps> = ({ }) => {

    const dispatch = useAppDispatch();
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    type ValidateDataT = {
        email: string,
        password: string,
    }

    const onUserLogin = async (values: ValidateDataT) => {
        try{
            const userData = await account.createEmailSession(values.email, values.password);
            await dispatch(authUserAC());
            navigate('/game')
        } catch{
            setIsError(true);
        }
    }

    const onValidateValues = ({email, password}: ValidateDataT) => {
        type ErrorsT = {
            email?: string,
            password?: string,
        }
        const errors: ErrorsT = {};
        setIsError(false);
        
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) || email.length < 3) {
            errors.email = 'Невалидная почта'
        }

        if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password) || !password){
            errors.password = 'Невалидный пароль'
        }

        return errors
    }

    const getAuth = async () => {
        const userData = await dispatch(authUserAC());
        if(userData) navigate('/game')
    }

    useEffect(() => {
        getAuth();
    }, [])

    return (
        <Main>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit={(values, {setSubmitting}) => onUserLogin(values)}
                validateOnChange
                validateOnMount
                isInitialValid
                validate={values => onValidateValues(values)} >
                {({
                    values,
                    handleChange,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <Title $size='2rem'>
                            Вход
                        </Title>

                        <Field
                            type='email'
                            name='email'
                            maxLength={30}
                            value={values.email}
                            onChange={handleChange}
                            placeholder='email' />

                        <Field
                            type='password'
                            name='password'
                            maxLength={18}
                            value={values.password}
                            onChange={handleChange}
                            placeholder='pass' />

                        {
                            isError &&
                                <ErrorAuth>Неверные данные / пользователя не существует</ErrorAuth>
                        }

                        <Submit type='submit' disabled={isSubmitting}>
                            Войти
                        </Submit>
                        <StyledLink to={'/signup'}>
                            Нет аккаунта?
                        </StyledLink>
                    </Form>
                )}
            </Formik>
        </Main>
    );
}

const ErrorAuth = styled.div`
    width: 50%;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${palette.accentColor};
    position: relative;

    &:after{
        content: '';
        position: absolute;
        bottom: -30%;
        right: 0;
        width: 0%;
        height: 1px;
        background-color: ${palette.accentColor};
        transition: 0.1s;
    }

    &:hover{
        &:after{
            width: 100%;
        }
    }
`

const Submit = styled.button`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${palette.darkGray};
    width: 100%;
    padding: 1rem;
    border: 1px solid ${palette.lightGray};
    border-radius: 10px;
    background-color: white;
    cursor: pointer;
    transition: 0.1s;

    &:hover{
        background-color: ${palette.lightestGray};
    }
`

const Field = styled.input`
    font-size: 1.5rem;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    border: none;
    border-bottom: 2px solid ${palette.mediumGray};
    outline: none;
`

const Form = styled.form`
    background-color: white;
    border: 1px solid ${palette.lightGray};
    border-radius: 15px;
    padding: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`

const Main = styled.main`
    width: 100vw;
    height: 100vh;
    background-color: ${palette.backgroundColor};
    display: flex;
    align-items: center;
    justify-content: center;
`

export default Login;