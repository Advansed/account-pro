import React from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from "@ionic/react";
import { Redirect, Route } from "react-router";
import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import Tab4 from "./pages/Tab4";
import { homeOutline, readerOutline, optionsOutline } from "ionicons/icons";

const MainTabs: React.FC = () => {

  let usl = "";let dom = "";
  
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/" to="/tab1/chart" />
        <Route path="/tab1/:name" component={ Tab1 } />
        <Route path="/tab2"       component={ Tab2 } />
        <Route path="/tab3"       component={ Tab3 } />        
        <Route path="/tab4"       component={ Tab4 } />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton class={ dom }  tab="tab1" href="/tab1/chart">
          <IonIcon icon={ homeOutline } />
          <IonLabel> Главная </IonLabel>
        </IonTabButton>
{/* 
        <IonTabButton class={ dom }  tab="tab2" href="/tab2">
          <IonIcon icon={ speedometerOutline } />
          <IonLabel> Счетчики </IonLabel>
        </IonTabButton> 
*/}
        <IonTabButton class={ usl } tab="tab4" href="/tab4">
          <IonIcon icon={ readerOutline } />
          <IonLabel> Услуги </IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon icon={ optionsOutline } />
          <IonLabel> Настройки </IonLabel>
        </IonTabButton> 
      </IonTabBar>
    </IonTabs>
  );
};

export default MainTabs;
