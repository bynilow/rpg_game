import { ID, Models } from 'appwrite';
import { ErrorMessage, Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { account } from '../../../appwrite/config';
import { palette } from '../../../styles/palette';
import Title from '../../Title/Title';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { authUserAC } from '../../../store/reducers/ActionCreators';

interface ILoginProps {

}

const Registration: FC<ILoginProps> = ({ }) => {
    const {userData} = useAppSelector(state => state.userReducer);
    const [isEmailExists, setIsEmailExists] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    type ValidateDataT = {
        name: string,
        email: string,
        password: string,
        retryPassword: string
    }

    const onUserSignUp = async ({name, email, password}: ValidateDataT) => {
        try{
            const res1 = await account.create(ID.unique(), email, password, name);
            await account.createEmailSession(email, password);
            await dispatch(authUserAC());
            navigate('/game');
            // setUser(res)
        } catch(e) {
            setIsEmailExists(true);
        }
    }

    const onValidateValues = ({name, email, password, retryPassword}: ValidateDataT) => {
        type ErrorsT = {
            name?: string,
            email?: string,
            password?: string,
            retryPassword?: string
        }
        const errors: ErrorsT = {};
        setIsEmailExists(false);
        
        if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) || email.length < 3) {
            errors.email = 'Невалидная почта'
        }

        if(/\W/gi.test(name) || name.length < 6) {
            errors.name = 'Невалидное имя пользователя'
        }

        if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password) || !password){
            errors.password = 'Невалидный пароль'
        }
        
        if(retryPassword !== password){
            errors.retryPassword = 'Пароли не совпадают'
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
                    name: '',
                    email: '',
                    password: '',
                    retryPassword: ''
                }}
                onSubmit={(values, {setSubmitting}) => onUserSignUp(values)}
                validateOnChange
                validateOnMount
                isInitialValid
                validate={values => onValidateValues(values)} >
                {({
                    values,
                    errors,
                    handleChange,
                    handleSubmit,
                    isSubmitting
                }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>
                        <Title $size='2rem'>
                            Регистрация
                        </Title>
                        <Field
                            type='text'
                            name='name'
                            maxLength={24}
                            value={values.name}
                            onChange={handleChange}
                            placeholder='name' />
                        <ErrorMessage name='name' component='div' />

                        <Field
                            type='email'
                            name='email'
                            autoComplete='off'
                            maxLength={64}
                            value={values.email}
                            onChange={handleChange}
                            placeholder='email' />
                        <ErrorMessage name='email' component='div' />
                        {
                            isEmailExists &&
                            <EmailExists>Почта уже существует</EmailExists>
                        }

                        <Field
                            type='password'
                            name='password'
                            maxLength={32}
                            value={values.password}
                            onChange={handleChange}
                            placeholder='pass' />
                        <ErrorMessage name='password' component='div' />

                        <Field
                            type='password'
                            name='retryPassword'
                            maxLength={32}
                            value={values.retryPassword}
                            onChange={handleChange}
                            placeholder='pass' />
                        <ErrorMessage name='retryPassword' component='div' />

                        <Submit type='submit' disabled={isSubmitting}>
                            Создать
                        </Submit>
                        <StyledLink to={'/login'}>
                            Уже есть аккаунт?
                        </StyledLink>
                    </Form>
                )}
            </Formik>
        </Main>
    );
}

const EmailExists = styled.div`
    
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

    &:disabled{
        background-color: ${palette.hardGray};
        cursor: default;
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

export default Registration;