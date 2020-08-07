import React, { useState, useLayoutEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonButton, IonIcon, IonList, IonItem
    , IonText, IonLabel, IonInput, IonRow, IonGrid, IonTextarea, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import './Tab4.css';
import MaskedInput  from '../mask/reactTextMask'
import { constructOutline, arrowBackOutline } from 'ionicons/icons';
import { Store, getData } from '../Store';


import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

declare type Dictionary = {
    [key: string]: any;
  };
  
interface t_info {
    Услуга:     string,
    Телефон:    string,
    Адрес:      string,
    Описание:   string,
    Статус:     string,
    Дата:       string,
}

const t_state : Array<t_info> = [
    {
          Услуга:   "Услуги разнорабочего"
        , Телефон:  "+79142227300"
        , Адрес:    "Горького 100 кв 1А"
        , Описание: "Течет кран"
        , Статус:   "В ожидании"   
        , Дата:     "20.06.2020"
    },
    {
        Услуга:   "Услуги сантехника"
      , Телефон:  "+79142227300"
      , Адрес:    "Горького 100 кв 1А"
      , Описание: "Течет кран"
      , Статус:   "Оказана"   
      , Дата:     "20.06.2020"
    },
    {
        Услуга:   "Услуги электрика"
      , Телефон:  "+79142227300"
      , Адрес:    "Горького 100 кв 1А"
      , Описание: "Течет кран"
      , Статус:   "Отменено"   
      , Дата:     "20.06.2020"
  }
]

const Tab4: React.FC = () => {
    const [page, setPage] = useState(0);
    const [info, setInfo] = useState<Array<t_info>>(t_state);
    const [serv, setServ] = useState<any>();


    let item : Dictionary = {"city": "Якутск"};  
    let  dict: Dictionary[] = []; dict.push(item);

// Store.subscribe(()=>{
//     setInfo(t_state)
// })

function    Page1():JSX.Element {
    let item = <></>
    let txt = <></>
    for(let i = 0; i < info.length; i++){
        if(info[i].Статус === "В ожидании")
            txt = <IonText class="i-text-1">    { info[i].Статус }</IonText>
        if(info[i].Статус === "Оказана")
            txt = <IonText class="i-text-11">   { info[i].Статус }</IonText>
        if(info[i].Статус === "Отменено")
            txt = <IonText class="i-text-111">  { info[i].Статус }</IonText>
        item = <>
            { item }
            <IonItem class="item-1" detail={ false } lines="none" onClick={()=> {}}>
                <img className="i4-icon" src="assets/serv01.svg" slot="start" alt="" /> 
                <IonGrid>
                    <IonRow>
                        <IonText class="b-text">
                            { info[i].Услуга }
                        </IonText>
                    </IonRow>
                    <IonRow>
                        { txt }
                    </IonRow>
                    <IonRow>
                        <IonText class="i-text-2">
                            { info[i].Дата }
                        </IonText>
                    </IonRow>
                </IonGrid>
            </IonItem>
        </>
    }
    let elem = <>
    <IonCard>
        <IonItem class="item-1" detail={ true } lines="none" onClick={()=> setPage(1)}>
            <IonIcon class="b-icon" icon = { constructOutline } slot="start" />  
            <IonText class="b-text">
                Закажите новую услугу
            </IonText>
        </IonItem>
    </IonCard>
    <IonText class="text-1">МОИ ЗАЯВКИ</IonText>
    <IonCard>
        { item }
    </IonCard>
    </>
    return elem;
}

function    Page2():JSX.Element {
    let usl = Store.getState().Услуги

    let item = <></>
    for(let i = 0;i < usl.length;i++){ 
        if(usl[i].Роль !== "Пользователь") continue
        item = <>
            { item }
            <IonItem class="item-1" detail={ true } lines="none" onClick={()=>{
                    setPage(2);setServ( usl[i] )
                }}>
                    <img className="i4-icon" src={ usl[i].Иконка } slot="start" alt="" />
                    <IonText class="b-text">
                        { usl[i].Наименование }
                    </IonText>
            </IonItem>            
        </>    
    }
    let elem = <>
        <IonCard class="p-15">
            <IonList>
                { item }
            </IonList>
        </IonCard>
    </>
    return elem;
}

function    Page3():JSX.Element {

    Store.dispatch({type: "phone", phone: Store.getState().Логин.Телефон})
  
    let elem = <>
      <IonCard>
          <IonCardHeader>
            <IonToolbar class="a-center">
                <img className="i4-icon" src={ serv?.Иконка } slot="start" alt="" />   
                <IonCardTitle>  { serv?.Наименование } </IonCardTitle>
            </IonToolbar>
          </IonCardHeader>
        <IonList class="p-15">

            <IonItem class="item-1">
                <IonLabel position="stacked">Телефон</IonLabel>  
    
                <MaskedInput
                      mask={['+', /[1-9]/, ' ','(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-',/\d/, /\d/]}
                      className="m-input"
                      autoComplete="off"
                      placeholder="+7 (914) 000-00-00"
                      id='1'
                      type='text'
                      value = { Store.getState().phone }
                      onChange={(e: any) => {
                        Store.dispatch({type: "phone", phone:(e.target.value as string)})
                      }}
                />
  
            </IonItem>
            <IonLabel class="h-margin" >Адрес</IonLabel>
              <AddressSuggestions 
                  token="23de02cd2b41dbb9951f8991a41b808f4398ec6e"
                  filterLocations ={ dict }
                  hintText = { "г. Якутск" }
                  onChange={(e)=>{
                    if(e !== undefined)
                      Store.dispatch({type: "addr", addr: e.value})
                  }}
              
              /> 
            <IonItem class="item-1">
                <IonLabel position="floating">Примечание </IonLabel>  
                <IonTextarea 
                  // value= {  }
                  placeholder="Примечания..."
  
                  onIonChange={(e)=>{
                    Store.dispatch({type: "descr", descr:(e.detail.value as string)})
                }}></IonTextarea>
            </IonItem>
                <IonButton expand="block" onClick={()=>{
                   createDoc();        
                }}>
                    
                    Отправить
                </IonButton>
        </IonList>
      </IonCard>
    </>;
    return elem;
  }
  
  async function  createDoc(){

    let phone = Store.getState().phone
    let addr = Store.getState().addr
    let descr = Store.getState().descr
  
    if(phone === "" || addr === ""){
      return
    }
  
    let params = { 
        Пользователь:   Store.getState().Логин.ГУИД,
        Телефон:        phone,
        Адрес:          addr,
        Услуга:         serv.ГУИД,
        Тариф:          serv.Тариф,
        Описание:       descr
    }
  
    let res = await getData("У_Заявка", params)
  
    if(res.Код === 100){
      Store.dispatch({type: "add_doc", data: res.Данные})
    } 
    if(res.Код === 101){
      Store.dispatch({type: "upd_doc", data: res.Данные})
   
    } 
    setPage(0);  
  
    Store.dispatch({type: "phone", phone: ""})
    Store.dispatch({type: "descr", descr: ""})
    Store.dispatch({type: "addr",  addr: ""})

  }
  

function Pages():JSX.Element {
    let elem = <></>
   
    switch( page ){
        case 0:return <Page1 />
        case 1:return <Page2 />
        case 2:return <Page3 />
    }
    return elem
}

function BackButton():JSX.Element{

    let elem = <>
    </>
  
    if( page !== 0){
      elem = 
      <IonButton slot = "start" fill="clear" onClick={()=>setPage(0)}>
        <IonIcon icon={ arrowBackOutline } slot="icon-only" />
      </IonButton>
    }
  
    return elem
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="a-center"> Услуги </IonTitle>
          <BackButton />
        </IonToolbar>
      </IonHeader>
      <IonContent>

          <Pages />
       
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
