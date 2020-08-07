import React, { useState, useContext } from "react";
import {
  IonPage,  IonText,  IonRow,  IonCol,  IonImg,  IonButton,  IonSlides,  IonSlide,  IonGrid,
  IonContent,  IonIcon,  IonItem,  IonFab,  IonFabButton, IonLoading, IonAlert, IonInput
} from "@ionic/react";
import { UserContext } from "./App";
import "./Login.css"
import { arrowBackOutline, arrowForwardOutline, backspaceOutline } from "ionicons/icons";
import MaskedInput from "./mask/reactTextMask"
import { Store, getData, getDatas } from "./Store";


const Login: React.FC = () => {
    const [load,    setLoad]    = useState(false);
    const [s_a1,    setAlert1]  = useState(false);
    const [pas1,    setPas1]    = useState(false);    
    const [sms,     setSMS]     = useState(false);    
    const [l_e1,    setLogErr]  = useState(false);
    const [page,    setPage]    = useState(0);
    const [pass,    setPass]    = useState("")


    const slideOpts = {
    initialSlide: 0,
    speed: 400
  };

const user = useContext(UserContext);


function    Pages(props:{page: number}):JSX.Element{
    let page = props.page;
    switch(page){
        case 0: return<Page1 />        
        case 1: return<Page2 sms={ sms }/>        
        case 2: return<Page3 />
        default: return <></>
    }

    // switch(name){
    //     case "page1": return <Page1 />
    //     case "page2": return <Page2 sms = { sms } />
    //     case "page3": return <Page3 />
    //     default: return <></>
    // }

}

function    Page1():JSX.Element {


    function    Slide1():JSX.Element{
        let elem = <>
        <IonGrid>
            <IonRow><IonCol class="col-1">
                <IonText class= "l-text-1">
                    Контролируй финансы
                </IonText> 
            </IonCol></IonRow>
            <IonRow><IonCol>
                <IonText class="l-text-2">
                    Управляй расходами дома в один клик с мобильного приложения
                </IonText>
            </IonCol></IonRow>
            <IonRow><IonCol>
                <IonImg src="./assets/Mask1@2x.png"/>  
            </IonCol></IonRow>
        </IonGrid>
        </>

        return elem
    }

    function    Slide2():JSX.Element{
        let elem = <>
        <IonGrid>
            <IonRow><IonCol class="col-1">
                <IonText class= "l-text-1">
                    Оплата квитанций
                </IonText> 
            </IonCol></IonRow>
            <IonRow><IonCol>
                <IonText class="l-text-2">
                    Оплачивайте ЖКУ и взносы в фонд капитального ремонта
                </IonText>
            </IonCol></IonRow>
            <IonRow><IonCol>
                <IonImg src="./assets/Mask2@2x.png"/>  
            </IonCol></IonRow>
        </IonGrid>
        </>

        return elem
    }

    function    Slide3():JSX.Element{
        let elem = <>
        <IonGrid>
            <IonRow><IonCol class="col-1">
                <IonText class= "l-text-1">
                    Заказывайте услуги
                </IonText> 
            </IonCol></IonRow>
            <IonRow><IonCol>
                <IonText class="l-text-2">
                    Закажите любого специалиста прямо в приложении
                </IonText>
            </IonCol></IonRow>
            <IonRow><IonCol>
                <IonImg src="./assets/Mask3@2x.png"/>  
            </IonCol></IonRow>
        </IonGrid>
        </>

        return elem
    }

    let elem = <>

            <IonSlides pager={true} options={slideOpts}>

                <IonSlide>
                    <Slide1 />
                </IonSlide>
                <IonSlide>
                    <Slide2 />
                </IonSlide>
                <IonSlide>
                    <Slide3 />
                </IonSlide>
                       
            </IonSlides>                      

            <IonRow><IonCol>
                <IonButton expand="block" onClick={()=>{
                    setPage(1)
                }}>Войти</IonButton>         
            </IonCol></IonRow>       

    </>

    return elem;
}

function    Page2(props:{sms: boolean}):JSX.Element {

    let pass_word = <></>;
    if(pas1) {
        pass_word = <>
            <IonItem>
                <IonInput 
                    type="password" 
                    placeholder="Пароль"
                    onIonChange={(e)=>{
                        Store.dispatch({type: "login", Пароль1: (e.detail.value as string)})
                    }}
                >
                </IonInput>
            </IonItem>
        </>

        if(props.sms) {
            pass_word = <>
                <IonItem>
                    <IonInput 
                        type="password" 
                        placeholder="Пароль"
                        onIonChange={(e)=>{
                            Store.dispatch({type: "login", Пароль: (e.detail.value as string)})
                        }}
                    >
                    </IonInput>
                </IonItem>
                <IonItem>
                    <IonInput 
                        type="password" 
                        placeholder="Подтверждение пароля"
                        onIonChange={(e)=>{
                            Store.dispatch({type: "login", Пароль1: (e.detail.value as string)})
                        }}
                    >
                    </IonInput>
                </IonItem>
            </>
        }
    }

    let phone = localStorage.getItem("ANRGARBAGE_phone");
    if(phone !== undefined) Store.dispatch({type:"login", Телефон: phone})
    let elem = <>
        <IonRow>
            <IonIcon class="icon-1" icon={ arrowBackOutline } onClick={()=>{
                setPage(0)
            }}>
            </IonIcon>
        </IonRow>
        <IonRow>
            <IonText class="l-text-3">Добро пожаловать</IonText>
        </IonRow>        
        <IonRow>
            <IonText class="l-text-4">Пожалуйста, введите свой номер телефона</IonText>
        </IonRow>
        <IonRow><IonCol>
            <IonItem>
                <MaskedInput
                    mask={['+', ' ', /[1-9]/, '(', /\d/, /\d/, /\d/, ')', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                    className="m-input"
                    id='1'
                    value={ Store.getState().Логин.Телефон }
                    placeholder = "+7 (914) 222-22-22"
                    type='text'
                    onChange={(e) => {
                        Store.dispatch({type:"login", Телефон: (e.target.value as string)})
                        setPas1(false);setSMS(false);
                    }}
                />
            </IonItem>
            { pass_word }
        </IonCol></IonRow>
        <IonRow><IonCol>
            <IonButton expand="block" onClick={()=>{
                Auth()
            }}>Далее</IonButton>
        </IonCol></IonRow>      
    </>

    return elem;
}

function    Page3():JSX.Element {
    let elem = <>
        <IonRow>
            <IonIcon class="icon-1" icon={ arrowBackOutline } onClick={()=>{
                setPage(1)
            }}>
            </IonIcon>
        </IonRow>
        <IonRow>
            <IonText class="text-3">Введите код</IonText>
        </IonRow>
        <IonRow>
            <IonText class="text-4">Мы вам отправили СМС с кодом на ваш номер</IonText>
        </IonRow>
        <IonRow>
            <IonCol size="3">
                <IonItem>  
                    <IonText>{ pass.substr(0, 1) }</IonText>          
                </IonItem>
            </IonCol>
            <IonCol size="3">
                <IonItem>  
                    <IonText>{ pass.substr(1, 1) }</IonText>          
                </IonItem>
            </IonCol>
            <IonCol size="3">
                <IonItem>  
                    <IonText>{ pass.substr(2, 1) }</IonText>          
                </IonItem>
            </IonCol>
            <IonCol size="3">
                <IonItem>  
                    <IonText>{ pass.substr(3, 1) }</IonText>          
                </IonItem>
            </IonCol>
        </IonRow>
        <IonRow>
            <IonText class="text-5 t-under">Отправить новый код</IonText>
        </IonRow>  

        <IonRow>
            <IButton info={ "1" } /><IButton info={ "2" } /><IButton info={ "3" } />
        </IonRow>    
        <IonRow>
            <IButton info={ "4" } /><IButton info={ "5" } /><IButton info={ "6" } />
        </IonRow>    
        <IonRow>
            <IButton info={ "7" } /><IButton info={ "8" } /><IButton info={ "9" } />
        </IonRow>    
        <IonRow>
            <IonCol></IonCol>
            <IButton info={ "0" } />
            <IonCol>
                <IonButton fill="clear" onClick={()=>{
                    let pos  = pass.length;
                    setPass(pass.substr(0, pos - 1));
                }}>
                    <IonIcon slot="icon-only" icon={ backspaceOutline }></IonIcon>
                </IonButton>
            </IonCol>
        </IonRow>   

        <IonFab vertical="center" horizontal="end" slot="fixed" onClick={()=>{
         //   user.setIsLoggedIn(true);
            let СМС = Store.getState().Логин.СМС
            if(pass === СМС){
                setSMS(true);setPas1(true)
                setPage(1);            
            } else { setPass("")}
        }}>
          <IonFabButton>
            <IonIcon icon={ arrowForwardOutline } />
          </IonFabButton>
        </IonFab>
 
    </>

    return elem;
}

function    IButton(props:{info: string}):JSX.Element {
    let info = props.info;
    let elem = <>
        <IonCol onClick={()=>{
            let l = pass.length;
            if(l < 5) setPass(pass + info)
        }}>
            <IonItem> { info } </IonItem>
        </IonCol>
        
    </>

    return elem;
}

async function Auth(){
    let login =     Store.getState().Логин
    let phone =     login.Телефон;

    setLoad(true);
    
    if(phone === "" || phone.indexOf('_') > -1) {
        setAlert1(true);
        setLoad(false);
    } else {
        let params = {};
        if(pas1){
            if(sms) {
                Store.dispatch({type:"auth", auth: true})
                params = { 
                    Телефон: phone,
                    Пароль:  login.Пароль,  
                }
                let res = await getData("Регистрация", params)
                if(res.Код === 101){
                    Store.dispatch({type: "login", 
                          Телефон:  res.Данные.Телефон
                        , Пароль:   res.Данные.Пароль
                        , ГУИД:     res.Данные.ГУИД
                    })
                    getDatas();
                    setLoad(false); 
                    user.setIsLoggedIn(true);
                
                } else {
                    Store.dispatch({type:"auth", auth: false});
                    setLogErr(true)
                    setLoad(false);
                }
            } else {
                
                if(login.Пароль === login.Пароль1){        
                    Store.dispatch({type:"auth", auth: true})          
                    user.setIsLoggedIn(true); 
                } else setPage(1)
                setLoad(false);
            }
        } else {
            params = { 
                Телефон:    phone
            }
            localStorage.setItem("ANRGARBAGE_phone", phone);
            let res = await getData("Авторизация", params)
            if(res.Код === 101){
                Store.dispatch({type: "login", 
                      Телефон:  res.Данные.Телефон
                    , Пароль:   res.Данные.Пароль
                    , ГУИД:     res.Данные.ГУИД
                })

                getDatas();
                setPas1(true);
            };
            if(res.Код === 102) {
                Store.dispatch({type: "login", СМС: res.СМС})
                setPage(2);
            }
            setLoad(false);
        }

    }
}

return (
    <IonPage>
        <IonLoading isOpen={ load }/>
        <IonContent class="i-content">          
            <Pages page={ page } />


        </IonContent>

        <IonAlert
          isOpen={ s_a1 }
          onDidDismiss={() => setAlert1(false)}
          cssClass='my-custom-class'
          header={'Ошибка'}
          subHeader={'Телефон не заполнен'}
          buttons={['OK']}
        />

        <IonAlert
          isOpen={ l_e1 }
          onDidDismiss={() => setLogErr(false)}
          cssClass='my-custom-class'
          header={'Ошибка'}
          subHeader={'Не удалость авторизоваться'}
          buttons={['OK']}
        />
    </IonPage>
  );
};

export default Login;
