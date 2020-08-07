import { combineReducers  } from 'redux'
import axios from 'axios'
// import sha1 from 'crypto-js/sha1';
// import hmacSHA512 from 'crypto-js/hmac-sha512';
// import Base64 from 'crypto-js/enc-base64';
 


export      async function getData(method : string, params){

    let user = "Админ"
    let password = "1234"

    let res = await axios.post(
        URL + method,
        params,
        {
            auth: {
                username: unescape(encodeURIComponent(user)),
                password: unescape(encodeURIComponent(password))
            }
        } 
        ).then(response => response.data)
        .then((data) => {
            if(data.Код === 200) console.log(data) 
            return data
        }).catch(error => {
          console.log(error)
          return {Код: 200}
        })
    return res

}

export      async function connect(){

    let params
    params = {
        AMOUNT:     "100.00",
        CURRENCY:   "RUB",
        ORDER:      "1",
        DESC:       "Тестовая оплата",
        MERCH_NAME: "ACCOUNTPRO",
        MERCH_URL:  "http://www.account-pro.ru",
        MERCHANT:   "000000000056020",
        TERMINAL:   "00056020",
        EMAIL:      "atlasov.n.r@gmail.com",
        TRTYPE:     0,
        COUNTRY:    "RU",
        MERCH_GMT:  "+9",
        TIMESTAMP:  "20200805085916",
        NONCE:      "11223344556677889900AABBCCDDFF",
        BACKREF:    "http://www.account-pro.ru",
        P_SIGN:     ""
    }
 
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Meta-charset": "utf8",
        }
      };

    let res = await axios.post(
        "https://egwtest.open.ru/cgi-bin/cgi_link",
            params, axiosConfig
        ).then(response => response.data)
        .then((data) => {
           console.log(data);
           return data;
        }).catch(error => {
          console.log(error)
          return error
        })
    return res

}
export      interface t_login {
    Телефон:    string,
    ФИО:        string,
    элПочта:    string,
    Пароль:     string,
    Пароль1:    string,
    СМС:        string,
    Роль:       string,
    Дом:        boolean,
    Услуги:     boolean,
}

export      interface t_chart {
    Периоды:    Array<string>,
    Данные:     Array<number>,
}

export      interface t_count {
    ГУИД:       string,
    Счетчик:    string,
    Тип:        string,
    Показание:  number,
    Иконка:     string,
    Месяц:      string,
    Единица:    string,
}

export      interface t_address {
    Адрес:      string,
    ЛС:         string,
    График:     t_chart,
    Показания:  Array<t_count>,
}

export      interface i_type {
    auth:       boolean,

    Логин:      t_login,
    Адреса:     Array<t_address>

    addr:       string,
    phone:      string,
    descr:      string,

    Услуги:     any

    Заявки:     any

}

export      const i_state:i_type | any = {

    auth:   false,

    Логин: {
        Телефон:    "",
        ФИО:        "",
        элПочта:    "",
        Пароль:     "",
        Пароль1:    "",
        СМС:        "",
        Роль:       "Пользователь",
        Дом:        false,
        Услуги:     true
    },

    Адреса: [],

    addr: "",
    phone: "",
    descr: "",

    Услуги: [],
    Заявки: [],
}

function    adrReducer(state = i_state.addr, action) {
    switch(action.type){
        case "addr": {
            return action.addr
        }
        default: return state;
    }
}

function    phnReducer(state = i_state.phone, action) {
    switch(action.type){
        case "phone": {
            return action.phone
        }
        default: return state;
    }
}

function    dscReducer(state = i_state.descr, action) {
    switch(action.type){
        case "descr": {
            return action.descr
        }
        default: return state;
    }
}

function    auReducer(state = i_state.auth, action) {
    switch(action.type){
        case "auth": {
            return action.auth
        }
        default: return state;
    }
}

function    lgReducer(state = i_state.Логин, action) {
    switch(action.type){
        case "login": {
            return {
                Телефон:    action.Телефон  === undefined ? state.Телефон   : action.Телефон,                
                ФИО:        action.ФИО      === undefined ? state.ФИО       : action.ФИО,                
                элПочта:    action.Телефон  === undefined ? state.Телефон   : action.Телефон,                
                Пароль:     action.Пароль   === undefined ? state.Пароль    : action.Пароль,                
                Пароль1:    action.Пароль1  === undefined ? state.Пароль1   : action.Пароль1,                
                СМС:        action.СМС      === undefined ? state.СМС       : action.СМС,                      
            }
        }
        default: return state;
    }
}

function    adReducer(state = i_state.Адреса, action) {

    switch(action.type){
        case "adr": return action.data
        case "add_poc": {
            return state.map(todo => {
                if (todo.ЛС === action.data.Код) {
                  return { ...todo, Показания: action.data.Показания}
                }
                return todo
              })  
        }
        case "del_adr": return []
        default: return state
    }

}

function    usReducer(state = i_state.Услуги, action){
    switch(action.type){
        case "serv": return action.data        
        case "upd_serv": return state.map((todo : any) => { 
            if (todo.Наименование === action.Наименование) {
              return { ...todo, Тариф: action.Тариф }
            }
            return todo
          })          
        case "cl_serv": return []
        default: return state
    }
}

function    inReducer(state = i_state.Заявки, action) {
    switch(action.type){
        case "doc": return action.data        
        case "add_doc": return [...state, action.data]
        case "upd_doc":  return state.map((todo : any) => { 
            if (todo.ГУИД === action.data.ГУИД) {
                return { ...todo, 
                    Статус:     action.data.Статус, 
                    Телефон:    action.data.Телефон,
                    Описание:   action.data.Описание, 
                    Адрес:      action.data.Адрес
                }
            }
            return todo
          })  
        case "cl_doc": return []
        default: return state
    }
}

const       rootReducer = combineReducers({

    auth:   auReducer,
    Логин:  lgReducer,
    Адреса: adReducer,

    descr:  dscReducer,
    phone:  phnReducer,
    addr:   adrReducer,

    Услуги: usReducer,
    Заявки: inReducer,

})

function    create_Store(reducer, initialState) {
    var currentReducer = reducer;
    var currentState = initialState;
    var adr_list = () => {};
    return {
        getState() {
            return currentState;
        },
        dispatch(action) {
            currentState = currentReducer(currentState, action);
            if(action.type === "adr") adr_list();
            return action;
        },
        subscribe_adr(newListener) {
            adr_list = newListener;
        },
    };
}

export const Store = create_Store(rootReducer, i_state)
export const URL = "https://mfu24.ru/counter/hs/MyAPI/V1/"

export async function getDatas(){

    let params = {
        Телефон: Store.getState().Логин.Телефон
    }

    let res;
    res = await getData("График", params)
    if(res.Код === 100) {
        Store.dispatch({type: "adr", data: res.Данные});
    }
                                                                                                                                
    res = await getData("Показания", params)
    if(res.Код === 100) {
        let jarr = res.Данные;
        jarr.forEach(elem => {
            Store.dispatch({type: "add_poc", data: elem})
        });
    
    } else console.log(res);

    res = await getData("У_Услуги", params)
    if(res.Код === 100) {
        Store.dispatch({type: "serv", data: res.Данные})
    }
    console.log(Store.getState())

    res = await getData("У_Заявки", params)
    if(res.Код === 100) {
        Store.dispatch({type: "doc", data: res.Данные})
    }
    console.log(Store.getState())

}