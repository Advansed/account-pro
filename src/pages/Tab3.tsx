import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle
  , IonCardContent, IonItem, IonLabel, IonInput, IonText, IonIcon, IonGrid, IonRow, IonCol, IonAlert, IonLoading, IonButton } from '@ionic/react';
import './Tab3.css';
import { Store, getData, getDatas, connect } from '../Store';
import { personOutline, homeOutline, addCircleOutline } from 'ionicons/icons';

//import { useHistory } from 'react-router-dom'
//import { add } from 'ionicons/icons';



const Tab3: React.FC = () => {
    const [ showAlert1, setShowAlert1] = useState(false);
    const [ load, setLoad ] = useState(false)
//  const [ FAB,    setFAB]   = useState(false);
//  let history = useHistory();

  function BackButton():JSX.Element{

    let elem = <>
    </>


  return elem
  }

  function Cards(props:{info}):JSX.Element{ 
    let info = props.info;
    let item = <></>;
    for(let i = 0; i < info.length;i++){
      item = <>
        { item }
          <IonRow class="top-margin-1">
            <IonCol size="2">
              <IonIcon class="o-icon-1" icon = { homeOutline } />  
            </IonCol>
            <IonCol size="10">
              <IonText> Квартира </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="b-bottom-1">
              <IonText class="o-text-2"> { info[i].ЛС + ", " + info[i].Адрес} </IonText>
            </IonCol>
          </IonRow>
      </>
    }

    let elem = <>
    <IonCard>
      <IonCardContent>
        <IonGrid>
          { item }
          <IonRow class="top-margin-1">
            <IonCol size="2">
              <IonIcon class="o-icon-1" icon = { addCircleOutline } />  
            </IonCol>
            <IonCol size="10" onClick={()=>{
              setShowAlert1(true);
            }}>
              <IonText> Добавить лицевой счет </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  </>

  return elem
  }

  function Person():JSX.Element{
    let elem = <>
      <IonCard>
        <IonCardContent>
          <IonItem>
            {/* <IonThumbnail slot="start"> */}
              <IonIcon slot= "start" icon={ personOutline }></IonIcon>
            {/* </IonThumbnail> */}
            <IonLabel position="stacked">Телефон</IonLabel>
              <IonText>{ Store.getState().Логин.Телефон }</IonText>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">ФИО</IonLabel>
            <IonInput placeholder="Иван Иванович Иванов" value = { Store.getState().Логин.ФИО }
              onIonChange={(e)=>{
                Store.dispatch({type:"login", ФИО: e.detail.value})
              }}

              onIonBlur={()=>{
                getData("Регистрация", Store.getState().Логин);
              }}
            >

            </IonInput>
          </IonItem>
        </IonCardContent>
      </IonCard>
  </>;
  return elem
  }

  async function getLC(params){
    setLoad(true);
    params.Телефон = Store.getState().Логин.Телефон
    let res = await getData("Адрес", params);
    if(res.Код === 100){
      getDatas();
      setLoad(false);
    } else {
      setLoad(false);
    }
  } 

  return (
    <IonPage>
      <IonLoading isOpen={ load } />
      <IonHeader>
        <IonToolbar>
          <IonTitle class="a-center"> Настройка </IonTitle>
          <BackButton />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonText class="o-text-1">ВЛАДЕЛЕЦ</IonText>    
        <Person />
        <IonText class="o-text-1">ЛИЦЕВЫЕ СЧЕТА</IonText>    
        <Cards info = { Store.getState().Адреса }/>

        <IonButton
          onClick = {()=>{
            connect();
          }}
        >

          connect
        </IonButton>
      </IonContent>

      <IonAlert
          isOpen={ showAlert1 }
          onDidDismiss={() => setShowAlert1(false)}
          cssClass='my-custom-class'
          header={'Добавить ЛС'}
          inputs={[
            {
              name: 'ls',
              type: 'text',
              placeholder: 'Лицевой счет'
            },
          ]}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {

              }
            },
            {
              text: 'Ok',
              handler: (data) => {
                getLC({ЛС: data.ls});  
              }
            }
          ]}
        />

    </IonPage>
  );
};

export default Tab3;
