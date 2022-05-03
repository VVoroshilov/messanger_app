export const get_user = async (user_id) => {
    const json_body = {
        "user_id": user_id
    };
    const request_data = JSON.stringify(json_body);
    const request = new Request('https://vvspi203.pythonanywhere.com/user/', {
        method: 'POST',
        body: request_data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await fetch(request)
        .then((response) => {
            if(response.ok){
                console.log("ok")
                return response.json()
            }else{
                console.log("not ok")
            }
        })
        .catch((err) => {
            console.error("error")
        })
}


export const sign_up = async (login, password, username, nickname, bio = null) => {
    const json_body = {
        "login": login,
        "password": password,
        "username": username,
        "nickname": nickname,
        "bio": bio
    };
    const request_data = JSON.stringify(json_body);
    const request = new Request('https://vvspi203.pythonanywhere.com/signup/', {
        method: 'POST',
        body: request_data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await fetch(request)
        .then((response) => {
            if(response.ok){
                console.log("ok")
                return response.json()
            }else{
                console.log("not ok")
            }
        })
        .catch((err) => {
            console.error("error")
        })
}


export const login = async (login, password) => {
    const json_body = {
        "login": login,
        "password": password
    };
    const request_data = JSON.stringify(json_body);
    const request = new Request('https://vvspi203.pythonanywhere.com/login/', {
        method: 'POST',
        body: request_data,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await fetch(request)
        .then((response) => {
            if(response.ok){
                console.log("ok")
                return response.json()
            }else{
                console.log("not ok")
            }
        })
        .catch((err) => {
            console.error("error")
        })
}


export const get_chats = async (user_id, token) => {
    const json_body = {
        "user_id": user_id,
        "token": token
    };
    const request_data = JSON.stringify(json_body);
    const request = new Request('https://vvspi203.pythonanywhere.com/chats/', {
        method: 'POST',
        body: request_data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await fetch(request)
        .then((response) => {
            if(response.ok){
                console.log("chats get reqest: 200")
                return response.json()
            }else{
                console.log("chats get reqest: 404")
                return {db_error: true, status: false}
            }
        })
        .catch((err) => {
            console.error("error")
            return {db_error: true, status: false}
        })
}


export const get_messages = async (user_id, token, chat_id, mes_amount = 50, mes_skip = 0) => {
    const json_body = {
        "user_id": user_id,
        "token": token,
        "chat_id": chat_id,
        "mes_amount": mes_amount,
        "mes_skip": mes_skip
    };
    const request_data = JSON.stringify(json_body);
    const request = new Request('https://vvspi203.pythonanywhere.com/message/get', {
        method: 'POST',
        body: request_data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await fetch(request)
        .then((response) => {
            if(response.ok){
                console.log("ok")
                return response.json()
            }else{
                console.log("not ok")
            }
        })
        .catch((err) => {
            console.error("error")
        })
}


export const send_message = async (user_id, token, chat_id, receiver_id =null, message_text=null, multimedia=null) => {

    let json_body = {
        "user_id": user_id,
        "token": token,
        "message_text": message_text,
        "multimedia": multimedia
    };

    if(receiver_id == null){
        json_body.chat_id = chat_id
    }else{
        json_body.receiver_id = receiver_id
    }
    
    const request_data = JSON.stringify(json_body);
    const request = new Request('https://vvspi203.pythonanywhere.com/message', {
        method: 'POST',
        body: request_data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await fetch(request)
        .then((response) => {
            if(response.ok){
                console.log("ok")
                return response.json()
            }else{
                console.log("not ok")
            }
        })
        .catch((err) => {
            console.error("error")
        })
}


export const load_user_pic = async (user_id, token, picture) => {
    const json_body = {
        "user_id": user_id,
        "token": token,
        "picture": picture,
    };
    const request_data = JSON.stringify(json_body);
    const request = new Request('https://vvspi203.pythonanywhere.com/user/picture', {
        method: 'POST',
        body: request_data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await fetch(request)
        .then((response) => {
            if(response.ok){
                console.log("ok")
                return response.json()
            }else{
                console.log("not ok")
            }
        })
        .catch((err) => {
            console.error("error")
        })
}


export const get_user_pic = async (user_id)  =>{
    const json_body = {
        "user_id": user_id
    };
    const request_data = JSON.stringify(json_body);
    const request = new Request('https://vvspi203.pythonanywhere.com/user/picture/get', {
        method: 'POST',
        body: request_data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await fetch(request)
        .then((response) => {
            if(response.ok){
                console.log("ok")
                return response.json()
            }else{
                console.log("not ok")
            }
        })
        .catch((err) => {
            return null;
        })
}


export const logout = async (user_id, token)  =>{
    const json_body = {
        "user_id": user_id,
        "token": token
    };
    const request_data = JSON.stringify(json_body);
    const request = new Request('https://vvspi203.pythonanywhere.com/user/session', {
        method: 'PUT',
        body: request_data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await fetch(request)
        .then((response) => {
            if(response.ok){
                console.log("ok")
                return response.json()
            }else{
                console.log("not ok")
            }
        })
        .catch((err) => {
            return null;
        })
}


export const find_user = async (username)  =>{
    const json_body = {
        "username": username
    };
    const request_data = JSON.stringify(json_body);
    const request = new Request('https://vvspi203.pythonanywhere.com/user/find', {
        method: 'POST',
        body: request_data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await fetch(request)
        .then((response) => {
            if(response.ok){
                console.log("ok")
                return response.json()
            }else{
                console.log("not ok")
            }
        })
        .catch((err) => {
            return null;
        })
}