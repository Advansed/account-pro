import React, { useState, useEffect } from 'react';
import {IonPage, IonCard, IonIcon, IonButton, IonText, IonRow, IonCol, IonItem, IonHeader, IonToolbar, IonTitle, IonGrid, IonLabel, IonContent, IonLoading, IonInput, IonFab, IonFabButton, IonCardHeader } from '@ionic/react';
import './Tab1.css';
import { locationOutline, documentOutline, arrowBackOutline, add, homeSharp } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom'
import LineChart from "../components/chart"
import { Store, getData, t_address, getDatas, t_count } from '../Store';
import MaskedInput  from '../mask/reactTextMask'

import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

declare type Dictionary = {
  [key: string]: any;
};

interface i_hist {
  Сервис:     string,
  Месяц:      Array<string>,
  Показания:  Array<number>,
  Иконка:     string,
  Единица:    string,
}
const s_state : t_count = {
  ГУИД:       "",
  Счетчик:    "",
  Тип:        "",
  Показание:  0,
  Иконка:     "",
  Месяц:      "",
  Единица:    "",
}
const h_state: i_hist = {
  Сервис: "", 
  Иконка: "",
  Месяц: [],
  Показания: [],
  Единица: ""
} 

function year(){
  let date = new Date();
  let str = date.toISOString();
  return str.substr(0, 4);
}


interface i_kvit {
  Месяц: string;
}

