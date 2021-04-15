import axios from '../api'
import {authHeader} from './auth-header'

class GroupService {
    getGroupsName() {
        return axios.get("/groups/names").then((response) => {
            return response.data
        })
    }

    getAllGroups(){
        return axios.get("/groups", {headers: authHeader()}).then((response) => {
            return response.data
        })
    }

    addGroup(group){
        return axios.post("/groups", group, {headers: authHeader()}).then((response) => {
            return response.data
        })
    }

    deleteByIds(ids){
        return axios.delete("/groups", {headers: authHeader(), params: {ids: ids.toString()}})
    }
}


export default new GroupService()