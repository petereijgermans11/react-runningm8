import {getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, {useState} from 'react';

import {UserThunks} from "../../store/user";
import {useAppDispatch} from "../../store";
import { getFirestore } from 'firebase/firestore';

import {app, onError, signInWithGitHub, signInWithGoogle, signInWithTwitter} from "../../firebase";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faGoogle, faTwitter} from "@fortawesome/free-brands-svg-icons";
import { FirebaseError } from 'firebase/app';
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";

export function LoginModal({closeModal}:{closeModal?: Function}) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useAppDispatch()
    const { t } = useTranslation();
    const cancel = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(closeModal) closeModal()
    }
    const setData = async (id: string) => {
        dispatch(UserThunks.loadFromFirebase(id))
    }
    const loginWithEmailAndPassWord = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email) toast.error("Please enter email");
        if (!password) toast.error("Please enter password");
        try{
            const auth = getAuth()
            signInWithEmailAndPassword(auth, email, password)
                .then(async (response) => {
                    //@ts-ignore -- because _tokenResponse actually exists
                    localStorage.setItem('token', response._tokenResponse.refreshToken)
                    await setData(response.user.uid)
                }).catch((error) => {
                    console.log(error)
                    onError(error as FirebaseError)
            })
        }catch(error){
            onError(error as FirebaseError)
        }
    }

    const loginWithGoogle = (e: React.MouseEvent) => {
        e.preventDefault()
        const db = getFirestore()
        const auth = getAuth(app);
        signInWithGoogle(auth, db, setData)
    }
    const loginWithTwitter = (e: React.MouseEvent) => {
        e.preventDefault()
        const db = getFirestore()
        const auth = getAuth(app);
        signInWithTwitter(auth, db, setData)
    }
    const loginWithGithub = (e: React.MouseEvent) => {
        e.preventDefault()
        const db = getFirestore()
        const auth = getAuth(app);
        signInWithGitHub(auth, db, setData)
    }
    return (
        <form className="modalContainer"
              onSubmit={loginWithEmailAndPassWord}
              onReset={cancel}>
            <section className='modalTitleContainer'>
                <div className='flexHZContainer modalHR'>
                    <h3 className='modalTitle'>
                        {t('modals:login:title')}
                    </h3>
                </div>
                <hr className='modalHR'/>
            </section>
            <div className='modalContentContainer flexVTContainer'>
                <div className='modalContentSection flexVTContainer'>
                    <h1 className='sectionTitle'>
                        {t('modals:login:subTitle')}
                        <hr/>
                    </h1>
                    <h1 className='sectionTitle'>
                        {t('common:email')}
                        <hr className='sectionHR'/>
                    </h1>
                    <input className={'modalTextInput textCenter'}
                           value={email}
                           type={'email'}
                           autoComplete={'email'}
                           onChange={(event) => setEmail(event.target.value)}/>
                    <h1 className='sectionTitle'>
                        {t('common:password')}
                        <hr className='sectionHR'/>
                    </h1>
                    <input
                        autoComplete={'current-password'}
                        className={'modalTextInput textCenter'}
                        value={password}
                        type={'password'}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <div className="modalButtonContainer">
                        <button className="addButton buttonWiden" type={"submit"}>
                            {t('buttons:login')}
                        </button>
                        <button className="addButton buttonWiden" type={"reset"}>
                            {t('buttons:cancel')}
                        </button>
                    </div>
                </div>
                <div className='modalContentContainer flexVTContainer'>
                    <h1 className='modalTitle textCenter'>
                        {t('modals:login:or')}
                    </h1>
                    <div className='modalContentSection flexVTContainer'>
                        <h1 className='sectionTitle'>
                            {t('modals:login:signIn')}
                            <hr/>
                        </h1>
                        <div>
                            <button type={'button'}
                                    className="addButton buttonWiden"
                                    onClick={loginWithGoogle}>
                                <FontAwesomeIcon
                                    icon={faGoogle}
                                    size={'1x'}
                                    color={'rgb(0,120,180)'}
                                />oogle
                            </button>
                            <button type={'button'}
                                    className="addButton buttonWiden"
                                    onClick={loginWithGithub}>
                                Github<FontAwesomeIcon icon={faGithub}
                                                       size={'1x'}
                                                       color={'rgb(255,255,255)'}
                                />
                            </button>
                            <button type={'button'} className="addButton buttonWiden"
                                    onClick={loginWithTwitter}>
                                <FontAwesomeIcon icon={faTwitter}
                                                 size={'1x'}
                                                 color={'rgb(125,180,255)'}
                                />Twitter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
