import React, {useState} from 'react';
import {useAppDispatch} from "../../store";
import {UserThunks} from "../../store/user";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import {app, onError, signUpWithGitHub, signUpWithGoogle, signUpWithTwitter} from "../../firebase";
import { getFirestore } from 'firebase/firestore';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faGoogle, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {toast} from "react-toastify";

import { FirebaseError } from 'firebase/app';
import {useTranslation} from "react-i18next";


export function RegisterModal({closeModal}:{closeModal?: Function}) {
    const dispatch = useAppDispatch()
    const { t } = useTranslation();

    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')

    const setData = async (id: string, name: string, email: string, provider: string, photo?: string ) => {
        await dispatch(UserThunks.loginUser({id:id, name:name, email:email, photo:photo || 'x'}))
        dispatch(UserThunks.syncToFirebase({id:id, name:name, email:email, photo:photo || 'x', provider}))
    }

    const registerWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!name) toast.error("Please enter name");
        if (!email) toast.error("Please enter email");
        if (!password) toast.error("Please enter password");
        if(name !== '' && email !== '' && password !== ''){
            try{
                const auth = getAuth(app);
                await createUserWithEmailAndPassword(auth, email, password).then(
                    async (userCredentialImpl) => {
                    //@ts-ignore - because _tokenResponse does exist
                    localStorage.setItem('token', userCredentialImpl._tokenResponse.refreshToken)
                    await setData(userCredentialImpl.user.uid, name, email, 'local')
                })
            }catch(error){
                onError(error as FirebaseError)
            }
        }
    }
    const registerWithGoogle = (e: React.MouseEvent) => {
        e.preventDefault()

        const db = getFirestore()
        const auth = getAuth(app);
        signUpWithGoogle(auth, db, setData)

    }
    const registerWithTwitter = (e: React.MouseEvent) => {
        e.preventDefault()

            const db = getFirestore()
            const auth = getAuth(app);
            signUpWithTwitter(auth, db, setData)

    }
    const registerWithGithub = (e: React.MouseEvent) => {
        e.preventDefault()
        const db = getFirestore()
        const auth = getAuth(app);
        signUpWithGitHub(auth, db, setData)
    }
    const cancel = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(closeModal) closeModal()
    }

    return (
    <form className={'modalContainer'} onSubmit={registerWithEmail} onReset={cancel}>
        <section className='modalTitleContainer'>
            <div className='flexHZContainer modalHR'>
                <h3 className='modalTitle'>
                    {t('modals:register:title')}
                </h3>
            </div>
            <hr className='modalHR'/>
        </section>
        <div className='modalContentContainer flexVTContainer'>
            <div className='modalContentSection flexVTContainer'>
                <h1 className='sectionTitle'>
                    {t('modals:register:subTitle')}
                    <hr/>
                </h1>
                <h1 className='sectionTitle'>
                    {t('common:email')}
                    <hr className='sectionHR'/>
                </h1>
                <input className={'modalTextInput textCenter'} value={email} type={'email'} autoComplete={'email'} onChange={(event) => setEmail(event.target.value)}/>

                <h1 className='sectionTitle'>
                    {t('common:password')}
                    <hr className='sectionHR'/>
                </h1>
                <input className={'modalTextInput textCenter'} autoComplete={'current-password'} value={password} type={'password'} onChange={(event) => setPassword(event.target.value)}/>
                <h1 className='sectionTitle'>
                    {t('common:name')}
                    <hr className='sectionHR'/>
                </h1>
                <input className='modalTextInput textCenter' value={name} autoComplete={'name'} type={'text'} onChange={(event) => setName(event.target.value)}/>
            </div>
            <div className="modalButtonContainer">
                <button className="addButton buttonWiden" type={"submit"}>
                    {t('buttons:register')}
                </button>
                <button className="addButton buttonWiden" type={"reset"}>
                    {t('buttons:cancel')}
                </button>
            </div>
            <div className='modalContentContainer flexVTContainer'>
                <h1 className='modalTitle textCenter'>
                    {t('modals:login:or')}
                </h1>
                <div className='modalContentSection flexVTContainer'>
                    <h1 className='sectionTitle'>
                        {t('modals:register:signUp')}
                        <hr/>
                    </h1>
                    <div>
                        <button type={'button'} className="addButton buttonWiden" onClick={registerWithGoogle}>
                            <FontAwesomeIcon icon={faGoogle} size={'1x'} color={'rgb(0,120,180)'}/>oogle
                        </button>
                        <button type={'button'} className="addButton buttonWiden" onClick={registerWithGithub}>
                            Github<FontAwesomeIcon icon={faGithub} size={'1x'} color={'rgb(255,255,255)'}/>
                        </button>
                        <button type={'button'} className="addButton buttonWiden" onClick={registerWithTwitter}>
                            <FontAwesomeIcon icon={faTwitter} size={'1x'} color={'rgb(125,180,255)'}/>Twitter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>

    );
}