const Tab1: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [ info,   setInfo]  = useState<Array<t_address>>([])
  const [ param,  setParam] = useState<object>();
  const [ hist,   setHist]  = useState<i_hist>(h_state);
  const [ page,   setPage]  = useState(0)
  const [ load,   setLoad]  = useState(false)
  const [ kvit,   setKvit]  = useState<Array<i_kvit>>([]);
  const [ upd,    setUpd]   = useState(0);
  const [serv,    setServ]  = useState<t_count>(s_state)

  let history = useHistory();

  let item : Dictionary = {"city": "Якутск"};  
  let  dict: Dictionary[] = []; dict.push(item);

  Store.subscribe_adr(()=>{
    setUpd(upd + 1);
  })

  useEffect(()=>{
    setInfo(Store.getState().Адреса);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upd])

  function CardCharts(props:{info}):JSX.Element {
    let info = props.info
    let elem = <></>
    for(let i = 0;i < info.length;i++){
      elem = <>
        { elem }
        <IonCard class="i-card-1">
          <IonItem class="item-1">
            <IonCol class="top-1">
              <IonRow>
                <IonText className="i-text-11 m-1"> Квартира </IonText>
              </IonRow>           
              <IonRow>
                <IonIcon icon={ locationOutline } />
                <IonText className="i-text-10"> { info[i].Адрес } </IonText>
              </IonRow>
              <IonRow>
                <IonIcon icon={ documentOutline } />
                <IonText className="i-text-10"> Лицевой счет { info[i].ЛС } </IonText>
              </IonRow>
            </IonCol>
            <img className="simv" slot="start" src="assets/simvol02.png" alt=""/>
          </IonItem>
          <LineChart info = { info[i].График }/>
          <IonRow>
            <IonCol>
              <IonButton class="i-but" expand="block" onClick={()=>{
                  setParam(info[i]);
                  history.push("/tab1/indices");
              }}>
                Показания
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton class="i-but" expand="block" onClick={()=>{
                setParam(info[i])
                history.push("/tab1/oplata")
              }}>Начисления</IonButton>
            </IonCol>
          </IonRow>
        </IonCard>
      </>
    }
    return elem;
  }

  function Indices(props:{info}):JSX.Element {
    
    let info = props.info;
    if(info === undefined) return <></>

    function getHist( ГУИД ){
      
      async function loaddata(){
        setLoad(true)
        let params = {
            Счетчик: ГУИД
        }
        let res = await getData("История", params)
        if(res.Код === 100) {
          setHist(res.Данные)
          setPage(1);
        } else {
          console.log(res);
        }
        setLoad(false);
      }
      loaddata();

    }
    
    let item = <></>;

    switch( page ){
      case 0: 
        for(let i = 0;i < info.Показания.length;i++){
          let Сервис = info.Показания[i]
          item = <>
            { item }
          <IonItem class="item-1">
          <IonGrid>
          <IonRow>
            <IonCol size="2"><IonIcon className="i-icon" src={ Сервис.Иконка } /></IonCol>
            <IonCol size="10">
              <IonRow> 
                <IonCol>
                  <IonText class="i-text-11"> { Сервис.Счетчик } </IonText>
                </IonCol>
              </IonRow>
              <IonRow> 
                <IonCol>
                  <IonText class="i-text-10"> Текущее показание </IonText> 
                  </IonCol><IonCol class="a-right">
                    <IonText class="i-text-12"> { Сервис.Показание + " " + Сервис.Единица }</IonText> 
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton fill="clear" expand="full" onClick={()=>{
                  getHist(Сервис.ГУИД)
              }}> История </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" onClick={()=>{
                setPage(2);setServ(Сервис);
                console.log(serv)
              }}> Внести показания </IonButton>
            </IonCol>
          </IonRow>
          </IonGrid>
        </IonItem>
        </>
        }; break;
      case 1:
        item = <></>
        for(let i = 0; i < hist.Месяц.length;i++){
          item = <>
            { item }
            <IonRow>
              <IonCol> <IonText class="i-text-11">{ hist.Месяц[i] } </IonText></IonCol>
              <IonCol class="a-right"> <IonText class="i-text-12">{ hist.Показания[i] + " " } {hist.Единица}</IonText></IonCol>
            </IonRow>
          </>
        }
        item =
        <IonItem class="item-1">
          <IonGrid>
            <IonRow>
              <IonCol size="2"><IonIcon className="i-icon" src={ hist.Иконка } /></IonCol>
              <IonCol size="10">
                <IonRow> 
                  <IonCol>
                    <IonText class="i-text-11"> { hist.Сервис } </IonText>
                  </IonCol>
                </IonRow>
                <IonRow> 
                  <IonCol>
                    <IonText class="i-text-10"> Расход за { hist.Месяц[0] } </IonText> 
                  </IonCol><IonCol class="a-right">
                    <IonText class="i-text-12"> { hist.Показания[0] + " " + hist.Единица}</IonText> 
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol><IonText> { year() } </IonText></IonCol>
            </IonRow>
            { item }
          </IonGrid>
        </IonItem>; break;
      case 2: 
        item =
      <IonItem class="item-1">
        <IonGrid>
          <IonRow>
            <IonCol size="2"><IonIcon className="i-icon" src={ serv.Иконка } /></IonCol>
            <IonCol size="10">
              <IonRow> 
                <IonCol>
                  <IonText class="i-text-11"> { serv.Счетчик } </IonText>
                </IonCol>
              </IonRow>
              <IonRow> 
                <IonCol>
                  <IonText class="i-text-10"> Текущее показание </IonText> 
                  </IonCol><IonCol class="a-right">
                  <IonText class="i-text-12"> { serv.Показание + " " + serv.Единица }</IonText> 
                </IonCol>
              </IonRow>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonLabel position="stacked"> Текущие показания счетчика</IonLabel>
            <IonRow>
              <IonCol>
                <IonInput class="ind-input" placeholder="0000000"
                  type="number"
                  onIonChange={(e)=>{
                        
                  }}
                />
              </IonCol>
            </IonRow>
          </IonRow>
            <IonRow>
              <IonCol size="8"></IonCol>
              <IonCol size="4">
                <IonButton expand="block">Внести</IonButton>
              </IonCol>
            </IonRow>

        </IonGrid>
      </IonItem>

      
      break;
  }

    let elem = 
      <IonCard>
        <IonItem class="item-1">
          <IonCol class="top-1">
            <IonRow>
              <IonText className="i-text-11 m-1"> Первый дом </IonText>
            </IonRow>           
            <IonRow>
              <IonIcon icon={ locationOutline } />
              <IonText className="i-text-10"> { info.Адрес } </IonText>
            </IonRow>
            <IonRow>
              <IonIcon icon={ documentOutline } />
              <IonText className="i-text-10"> { info.ЛС } </IonText>
            </IonRow>
          </IonCol>
          <img className="simv" slot="start" src="assets/simvol02.png" alt=""/>
        </IonItem>
        { item }
      </IonCard>

    return elem;
  }

  function Oplata(props:{info}):JSX.Element{

    let info = props.info;
    let item = <></>;

    switch( page ){
      case 0: 
        item = <>

          <IonItem>
              <IonText class="i-text-10">Жилищно-коммунальные услуги</IonText>
              <IonCol size="3" slot="end" class="a-right"><IonText class="i-text-12">1120.00 руб</IonText></IonCol>
          </IonItem>

          <IonRow>
            <IonCol>
              <IonButton fill="clear" expand="full" onClick={()=>{
                setPage(1)
              }}>Квитанции</IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" onClick={()=>{
                  setPage(2)
              }}>Пополнить</IonButton>
            </IonCol>
          </IonRow>
        </>
      break;
      case 1: 
        for(let i = 0; i < kvit.length;i++){
          item = <>
            { item }
            <IonRow>
              <IonCol size="8">
                <IonText class="i-text-11">{ kvit[i].Месяц }</IonText>
              </IonCol>
              <IonCol size="1"> <IonIcon class="i-icon" src="assets/icon/icon156.svg"/></IonCol>
              <IonCol size="3">      
                <IonText class="i-text-12">открыть</IonText>
              </IonCol>
            </IonRow>   
          </>      
        }
        item = <>
          <IonRow><IonCol><IonText class="i-text-11"> {year()}</IonText></IonCol></IonRow>
          { item }
        </>
      break;
      case 2: 
        item = <>
          <IonItem>
            <IonLabel position="stacked"> без учета комиссии </IonLabel>
            <IonRow>
              <IonCol>
                <IonInput
                  className="ind-input-2"                  
                  type="number"
                  maxlength={ 5 }
                  max="15000"
                  placeholder="15000"
                >

                </IonInput>
              </IonCol>
            </IonRow>
          </IonItem>
          <IonRow>
            <IonCol>
              <IonButton expand="block">Перейти к оплате</IonButton>
            </IonCol>
          </IonRow>
        </>
      break;
    }

    let elem = 
      <IonCard>
        <IonItem class="item-1">
          <IonCol class="top-1">
            <IonRow>
              <IonText className="i-text-11 m-1"> Первый дом </IonText>
            </IonRow>           
            <IonRow>
              <IonIcon icon={ locationOutline } />
              <IonText className="i-text-10"> { info.Адрес } </IonText>
            </IonRow>
            <IonRow>
              <IonIcon icon={ documentOutline } />
              <IonText className="i-text-10"> { info.ЛС } </IonText>
            </IonRow>
          </IonCol>
          <img className="simv" slot="start" src="assets/simvol02.png" alt=""/>
        </IonItem>
        { item }
        
      </IonCard>

    return elem;


    return elem;
  }
  
  function getStreet(value){
    let street = "";

    if(value.street !== null)
      return value.street;

    if(value.settlement !== null)
      return value.settlement;

    return street;
  }

  function getHome(value){
    if(value.house !== null)
      return value.house
    return ""
  }

  function getCorpus(value){
    if(value.block !== null)
      return value.block
    return ""
  }

  function getKv(value){
    if(value.flat !== null)
      return value.flat
    return ""
  }

  function Personal():JSX.Element{
   const [city,   setCity] = useState("");
   const [street, setStreet] = useState("")
   const [home,   setHome] = useState("")
   const [corpus, setCorpus] = useState("")
   const [kv,     setKV] = useState("")
   const [ls,     setLC] = useState("")

    return <>
      <IonCard class = "i-card-1">

        <IonCardHeader class="a-center">
            <IonText class="l-text-4">Пожалуйста, укажите ваш л/с</IonText>
        </IonCardHeader>
  
        <IonText class="m-left">ЛИЦЕВОЙ СЧЕТ</IonText>      
        <IonItem class="item-2">
            <IonInput class="input-3" placeholder="1234977" type="number" onIonChange={(e)=>{
              setLC(e.detail.value as string)
            }}>
            </IonInput>
        </IonItem>
        <IonRow><IonCol>
            <IonButton expand="block" onClick={()=>{
              getLC({ЛС: ls});  
            }}>Найти по ЛС</IonButton>
        </IonCol></IonRow>   
      </IonCard>
      <IonCard class = "i-card-1">

        <IonCardHeader class="a-center">
            <IonText class="l-text-4">или укажите ваш адрес</IonText>
        </IonCardHeader>
  

        
        <IonText class="m-left">АДРЕС</IonText>
        <IonRow><IonCol>

                <AddressSuggestions 
                  // ref={suggestionsRef} 
                  token="23de02cd2b41dbb9951f8991a41b808f4398ec6e"
                  filterLocations ={ dict }
                  hintText = { "г. " + dict[0].city }
                  onChange={(e)=>{
                    if(e !== undefined){
                      Store.dispatch({type: "addr", addr: e.value})
                      setCity( e.data.city as string );
                      setStreet( getStreet(e.data) );
                      setHome( getHome(e.data) )
                      setCorpus( getCorpus(e.data) )
                      setKV( getKv(e.data) )
                    }
                  }}
              
              />
        </IonCol></IonRow>
        <IonItem class="item-2">
            <IonInput class="input-3" placeholder="Город" disabled={ true }>
              { city }
            </IonInput>
        </IonItem>
        <IonItem class="item-2" >
            <IonInput class="input-3" placeholder="Улица" disabled={ true }> 
              { street }
            </IonInput>
        </IonItem>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonInput class="input-3" placeholder="Дом" disabled={ true }> 
                { home }
              </IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
          <IonItem>
              <IonInput class="input-3" placeholder="Корпус" disabled={ true }> 
                { corpus }
              </IonInput>
            </IonItem>
          </IonCol>
          <IonCol>
          <IonItem>
              <IonInput class="input-3" placeholder="Квартира" disabled={ true }> 
                { kv }
              </IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow><IonCol>
            <IonButton expand="block" onClick={()=>{
              getLC({Город: city, Улица: street, Дом: home, Корпус: corpus, Квартира: kv}); 
            }}>Найти по адресу</IonButton>
        </IonCol></IonRow>   
      </IonCard>   
    </>
  }

  function Pages(props:{info}):JSX.Element{

    switch(props.info){
       case "chart":    return  <CardCharts info = { info }/>
       case "indices":  return  <Indices    info = { param }/>
       case "oplata":   return  <Oplata     info = { param }/>
       case "personal": return  <Personal   />
       default :        return  <></>
    }

  }


  function BackButton():JSX.Element{

    let elem = <>
    </>

    if( name !== "chart"){
      elem = 
      <IonButton slot = "start" fill="clear" onClick={()=>{
        if(page > 0){
          setPage(0);
        } else {
          history.push("/tab1/chart");
        }
      }}>
        <IonIcon icon={ arrowBackOutline } slot="icon-only" />
      </IonButton>
    }

    return elem
  }

  async function getLC(params){
    params.Телефон = Store.getState().Логин.Телефон
    let res = await getData("Адрес", params);
    if(res.Код === 100){
      getDatas();
      history.push("/tab1/chart")

    } else {

    }
  } 

  return (
    <IonPage>
      <IonLoading isOpen={ load } />
      <IonHeader>
        <IonToolbar>
          <IonTitle class="header"> { "Главная" } </IonTitle>
          <BackButton />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Pages info = { name } />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
