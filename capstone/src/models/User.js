import axios from 'axios';

const API_ENDPOINT = "https://afternoon-reef-89142.herokuapp.com/api/v1/"


class UserModel {
    static register = (userInfo) => {
        //axios.post('http://localhost:3001/api/v1/auth/register', userInfo)
        return fetch(API_ENDPOINT + 'auth/register', {
            credentials: "include",
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(userInfo)
        }).then(res => {
            return res.json();
        });
    }

    static login = (loginInfo) => {
       // axios.post('http://localhost:3001/api/v1/auth/login', loginInfo, {withCredentials: true})
        return fetch(API_ENDPOINT + 'auth/login', {
            credentials: "include",
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(loginInfo),
        }).then(res => {
           return res.json();
        });
    } 

    static fetch =  () => {
        //let account = axios.get('http://localhost:3001/api/v1/auth', {withCredentials: true})
        return fetch(API_ENDPOINT + "auth", {
            credentials: "include",
            method: "GET",
        }).then(res => {
            return res.json()
        });
    }
    static logout = () => {
        //let request = axios.delete('http://localhost:3001/api/v1/auth/logout', {withCredentials: true})
        return fetch(API_ENDPOINT + "auth/logout", {
            credentials: "include",
            method: "DELETE"
        }).then(res => {
            return res.json()
        })
        
    }

    static addLike = (id) => {
        //return axios.post("http://localhost:3001/api/v1/auth/" + id + "/like", {withCredentials: true})
        return fetch(API_ENDPOINT + "auth/" + id + "/like", {
            credentials: "include",
            method: "POST",
        }).then(res => {
           return res.json();
        });
    }
    static addDislike = (id) => {
        //let account = axios.post("http://localhost:3001/api/v1/auth/" + id + "/dislike", {withCredentials: true})
        return fetch(API_ENDPOINT + "auth/" + id + "/dislike", {
            credentials: "include",
            method: "POST"
        }).then(res => {
            return res.json();
        });
    }

    static follow = (id) => {
        return fetch(API_ENDPOINT + "auth/" + id + "/follow", {
            credentials: "include",
            method: "POST"
        }).then(res => {
            return res.json();
        });
    }
    static fetchSingle = (id) => {
        return fetch(API_ENDPOINT + "auth/" + id + "/anyAccount", {
            credentials: "include",
            method: "GET"
        }).then(res => {
            return res.json();
        });
    } 
}

export default UserModel;